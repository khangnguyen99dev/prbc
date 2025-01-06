<?php

namespace App\Http\Controllers\Settings;

// use anlutro\LaravelSettings\Facades\Setting;
// use App\Helpers\ArrayHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\CurrencyRequest;
use App\Jobs\Settings\CurrencyMasterImportJob;
use App\Models\Currency;
use App\Models\CurrencyImportLog;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class CurrenciesController extends Controller
{
    public function index(Request $request)
    {
        $currencies = new Currency;
        $searchableColumns = Currency::getSearchables();
        $orderByColumns = Currency::getDefaultOrderBy();
        $mainCurrency = config('currencies.default');

        foreach ($searchableColumns as $column => $operator) {
            if (! empty ($request->$column)) {
                if (strtolower($operator) == 'like') {
                    $currencies = $currencies->where($column, $operator, '%'.$request->$column.'%');
                } else {
                    $currencies = $currencies->where($column, $operator, $request->$column);
                }
            }
        }

        if (!empty($request->created_by)) {
            $currencies = $currencies->whereHas('createdByUser', function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->created_by . '%');
            });
        }

        if (!empty($request->created_at)){
            $currencies = $currencies->whereBetween('created_at', [$request->created_at . ' 00:00:00', $request->created_at . ' 23:59:59']);
        }

        if (!empty($request->search_selectize)) {
            $currencies = $currencies->where(function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->search_selectize . '%')
                    ->orWhere('code', 'like', '%' . $request->search_selectize . '%');
            });
        }

        $currencies = $currencies
            ->with('createdByUser')
            ->orderByRaw("CASE WHEN currency_code = '$mainCurrency' THEN 0 ELSE 1 END, " . $orderByColumns['column_name'] . " " . $orderByColumns['order'])
            ->paginate($request->input('per_page', 10));

        foreach($currencies as $currency) {
            $currency->default = $currency->currency_code == $mainCurrency;
        }

        return response()->json([
            'currencies' => $currencies
        ]);
    }

    public function store(CurrencyRequest $request)
    {

        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Can Create Currency')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }

        // Check this is a valid currency code
        if (! array_key_exists($request->code, config('currencies.init_list'))) {
            return response()->json([
                'error' => true,
                'error_message' => 'Invalid currency code selected!',
                'init_list' => config('currencies.init_list')
            ]);
        }

        // Check that only one currency code with this currency exists
        $checkClashingCurrency = Currency::where('currency_code', $request->code)->first();
        if (! empty ($checkClashingCurrency)) {
            return response()->json([
                'error' => true,
                'error_message' => 'You have already registered this currency!'
            ]);
        }

        $currency = DB::transaction(function() use ($request) {
            $currency = Currency::create([
                'name' => $request->name,
                'code' => '',
                'currency_code' => $request->code,
                'rate' => $request->rate,
                'enabled' => 1,
                'precision' => 2,
                'symbol' => $request->symbol,
                'symbol_first' => 1,
                'decimal_mark' => $request->decimal_mark,
                'thousands_separator' => $request->thousands_separator,
                'created_from' => 'CurrenciesController@store',
                'created_by' => auth()->user()->id,
            ]);

            return $currency;
        });

        return response()->json([
            'error' => false,
            'success_message' => 'Currency created successfully',
            'currency' => $currency
        ]);
    }

    public function show($id)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Can Show Currency')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }

        $currency = Currency::find($id);

        if (empty ($currency)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, we couldn't find that currency!"
            ]);
        }

        $mainCurrency = config('currencies.default');
        $currency->default = $currency->currency_code == $mainCurrency;

        return response()->json([
            'error' => false,
            'currency' => $currency
        ]);
    }

    public function update($id, CurrencyRequest $request)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Can Update Currency')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }

        $currency = Currency::find($id);
        if (empty ($currency)) {
            return response()->json([
                'error' => true,
                'error_message' => 'Invalid currency selected!'
            ]);
        }


        $result = $this->authorizeUpdateOrDelete($currency, 'update', $request);
        if ($result['error']) {
            return response()->json($result);
        }

        $rate = $request->rate;

        DB::transaction(function() use ($currency, $request, $rate) {
            $currency->name = $request->name;
            $currency->rate = $rate;
            $currency->symbol = $request->symbol;
            $currency->decimal_mark = $request->decimal_mark;
            $currency->thousands_separator = $request->thousands_separator;
            $currency->save();
        });

        return response()->json([
            'error' => false,
            'success_message' => 'Successfully updated currency',
        ]);
    }

    public function destroy($id)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Can Delete Currency')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }

        $currency = Currency::find($id);
        if (empty ($currency)) {
            return response()->json([
                'error' => true,
                'error_message' => 'Invalid currency selected!'
            ]);
        }

        $result = $this->authorizeUpdateOrDelete($currency, 'destroy');
        if ($result['error']) {
            return response()->json($result);
        }

        DB::transaction(function() use ($currency) {
            if (config('currencies.default') == $currency->currency_code) {
                DB::table('settings')->where('key', 'default.currency')->delete();
            }

            $currency->delete();
        }, 5);

        return response()->json([
            'error' => false,
            'success_message' => 'Successfully deleted currency!'
        ]);
    }

    public function authorizeUpdateOrDelete($currency, $actionType = 'update', $request = null)
    {
        $result = $currency->hasNoRelationships();
        if ($actionType === 'update') {
            
        }

        if ($actionType === 'destroy') {
            if ($result['error']) {
                return [
                    'error' => true,
                    'error_message' => "This currency cannot be deleted as you still have an " . implode(', ', $result['error_message']) . " using this currency."
                ];
            }
        }

        return [
            'error' => false,
        ];
    }

    public function templateDownload()
    {
        return response()->stream(function() {
            $csv = fopen('php://output', 'w');
            fputcsv($csv, ["Name", "Code", "Rate(vs Main Currency)", "Exchange Rate", "Period Start", "Period End"]);
            fputcsv($csv, ["Malaysian Ringgit", "MYR", 1, '', Carbon::now('Asia/Kuala_Lumpur')->format('d/m/Y'), Carbon::now('Asia/Kuala_Lumpur')->addDays(7)->format('d/m/Y')]);
            fclose($csv);
        }, 200, [
            'Content-type' => 'application/csv'
        ]);
    }

    public function import(Request $request)
    {
        $file = $request->file('file');

        $fileName = sprintf("currency_batch_upload_%s%d.%s", Carbon::now()->format('Ymdhis'), rand(000,999), $file->getClientOriginalExtension());

        //upload file to s3
        $s3path = $file->storeAs('currencies-master/upload',
            $fileName,
            's3'
        );

        // create import log
        $user = auth()->user();
        $log = new CurrencyImportLog;
        $log->user_id = $user->id;
        $log->status = 'Pending';
        $log->filename = $fileName;
        $log->file_url = $s3path;
        $log->save();

        // validate mime type must "text/csv"
        if ($file->getClientOriginalExtension() != "csv") {
            $log->message = "Wrong file type, only csv allowed";
            $log->status = "Failed";
            $log->save();

            return response()->json([
                "error" => true,
                "error_message" => "Wrong file type, only csv allowed",
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        $csv = fopen($file->path(), 'r');
        $csvContent = [];
        try {

            while (($row = fgetcsv($csv)) !== false) {
                array_push($csvContent, $row);
            }
            fclose($csv);

            array_shift($csvContent);

            $csvContent = array_map(fn($row) => [
                'name' => !blank($row[0]) ? trim($row[0]) : NULL,
                'code' => !blank($row[1]) ? trim($row[1]) : NULL,
                'rate' => !blank($row[2]) ? trim($row[2]) : NULL,
                'exchange_rate' => !blank($row[3]) ? str_replace(',', '.', trim($row[3])) : NULL,
                'period_start' => !blank($row[4]) ? trim($row[4]) : NULL,
                'period_end' => !blank($row[5]) ? trim($row[5]) : NULL,
            ], array_filter($csvContent, function($row) {
                // Check if the row is not entirely empty or filled with commas (,)
                return !empty(array_filter($row, fn($value) => !blank(trim($value))));
            }));

        } catch (\Exception $e) {
            $log->message = $e->getMessage();
            $log->status = 'Failed';
            $log->save();

            return response()->json([
                "error" => true,
                "error_message" => "Error while reading file",
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        CurrencyMasterImportJob::dispatch($csvContent, $log, auth()->user());

        return response()->json([
            "error" => false,
            "message" => 'Successfully upload currencies, please wait for processing file'
        ]);
    }

    /**
     * get history import for currency master
     *
     * @return \Illuminate\Http\Response
     */
    public function getHistory()
    {
        $histories = CurrencyImportLog::with('user')->orderByDesc('id')->paginate(25);

        return response()->json([
            "error" => true,
            "histories" => $histories,
        ]);
    }
}

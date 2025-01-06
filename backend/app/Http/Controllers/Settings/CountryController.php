<?php

namespace App\Http\Controllers\Settings;

use Illuminate\Http\Request;
use App\Models\Country;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Str;

class CountryController extends Controller
{
    public function index(Request $request)
    {
        $countries = Country::query();

        if (!empty($request->name)){
            $countries->where('name', 'like', '%' . $request->name . '%');
        }

        if (!empty($request->code)){
            $countries->where('code', 'like', '%' . $request->code . '%');
        }

        if (!empty($request->owner_name)){
            $countries->whereHas('owner', function($query) use ($request){
                $query->where('name', 'like', '%' . $request->owner_name . '%');
            });
        }

        if (!empty($request->created_at)){
            $countries->whereBetween('created_at', [$request->created_at . ' 00:00:00', $request->created_at . ' 23:59:59']);
        }

        if (!empty($request->search_selectize)){
            $countries->where(function($query) use ($request){
                $query->where('name', 'like', '%' . $request->search_selectize . '%')
                    ->orWhere('code', 'like', '%' . $request->search_selectize . '%');
            });
        }

        $countries = $countries->orderBy('id', 'desc')
            ->with('owner', 'region')
            ->paginate($request->input('per_page', 10));

        return response()->json([
            'error' => false,
            'message' => 'Countries fetched successfully',
            'countries' => $countries,
        ]);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Can Create Country Management')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|unique:countries,code',
            'region_id' => 'required|exists:regions,id',
            'owner_id' => 'required|exists:users,id'
        ]);

        $flagUrlS3 = null;
        if ($request->hasFile('flag')) {
            $flagUrlS3 = $request->file('flag')->storeAs(
                'prbc/countries/' . Carbon::now()->format('YmdHis') . '/' . Str::random(20),
                $request->file('flag')->getClientOriginalName(),
                's3'
            );
        }

        $country = Country::create(array_merge($validated, [
            'created_by' => auth()->user()->id,
            'created_from' => 'CountryController@store',
            'flag' => $flagUrlS3
        ]));

        return response()->json([
            'error' => false,
            'success_message' => 'Country created successfully',
            'country' => $country,
        ]);
    }

    public function show(Country $country)
    {
        $country = Country::with('owner', 'region')->find($country->id);
        
        return response()->json([
            'error' => false,
            'message' => 'Country fetched successfully',
            'country' => $country,
        ]);
    }

    public function update(Request $request, Country $country)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|unique:countries,code,' . $country->id,
            'region_id' => 'required|exists:regions,id',
            'owner_id' => 'required|exists:users,id'
        ]);

        $flagUrlS3 = null;
        if ($request->hasFile('flag')) {
            $flagUrlS3 = $request->file('flag')->storeAs(
                'prbc/countries/' . Carbon::now()->format('YmdHis') . '/' . Str::random(20),
                $request->file('flag')->getClientOriginalName(),
                's3'
            );

            $validated['flag'] = $flagUrlS3;
        }

        $country->update($validated);

        return response()->json([
            'error' => false,
            'message' => 'Country updated successfully',
            'country' => $country,
        ]);
    }

    public function destroy(Country $country)
    {
        $country->delete();

        return response()->json([
            'error' => false,
            'message' => 'Country deleted successfully',
        ]);
    }
}

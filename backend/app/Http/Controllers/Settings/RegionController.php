<?php

namespace App\Http\Controllers\Settings;

use App\Models\Region;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Str;

class RegionController extends Controller
{
    public function index(Request $request)
    {
        $regions = Region::query();

        if (!empty($request->name)) {
            $regions->where('name', 'like', '%' . $request->name . '%');
        }
        if (!empty($request->code)) {
            $regions->where('code', 'like', '%' . $request->code . '%');
        }
        if (!empty($request->owner_name)) {
            $regions->whereHas('owner', function($query) use ($request){
                $query->where('name', 'like', '%' . $request->owner_name . '%');
            });
        }

        if (!empty($request->created_by)) {
            $regions->whereHas('createdByUser', function($query) use ($request){
                $query->where('name', 'like', '%' . $request->created_by . '%');
            });
        }

        if (!empty($request->created_at)) {
            $regions->whereBetween('created_at', [$request->created_at . ' 00:00:00', $request->created_at . ' 23:59:59']);
        }

        $regions = $regions->orderBy('id', 'desc')
            ->with('owner', 'createdByUser')
            ->paginate($request->input('per_page', 10));
        return response()->json([
            'error' => false,
            'regions' => $regions,
        ]);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Can Create Region Management')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:regions,code',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'owner_id' => 'required|exists:users,id'
        ]);

        $imageUrlInS3 = null;
        if ($request->hasFile('image')) {
            // Upload this to the private s3 to become a backup
            $imageUrlInS3 = $request->file('image')->storeAs(
                'prbc/regions/' . Carbon::now()->format('YmdHis') . '/' . Str::random(20),
                $request->file('image')->getClientOriginalName(),
                's3'
            );
        }

        $region = Region::create(array_merge($validated, [
            'created_by' => auth()->user()->id,
            'created_from' => 'RegionController@store',
            'image' => $imageUrlInS3
        ]));
        return response()->json([
            'error' => false,
            'success_message' => 'Region created successfully',
            'region' => $region,
        ]);
    }

    public function show(string $id)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Can Show Region Management')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }
        $region = Region::with('owner')->find($id);

        if (empty($region)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, the region you are trying to show does not exist!"
            ]);
        }

        return response()->json([
            'error' => false,
            'region' => $region,
        ]);
    }

    public function update(Request $request, string $id)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Can Update Region Management')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'code' => 'sometimes|required|string|max:20|unique:regions,code,' . $id,
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'owner_id' => 'sometimes|required|exists:users,id'
        ]);

        $region = Region::find($id);

        if (empty($region)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, the region you are trying to update does not exist!"
            ]);
        }

        $imageUrlInS3 = $request->is_deleted_image ? null : $region->image;
        if ($request->hasFile('image')) {
            // Upload this to the private s3 to become a backup
            $imageUrlInS3 = $request->file('image')->storeAs(
                'prbc/regions/' . Carbon::now()->format('YmdHis') . '/' . Str::random(20),
                $request->file('image')->getClientOriginalName(),
                's3'
            );
        }

        $region->update(array_merge($validated, [
            'image' => $imageUrlInS3
        ]));

        return response()->json([
            'error' => false,
            'success_message' => 'Region updated successfully',
            'region' => $region,
        ]);
    }

    public function destroy(string $id)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Can Delete Region Management')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }
        $region = Region::find($id);
        if (empty($region)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, the region you are trying to delete does not exist!"
            ]);
        }
        if ($region->image) {
            //TODO: Delete old image if exists
        }
        $region->delete();
        return response()->json([
            'error' => false,
            'success_message' => 'Region deleted successfully',
        ]);
    }
}

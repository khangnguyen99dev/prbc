<?php

namespace App\Http\Controllers\Settings;

use App\Models\Entity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Str;

class EntityController extends Controller
{
    public function index(Request $request)
    {
        $entities = Entity::query();

        if (!empty($request->name)) {
            $entities->where('name', 'like', '%' . $request->name . '%');
        }
        if (!empty($request->code)) {
            $entities->where('code', 'like', '%' . $request->code . '%');
        }
        if (!empty($request->local_currency_id)) {
            $entities->where('local_currency_id', $request->local_currency_id);
        }
        if (!empty($request->created_by)) {
            $entities->whereHas('createdByUser', function($query) use ($request){
                $query->where('name', 'like', '%' . $request->created_by . '%');
            });
        }
        if (!empty($request->created_at)) {
            $entities->whereBetween('created_at', [$request->created_at . ' 00:00:00', $request->created_at . ' 23:59:59']);
        }
        if (!empty($request->search_selectize)) {
            $entities->where(function ($query) use ($request) {
                $query->where('name', 'like', '%' . $request->search_selectize . '%')
                    ->orWhere('code', 'like', '%' . $request->search_selectize . '%');
            });
        }
        $entities = $entities->orderBy('id', 'desc')
            ->with('localCurrency', 'createdByUser')
            ->paginate($request->input('per_page', 10));
        return response()->json([
            'error' => false,
            'entities' => $entities,
        ]);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Can Create Entity Management')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }

        $validated = $request->validate([
            'country_id' => 'required|exists:countries,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:20|unique:entities,code',
            'address' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'local_currency_id' => 'required|exists:currencies,id'
        ]);

        $imageUrlInS3 = null;
        if ($request->hasFile('image')) {
            // Upload this to the private s3 to become a backup
            $imageUrlInS3 = $request->file('image')->storeAs(
                'prbc/entities/' . Carbon::now()->format('YmdHis') . '/' . Str::random(20),
                $request->file('image')->getClientOriginalName(),
                's3'
            );
        }

        $entity = Entity::create(array_merge($validated, [
            'created_by' => auth()->user()->id,
            'created_from' => 'EntityController@store',
            'logo' => $imageUrlInS3
        ]));
        return response()->json([
            'error' => false,
            'success_message' => 'Entity created successfully',
            'entity' => $entity,
        ]);
    }

    public function show(string $id)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Can Show Entity Management')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }
        $entity = Entity::with('localCurrency', 'country')->find($id);

        if (empty($entity)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, the entity you are trying to show does not exist!"
            ]);
        }

        return response()->json([
            'error' => false,
            'entity' => $entity,
        ]);
    }

    public function update(Request $request, string $id)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Can Update Entity Management')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }
        $validated = $request->validate([
            'country_id' => 'sometimes|required|exists:countries,id',
            'name' => 'sometimes|required|string|max:255',
            'code' => 'sometimes|required|string|max:20|unique:entities,code,' . $id,
            'address' => 'sometimes|required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'local_currency_id' => 'sometimes|required|exists:currencies,id'
        ]);

        $entity = Entity::find($id);

        if (empty($entity)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, the entity you are trying to update does not exist!"
            ]);
        }

        $result = $this->authorizeUpdateOrDelete($entity, 'update', $request);
        if ($result['error']) {
            return response()->json($result);
        }

        $imageUrlInS3 = $request->is_deleted_image ? null : $entity->logo;
        if ($request->hasFile('image')) {
            // Upload this to the private s3 to become a backup
            $imageUrlInS3 = $request->file('image')->storeAs(
                'prbc/entities/' . Carbon::now()->format('YmdHis') . '/' . Str::random(20),
                $request->file('image')->getClientOriginalName(),
                's3'
            );
        }

        $entity->update(array_merge($validated, [
            'logo' => $imageUrlInS3
        ]));

        return response()->json([
            'error' => false,
            'success_message' => 'Entity updated successfully',
            'entity' => $entity,
        ]);
    }

    public function destroy(string $id)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Can Delete Entity Management')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }
        $entity = Entity::find($id);
        if (empty($entity)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, the entity you are trying to delete does not exist!"
            ]);
        }

        $result = $this->authorizeUpdateOrDelete($entity, 'destroy');
        if ($result['error']) {
            return response()->json($result);
        }

        if ($entity->image) {
            //TODO: Delete old image if exists
        }
        $entity->delete();
        return response()->json([
            'error' => false,
            'success_message' => 'Entity deleted successfully',
        ]);
    }

    public function authorizeUpdateOrDelete($entity, $actionType = 'update', $request = null)
    {
        $result = $entity->hasNoRelationships();
        if ($actionType === 'update') {
            
        }

        if ($actionType === 'destroy') {
            if ($result['error']) {
                return [
                    'error' => true,
                    'error_message' => "This entity cannot be deleted as you still have an " . implode(', ', $result['error_message']) . " using this entity."
                ];
            }
        }

        return [
            'error' => false,
        ];
    }
}

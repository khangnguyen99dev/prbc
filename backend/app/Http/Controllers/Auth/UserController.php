<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $users = User::query();
        if (!empty($request->name)){
            $users->where('name', 'like', '%' . $request->name . '%');
        }
        if (!empty($request->email)){
            $users->where('email', 'like', '%' . $request->email . '%');
        }
        if (!empty($request->entity_id)){
            $users->where('entity_id', $request->entity_id);
        }
        if (!empty($request->created_at)){
            $users->whereBetween('created_at', [$request->created_at . ' 00:00:00', $request->created_at . ' 23:59:59']);
        }
        if (!empty($request->created_by)){
            $users->whereHas('createdByUser', function($query) use ($request){
                $query->where('name', 'like', '%' . $request->created_by . '%');
            });
        }
        if (!empty($request->search_selectize)){
            $users->where('name', 'like', '%' . $request->search_selectize . '%');
        }
        if (!empty($request->module) && $request->module == 'user_management'){
            $users->where('id', '!=', auth()->user()->id);
        }
        if (!empty($request->module) && $request->module == 'purchase_request' && !empty($request->level) && !empty($request->entity_id)){
            $users->whereHas('roles', function($query) use ($request) {
                $query->where('name', 'Approve Purchase Request Level ' . $request->level);
            });
            $users->where('entity_id', $request->entity_id);
        }
        $users = $users->orderBy('id', 'desc')
            ->with('createdByUser', 'entity')
            // ->where('email', '!=', 'admin@admin.com')
            ->paginate($request->input('per_page', 10));
        
        return response()->json([
            'error' => false,
            'users' => $users
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return response()->json('create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Can Create User Management')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }

        $request->validate([
            'entity_id' => 'required|exists:entities,id',
            'name' => 'required|string|max:255',
            'employee_number' => 'required|string|max:100|unique:users',
            'email' => 'required|string|email|max:100|unique:users',
            'date_of_birth' => 'nullable|date',
            'password' => 'required|string|min:8',
            'confirm_password' => 'required|string|min:8|same:password',
        ]);

        $user = User::create([
            'entity_id' => $request->entity_id,
            'employee_number' => $request->employee_number,
            'name' => $request->name,
            'email' => $request->email,
            'date_of_birth' => $request->date_of_birth,
            'created_by' => auth()->user()->id,
            'created_from' => "UserController@store",
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'error' => false,
            'user' => $user,
            'success_message' => 'User created successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Can Show User Management')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }

        $user = User::where('id', $id)
            ->with('entity')
            ->where('id', '!=', auth()->user()->id)
            // ->where('email', '!=', 'admin@admin.com')
            ->first();

        if (empty($user)){
            return response()->json([
                'error' => true,
                'error_message' => 'User not found'
            ]);
        }

        // Get installed applications
        $installedApplications = config('applications.installed');

        // Get all role users
        $roles = $user->roles()->pluck('name')->toArray();

        return response()->json([
            'error' => false,
            'user' => $user,
            'installed_applications' => $installedApplications,
            'roles' => $roles
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return response()->json('edit');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Can Update User Management')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }

        $request->validate([
            'entity_id' => 'required|exists:entities,id',
            'name' => 'required|string|max:255',
            'employee_number' => 'required|string|max:100|unique:users,employee_number,' . $id,
            'email' => 'required|string|email|max:100|unique:users,email,' . $id,
            'date_of_birth' => 'nullable|date',
            'password' => 'nullable|string|min:8',
            'confirm_password' => 'required_with:password|same:password',
        ]);

        $user = User::find($id);

        if (empty($user)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, the user you are trying to update does not exist!"
            ]);
        }

        $user->entity_id = $request->entity_id;
        $user->name = $request->name;
        $user->employee_number = $request->employee_number;
        $user->email = $request->email;
        $user->date_of_birth = $request->date_of_birth;
        if (!empty($request->password)) {
            $user->password = Hash::make($request->password);
        }
        $user->save();

        return response()->json([
            'error' => false,
            'user' => $user,
            'success_message' => 'User updated successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return response()->json('destroy');
    }

    /**
     * assign user roles
     */
    public function assignRole (Request $request) 
    {

        $user = auth()->user();
        if (!$user->hasPermissionTo('Settings - Master Data - Can Assign Role User Management')) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you do not have permissions to this action."
            ]);
        }
        $userId = $request->user_id;
        // check user already exists or not
        $user = User::where('id', $userId)->first();
        if (empty($user)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, we couldn't find that user!"
            ]);
        }

        $roles = array_filter($request->roles);
        // if (empty($roles)) {
        //     return response()->json([
        //         'error' => true,
        //         'error_message' => "Sorry, Please select the role for the user!"
        //     ]);
        // }

        // Filter to prevent privilege escalation
        $offLimitsRoles = [
            'Super Admin'
        ];

        $applicationRoles = [];
        $applications = config('applications.installed');
        foreach($applications as $application) {
            $applicationRoles[] = $application['roles'];
        }

        $roleNames = [];
        foreach($applicationRoles as $applicationRole) {
            foreach($applicationRole as $role) {
                $roleNames[] = $role['role_name'];
            }
        }

        $submittedRoles = [];
        foreach($roles as $roleString) {
            if(empty($roleString)) {
                continue;
            }

            $roleArray = explode("|||", $roleString);
            try {
                $applicationName = $roleArray[0];
                $roleName = $roleArray[1];
            } catch(\Exception $e) {
                continue;
            }

            $role = Role::where('name', $roleName)->first();
            if(empty($role)) {
                continue;
            }

            $submittedRoles[] = $roleName;
        }

        // delete all role assignments
        DB::table('model_has_roles')->where('model_id', $user->id)->delete();

        foreach($submittedRoles as $role) {
            if (in_array($role, $offLimitsRoles)) {
                continue;
            }

            // Assign this role to the user
            $user->assignRole($role);
        }

        return response()->json([
            'error' => false,
            'success_message' => 'Successfully updated access permissions!'
        ]);
    }
}

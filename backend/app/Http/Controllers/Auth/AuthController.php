<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Notifications\CollaboratorRequestNotification;
use Illuminate\Support\Facades\Mail;
use App\Mail\CollaboratorRequestEmail;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
{
    $request->validate([
        'employee_number' => 'required',
        'password' => 'required'
    ]);

    $user = User::where('employee_number', $request->employee_number)->first();

    if (!$user || !Hash::check($request->password, $user->password)) {
        throw ValidationException::withMessages([
            'employee_number' => ['The provided credentials are incorrect.'],
        ]);
    }

    if ($user->role == 'Collaborator' && $user->status == 'Inactive') {
        return response()->json([
            'error' => true,
            'error_message' => 'Your account is not active. Please contact the administrator.'
        ]);
    }

    // Delete old tokens if they exist
    // $user->tokens()->delete();

    // Create Sanctum token instead of Passport token
    $token = $user->createToken('Application')->plainTextToken;

    return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

    public function userExists(Request $request)
    {
        return response()->json(auth()->user());
    }

    public function userInfo()
    {
        $user = auth()->user();
        $currentUserInfo = [
            'id' => $user->id,
            'name' => $user->name,
            'employee_number' => $user->employee_number,
            'email' => $user->email,
            'date_of_birth' => $user->date_of_birth,
            'entity_id' => $user->entity_id,
            'entity' => $user->entity,
            'role' => implode(', ', $user->roles->pluck('name')->toArray()),
            'roles' => $user->roles->pluck('name')->toArray()
        ];

        return response()->json([
            'error' => false,
            'data' => [
                'user' => $currentUserInfo
            ]
        ]);
    }

    public function getPermissions()
    {
        $user = auth()->user();
        $permissions = $user->getAllPermissions()->pluck('name')->toArray();

        return response()->json([
            'error' => false,
            'permissions' => $permissions,
            'user' => $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateProfile(Request $request, string $id)
    {
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
        $user->email = $request->email;
        $user->employee_number = $request->employee_number;
        $user->date_of_birth = $request->date_of_birth;
        if (!empty($request->password)) {
            $user->password = Hash::make($request->password);
        }
        $user->save();

        return response()->json([
            'error' => false,
            'user' => $user,
            'success_message' => 'My profile updated successfully'
        ]);
    }

    public function signUpCollaborator(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:100|unique:users,email',
            'phone' => 'required|string|max:100|regex:/^([0-9\s\-\+\(\)]*)$/|min:10',
            'message' => 'required|string|max:1000',
        ]);

        // Get latest employee number
        $latestEmployee = User::where('employee_number', 'like', 'CO-%')
            ->orderBy('employee_number', 'desc')
            ->first();

        // Generate new employee number
        if ($latestEmployee) {
            $lastNumber = intval(substr($latestEmployee->employee_number, 3));
            $newNumber = str_pad($lastNumber + 1, 8, '0', STR_PAD_LEFT);
            $employeeNumber = 'CO-' . $newNumber;
        } else {
            $employeeNumber = 'CO-00000001';
        }

        $password = Str::random(8);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'message' => $request->message,
            'password' => Hash::make($password),
            'temp_password' => $password,
            'employee_number' => $employeeNumber,
            'status' => 'Inactive',
            'entity_id' => 1,
            'role' => 'Collaborator',
            'created_from' => 'Collaborator Request',
        ]);

        $user->assignRole('Collaborator');

        // Send email to admin
        $admin = User::where('employee_number', 'admin')->first();
        if ($admin) {
            $url = 'https://kane-service.com/settings/master-data/user-management/' . $user->id;
            Mail::to($admin->email)->send(new CollaboratorRequestEmail($user, $url));
            $admin->notify(new CollaboratorRequestNotification($user));
        }

        return response()->json([
            'error' => false,
            'message' => 'Thank you for your interest in becoming a collaborator. We will get back to you soon.'
        ]);
    }
}

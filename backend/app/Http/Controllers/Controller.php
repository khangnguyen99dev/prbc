<?php

namespace App\Http\Controllers;

use App\Contracts\ModificationOrDeletionRequiresAuthorizationContract;
use Exception;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController implements ModificationOrDeletionRequiresAuthorizationContract
{
    use AuthorizesRequests, ValidatesRequests;

    public function authorizeUpdateOrDelete($model, $actionType = 'update', $request = null)
    {
        // Default throw exception to prevent invalid usage
        throw new Exception("Please implement authorizeUpdateOrDelete function in your controller.");
    }
}

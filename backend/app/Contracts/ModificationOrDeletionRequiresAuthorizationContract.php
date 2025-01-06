<?php

namespace App\Contracts;

interface ModificationOrDeletionRequiresAuthorizationContract
{
    public function authorizeUpdateOrDelete($model, $actionType = 'update', $request = null);
}

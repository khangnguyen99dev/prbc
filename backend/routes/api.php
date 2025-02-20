<?php
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\UserController;
use App\Http\Controllers\Settings\RegionController;
use App\Http\Controllers\Settings\CountryController;
use App\Http\Controllers\Settings\EntityController;
use App\Http\Controllers\Settings\BudgetManagementController;
use App\Http\Controllers\Settings\BudgetMonthlyController;
use App\Http\Controllers\Settings\CurrenciesController;
use App\Http\Controllers\Settings\CurrencyRatePeriodController;
use App\Http\Controllers\Settings\RecurringOperationalCostController;
use App\Http\Controllers\Settings\NotificationController;
use App\Http\Controllers\WorkSpace\PurchaseRequestController;
use App\Http\Controllers\Settings\CountryBudgetController;
use App\Http\Controllers\Settings\CountryBudgetMonthlyController;
use App\Http\Controllers\Settings\BonusPoolController;
use App\Http\Controllers\Settings\BonusPoolItemController;
use App\Http\Controllers\WorkSpace\WeddingOnlineController;
use App\Http\Controllers\WorkSpace\QrCodeController;

// Public routes
Route::post('/login', [AuthController::class, 'login'])->name('login');

Route::get('/wedding-onlines/{slug}/show', [WeddingOnlineController::class, 'showBySlug'])->name('wedding-online-show');
Route::post('/wedding-onlines/send-message', [WeddingOnlineController::class, 'sendMessage']);
Route::post('/wedding-onlines/send-feedback', [WeddingOnlineController::class, 'sendFeedback']);
Route::get('/wedding-onlines/{slug}/notifications', [WeddingOnlineController::class, 'notifications']);

// Sign up collaborator
Route::post('/sign-up-collaborator', [AuthController::class, 'signUpCollaborator']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user-exists', [AuthController::class, 'userExists']);
    Route::get('/user-info', [AuthController::class, 'userInfo']);
    Route::get('/get-permissions', [AuthController::class, 'getPermissions']);
    Route::put('/update-profile/{id}', [AuthController::class, 'updateProfile']);

    Route::prefix('settings')->group(function () {
        // User management
        Route::apiResource('/users', UserController::class);
        Route::post('user-access-managements/assign-role', [UserController::class, 'assignRole']);

        // Region management
        Route::apiResource('/regions', RegionController::class);

        // Country management
        Route::apiResource('/countries', CountryController::class);

        // Entity management
        Route::apiResource('/entities', EntityController::class);

        // Budget management
        Route::apiResource('/budgets', BudgetManagementController::class);

        // Budget monthly
        Route::get('/budgets/{id}/{itemId}', BudgetMonthlyController::class);

        // Currency management
        Route::apiResource('/currencies', CurrenciesController::class);

        // Currency rate periods
        Route::apiResource('/currency-rate-periods', CurrencyRatePeriodController::class);

        // Recurring Operational Cost
        Route::apiResource('/recurring-operational-costs', RecurringOperationalCostController::class);
        Route::get('/recurring-operational-costs/{id}/months', [RecurringOperationalCostController::class, 'indexRocMonths']);
        Route::post('/recurring-operational-costs/{id}/run-manual-roc-month', [RecurringOperationalCostController::class, 'runManualRocMonth']);

        // Country budget
        Route::apiResource('/country-budgets', CountryBudgetController::class);
        Route::get('/country-budgets/{id}/{itemId}', CountryBudgetMonthlyController::class);

        // Bonus Pool
        Route::apiResource('/bonus-pools', BonusPoolController::class);
        Route::post('/bonus-pools/{id}/items', [BonusPoolItemController::class, 'saveItems']);
        Route::post('/bonus-pools/{id}/items/{itemId}/approval', [BonusPoolItemController::class, 'approval']);
    });

    // Notification
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::post('/notifications/mark-as-read', [NotificationController::class, 'markAsRead']);
    Route::get('/notifications/fetch-notifications', [NotificationController::class, 'fetchNotifications']);

    // WorkSpace
    Route::prefix('work-space')->group(function () {
        // Wedding online
        Route::apiResource('/wedding-onlines', WeddingOnlineController::class);
        Route::post('/wedding-onlines/{id}/update-status', [WeddingOnlineController::class, 'updateStatus']);
        // Purchase request
        Route::get('/purchase-requests/setup', [PurchaseRequestController::class, 'setup']);
        Route::get('/purchase-requests/get-available-budget', [PurchaseRequestController::class, 'getAvailableBudget']);
        Route::get('/purchase-requests/purchase-request-approve', [PurchaseRequestController::class, 'purchaseRequestApprove']);
        Route::apiResource('/purchase-requests', PurchaseRequestController::class);
        Route::post('/purchase-requests/{id}/submit-for-approval', [PurchaseRequestController::class, 'submitForApproval']);
        Route::post('/purchase-requests/{id}/cancel', [PurchaseRequestController::class, 'cancel']);
        Route::post('/purchase-requests/{id}/approval', [PurchaseRequestController::class, 'approval']);
        Route::get('/purchase-requests/{id}/history', [PurchaseRequestController::class, 'history']);

        // Generate QR code
        Route::post('/generate-qr-code', [QrCodeController::class, 'generate']);
    });
});

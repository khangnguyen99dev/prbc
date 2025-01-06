<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notifications = auth()->user()->notifications();

        if ($request->has('tab') && $request->tab === 'unread') {
            $notifications->where('read_at', null);
        }

        if ($request->has('tab') && $request->tab === 'read') {
            $notifications->where('read_at', '!=', null);
        }

        $notifications = $notifications
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return response()->json([
            'error' => false,
            'success_message' => 'Notifications fetched successfully',
            'notifications' => $notifications
        ]);
    }

    public function markAsRead(Request $request)
    {
        DB::table('notifications')
            ->where('notifiable_id', auth()->user()->id)
            ->where('id', $request->id)
            ->update([
                'read_at' => date('Y-m-d H:i:s')
            ]);

        return response()->json([
            'error' => false,
            'success_message' => 'Notification marked as read successfully',
        ]);
    }

    public function fetchNotifications()
    {
        $notifications = auth()->user()->notifications()->where('read_at', null)->get();
        return response()->json([
            'error' => false,
            'success_message' => 'Notifications fetched successfully',
            'notifications' => $notifications
        ]);
    }
}

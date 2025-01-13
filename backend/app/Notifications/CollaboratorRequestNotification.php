<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\User;

class CollaboratorRequestNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public User $user)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    public function toDatabase($notifiable)
    {
        $user = $this->user;
        $message = 'New collaborator request from ' . $user->name;
        return [
            'id' => $user->id,
            'message' => $message,
            'router_link' => '/settings/users/' . $user->id,
            'type_icon' => 'success', // success, error, warning
        ];
    }
}

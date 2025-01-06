<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\RecurringOperationalCost;

class CreateROCNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public RecurringOperationalCost $roc)
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
        $roc = $this->roc;
        $message = 'Successfully created ROC with entity ' . $roc->entity->name;
        return [
            'id' => $roc->id,
            'message' => $message,
            'router_link' => '/settings/recurring-operational-cost/' . $roc->id,
            'type_icon' => 'success', // success, error, warning
        ];
    }
}

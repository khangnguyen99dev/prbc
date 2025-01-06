<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\EntityBudget;

class CreateBudgetNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public EntityBudget $budget)
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
        $budget = $this->budget;
        $message = 'Successfully created budget with entity ' . $budget->entity->name;
        return [
            'id' => $budget->id,
            'message' => $message,
            'router_link' => '/settings/budget-management/' . $budget->id,
            'type_icon' => 'success', // success, error, warning
        ];
    }
}

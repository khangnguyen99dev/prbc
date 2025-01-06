<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\CountryBudget;

class CreateCountryBudgetNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public CountryBudget $countryBudget)
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
        $countryBudget = $this->countryBudget;
        $message = 'Successfully created budget with country ' . $countryBudget->country->name;
        return [
            'id' => $countryBudget->id,
            'message' => $message,
            'router_link' => '/settings/country-budget/' . $countryBudget->id,
            'type_icon' => 'success', // success, error, warning
        ];
    }
}

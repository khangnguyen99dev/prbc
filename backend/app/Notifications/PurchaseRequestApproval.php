<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\EntityBudget;
use App\Models\PurchaseRequest;

class PurchaseRequestApproval extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(public PurchaseRequest $purchaseRequest, public string $type)
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
        $purchaseRequest = $this->purchaseRequest;
        if ($this->type == 'Approve') {
            if ($purchaseRequest->approval_level_required == $purchaseRequest->approval_level_approved) {
                $message = 'Purchase Request ' . $purchaseRequest->pr_number . ' has been approved';
            }else {
                $message = 'Purchase Request ' . $purchaseRequest->pr_number . ' waiting for approval (Level ' . $purchaseRequest->approval_level_approved + 1 . ')';
            }
            $type_icon = 'success';
        }else {
            $message = 'Purchase Request ' . $purchaseRequest->pr_number . ' has been rejected';
            $type_icon = 'error';
        }
        return [
            'id' => $purchaseRequest->id,
            'message' => $message,
            'router_link' => '/purchase-requests/' . $purchaseRequest->id,
            'type_icon' => $type_icon, // success, error, warning
        ];
    }
}

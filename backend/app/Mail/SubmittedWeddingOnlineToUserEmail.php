<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\WeddingOnline;
use App\Models\User;

class SubmittedWeddingOnlineToUserEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(public WeddingOnline $weddingOnline, public User $user, public $bankQrCodeImage)
    {
        $this->weddingOnline = $weddingOnline;
        $this->user = $user;
        $this->bankQrCodeImage = $bankQrCodeImage;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Thiệp cưới online của bạn đã được gửi',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.submitted_wedding_online_to_user',
            with: [
                'weddingOnline' => $this->weddingOnline,
                'user' => $this->user,
                'bankQrCodeImage' => $this->bankQrCodeImage
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}

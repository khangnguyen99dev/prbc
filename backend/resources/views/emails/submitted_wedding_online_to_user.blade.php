<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            padding: 20px 0;
            background: #f8f9fa;
            border-radius: 5px;
        }
        .content {
            padding: 20px;
            background: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .info-box {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .payment-box {
            background: #fff3cd;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
            border: 1px solid #ffeeba;
        }
        .qr-code {
            text-align: center;
            margin: 20px 0;
        }
        .qr-code img {
            max-width: 200px;
            height: auto;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Xác Nhận Đăng Ký Thiệp Cưới Online</h1>
    </div>

    <div class="content">
        <p>Xin chào {{ $user->name }},</p>

        <p>Cảm ơn bạn đã sử dụng dịch vụ Thiệp Cưới Online. Chúng tôi đã nhận được đăng ký của bạn với các thông tin sau:</p>

        <div class="info-box">
            <p><strong>Thông tin cô dâu chú rể:</strong></p>
            <ul>
                <li>Chú rể: {{ $weddingOnline->groom_name }}</li>
                <li>Cô dâu: {{ $weddingOnline->bride_name }}</li>
            </ul>

            <p><strong>Thông tin lễ cưới:</strong></p>
            <ul>
                <li>Ngày cưới: {{ $weddingOnline->wedding_full_date_formatted }}</li>
                <li>Thời gian: {{ $weddingOnline->wedding_time_formatted }}</li>
                <li>Địa điểm: {{ $weddingOnline->wedding_location }}</li>
            </ul>

            <p><strong>Mã thiệp cưới:</strong> {{ $weddingOnline->code }}</p>
        </div>

        <div class="payment-box">
            <h3 style="margin-top: 0;">Thông tin thanh toán</h3>
            <p>Vui lòng chuyển khoản theo thông tin sau:</p>
            <ul>
                <li>Ngân hàng: <strong>Techcombank</strong></li>
                <li>Số tài khoản: <strong>3768888888</strong></li>
                <li>Tên chủ tài khoản: <strong>NGUYEN AN KHANG</strong></li>
                <li>Số tiền: <strong>199.000 VNĐ</strong></li>
                <li>Nội dung chuyển khoản: <strong>{{ str_replace('-', '', $weddingOnline->code) }}</strong></li>
            </ul>
            
            <div class="qr-code">
                <p><strong>Quét mã QR để thanh toán:</strong></p>
                <img src="{{ $bankQrCodeImage }}" alt="QR Code Thanh Toán">
            </div>
        </div>

        <p>Thiệp cưới của bạn đang được xem xét. Sau khi nhận được thanh toán, quản trị viên sẽ tiến hành xét duyệt và kích hoạt thiệp cưới của bạn. Chúng tôi sẽ thông báo cho bạn ngay khi quá trình xét duyệt hoàn tất.</p>

        <p>Nếu bạn có bất kỳ thắc mắc nào, vui lòng liên hệ với chúng tôi qua email support@kane-service.com.</p>

        <p>Trân trọng,<br>
        Kane Service</p>
    </div>

    <div class="footer">
        <p>© 2024 Kane Service. All rights reserved.</p>
        <p>Nếu bạn cần hỗ trợ, vui lòng liên hệ: support@kane-service.com</p>
    </div>
</body>
</html>

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
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #e91e63;
            color: #fff !important;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
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
        <h1>Thông Báo: Thiệp Cưới Online Mới</h1>
    </div>

    <div class="content">
        <p>Kính gửi Quản trị viên,</p>

        <p>Một thiệp cưới online mới vừa được gửi và đang chờ xét duyệt. Dưới đây là thông tin chi tiết:</p>

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

            <p><strong>Thông tin người đăng ký:</strong></p>
            <ul>
                <li>Mã đăng nhập: {{ $user->employee_number }}</li>
                <li>Họ tên: {{ $user->name }}</li>
                <li>Email: {{ $user->email }}</li>
                <li>Số điện thoại: {{ $user->phone }}</li>
            </ul>
        </div>

        <div style="text-align: center;">
            <a href="{{ 'https://kane-service.com/wedding-online/' . $weddingOnline->id }}" class="button">Xem Chi Tiết</a>
        </div>

        <p>Vui lòng xem xét và phê duyệt thiệp cưới này trong thời gian sớm nhất.</p>

        <p>Trân trọng,<br>
        Hệ thống Kane Service</p>
    </div>

    <div class="footer">
        <p>© 2024 Kane Service. All rights reserved.</p>
        <p>Nếu bạn cần hỗ trợ, vui lòng liên hệ: support@kane-service.com</p>
    </div>
</body>
</html>

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
        <h1>Thiệp cưới online của bạn đã được kích hoạt!</h1>
    </div>

    <div class="content">
        <p>Kính gửi {{ $user->name }},</p>

        <p>Chúng tôi vui mừng thông báo rằng thiệp cưới online của bạn đã được kích hoạt thành công. Bạn có thể truy cập thiệp cưới của mình thông qua đường dẫn dưới đây:</p>

        <div class="info-box">
            <p><strong>Đường dẫn thiệp cưới:</strong></p>
            <p><a href="{{ 'https://kane-service.com/'.$weddingOnline->slug }}" style="word-break: break-all;">{{ 'https://kane-service.com/'.$weddingOnline->slug }}</a></p>
        </div>

        <p>Bạn có thể chia sẻ đường dẫn này với bạn bè và người thân để họ có thể xem thiệp cưới online của bạn.</p>

        <div style="text-align: center;">
            <a href="{{ 'https://kane-service.com/'.$weddingOnline->slug }}" class="button">Xem Thiệp Cưới</a>
        </div>

        <p>Chúng tôi chân thành cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi.</p>

        <p>Nếu bạn cần hỗ trợ thêm, đừng ngần ngại liên hệ với chúng tôi.</p>

        <p>Trân trọng,<br>
        Kane Service</p>
    </div>

    <div class="footer">
        <p>© 2024 Kane Service. All rights reserved.</p>
        <p>Nếu bạn cần hỗ trợ, vui lòng liên hệ: support@kane-service.com</p>
    </div>
</body>
</html>

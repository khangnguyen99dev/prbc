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
            background-color: #007bff;
            color: #fff;
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
        <h1>Kích hoạt tài khoản của bạn</h1>
    </div>

    <div class="content">
        <p>Kính gửi {{ $user->name }},</p>

        <p>Chúc mừng! Tài khoản cộng tác viên của bạn đã được kích hoạt thành công. Dưới đây là thông tin đăng nhập của bạn:</p>

        <div class="info-box">
            <p><strong>Thông tin tài khoản:</strong></p>
            <ul>
                <li>Họ và tên: {{ $user->name }}</li>
                <li>Email: {{ $user->email }}</li>
                <li>Mã đăng nhập: {{ $user->employee_number }}</li>
                <li>Mật khẩu tạm thời: {{ $user->temp_password }}</li>
            </ul>
        </div>

        <p>Để bắt đầu sử dụng tài khoản, vui lòng nhấp vào nút bên dưới để đăng nhập:</p>

        <center>
            <a href="https://kane-service.com/login" class="button">Đăng nhập ngay</a>
        </center>

        <p><strong>Lưu ý quan trọng:</strong></p>
        <ul>
            <li>Vui lòng đổi mật khẩu ngay sau khi đăng nhập lần đầu tiên</li>
            <li>Không chia sẻ thông tin đăng nhập với người khác</li>
            <li>Liên hệ với chúng tôi nếu bạn gặp bất kỳ vấn đề nào</li>
        </ul>
    </div>

    <div class="footer">
        <p>© 2024 Kane Service. All rights reserved.</p>
        <p>Nếu bạn cần hỗ trợ, vui lòng liên hệ: support@kane-service.com</p>
    </div>
</body>
</html>

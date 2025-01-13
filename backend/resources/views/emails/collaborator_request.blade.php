<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Yêu cầu phê duyệt Cộng tác viên mới</title>
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
            background-color: #2196F3;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px;
        }
        .content {
            background: #fff;
            padding: 20px;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            padding: 20px;
            font-size: 12px;
            color: #666;
        }
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        .info-table td {
            padding: 8px;
            border-bottom: 1px solid #ddd;
        }
        .info-table tr:last-child td {
            border-bottom: none;
        }
        .action-button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 10px 5px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Yêu cầu phê duyệt Cộng tác viên mới</h1>
    </div>

    <div class="content">
        <p>Xin chào Admin,</p>

        <p>Có một yêu cầu đăng ký cộng tác viên mới cần được xem xét và phê duyệt.</p>

        <table class="info-table">
            <tr>
                <td><strong>Họ và tên:</strong></td>
                <td>{{ $user->name }}</td>
            </tr>
            <tr>
                <td><strong>Email:</strong></td>
                <td>{{ $user->email }}</td>
            </tr>
            <tr>
                <td><strong>Số điện thoại:</strong></td>
                <td>{{ $user->phone ?? 'Không có' }}</td>
            </tr>
            <tr>
                <td><strong>Thời gian đăng ký:</strong></td>
                <td>{{ date('d/m/Y H:i') }}</td>
            </tr>
            @if($user->message)
            <tr>
                <td><strong>Giới thiệu:</strong></td>
                <td>{{ $user->message }}</td>
            </tr>
            @endif
        </table>

        <p>Vui lòng truy cập vào hệ thống quản trị để xem xét và phê duyệt yêu cầu này:</p>
        
        <div style="text-align: center;">
            <a href="{{ $url }}" class="action-button">Xem xét yêu cầu</a>
        </div>

        <p>Trân trọng,<br>
        Kane Service</p>
    </div>

    <div class="footer">
        <p>Email này được gửi tự động từ hệ thống Kane Service.</p>
        <p>&copy; {{ date('Y') }} Kane Service. Tất cả các quyền được bảo lưu.</p>
    </div>
</body>
</html>
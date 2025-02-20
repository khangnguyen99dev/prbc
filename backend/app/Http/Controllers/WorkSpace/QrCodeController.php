<?php

namespace App\Http\Controllers\WorkSpace;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer;

class QrCodeController extends Controller
{
    public function generate(Request $request)
    {
        // Thông tin cố định
        $accountNumber = '3768888888';
        $amount = 1000000;
        $description = 'Chuyen khoan 123';

        // Các thông tin cố định theo chuẩn VietQR
        $data = [
            '00' => '01',                      // Version của QR
            '01' => '12',                      // Initiation method
            '26' => [                          // Thông tin quốc gia
                '00' => 'VN'                   // Mã quốc gia
            ],
            '27' => [                          // Thông tin dịch vụ
                '00' => 'QRIBFTTC',            // ID dịch vụ chuyển tiền nhanh
                '01' => '970407',              // Techcombank BIN
                '02' => $accountNumber         // Số tài khoản
            ],
            '28' => [                          // Thông tin giao dịch
                '00' => 'VND',                 // Loại tiền
                '01' => (string)$amount,       // Số tiền
                '02' => $description           // Nội dung chuyển khoản
            ],
            '29' => [                          // Thông tin đơn vị tiền tệ
                '00' => '704'                  // Mã tiền tệ VND
            ],
            '51' => '11'                       // Chỉ thị thanh toán
        ];

        // Chuyển đổi mảng thành chuỗi theo định dạng EMV-QR
        $qrString = $this->generateEMVQRString($data);
        
        // Tính toán và thêm CRC16
        $crc = $this->calculateCRC16($qrString);
        $qrString .= $crc;

        // Tạo QR code
        $renderer = new ImageRenderer(
            new RendererStyle(400),            // Kích thước QR
            new SvgImageBackEnd()
        );
        $writer = new Writer($renderer);
        $qrCode = $writer->writeString($qrString);

        return response($qrCode)->header('Content-Type', 'image/svg+xml');
    }

    private function generateEMVQRString($data)
    {
        $result = '';
        foreach ($data as $id => $value) {
            if (is_array($value)) {
                $subValue = $this->generateEMVQRString($value);
                $result .= $this->formatEMVQRField($id, $subValue);
            } else {
                $result .= $this->formatEMVQRField($id, $value);
            }
        }
        return $result;
    }

    private function formatEMVQRField($id, $value)
    {
        $length = str_pad(strlen($value), 2, '0', STR_PAD_LEFT);
        return $id . $length . $value;
    }

    private function calculateCRC16($str)
    {
        // Polynomial: x^16 + x^12 + x^5 + 1 (0x1021)
        $crc = 0xFFFF;
        $polynomial = 0x1021;

        for ($i = 0; $i < strlen($str); $i++) {
            $c = ord($str[$i]);
            $crc ^= ($c << 8);
            
            for ($j = 0; $j < 8; $j++) {
                if ($crc & 0x8000) {
                    $crc = ($crc << 1) ^ $polynomial;
                } else {
                    $crc = ($crc << 1);
                }
                $crc &= 0xFFFF;
            }
        }

        return strtoupper(sprintf('%04X', $crc));
    }
}

<?php
// Script bantuan untuk mengecek koneksi API Telegram & Environment Variable di Railway
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: text/html; charset=utf-8');

echo "<h2>Debug Telegram Bot — Portfolio</h2>";

$token  = getenv('TELEGRAM_BOT_TOKEN') ?: ($_SERVER['TELEGRAM_BOT_TOKEN'] ?? ($_ENV['TELEGRAM_BOT_TOKEN'] ?? ''));
$chatId = getenv('TELEGRAM_CHAT_ID') ?: ($_SERVER['TELEGRAM_CHAT_ID'] ?? ($_ENV['TELEGRAM_CHAT_ID'] ?? ''));

// Sembunyikan sebagian token agar lebih aman
$hiddenToken = strlen($token) > 10 ? substr($token, 0, 5) . '*****' . substr($token, -5) : 'KOSONG / TIDAK TERBACA';

echo "<p><strong>Bot Token :</strong> {$hiddenToken}</p>";
echo "<p><strong>Chat ID :</strong> " . ($chatId ?: 'KOSONG / TIDAK TERBACA') . "</p>";

if (empty($token) || empty($chatId)) {
    echo "<p style='color:red;'>Gagal: Token atau Chat ID masih kosong. Pastikan Environment Variables sudah ditambahkan di Railway dan server sudah selesai redeploy.</p>";
    exit;
}

echo "<h3>Mencoba mengirim pesan ke Telegram...</h3>";

$text = "🔔 <b>Test Ping dari Endpoint Debug Railway!</b>\nJika pesan ini masuk, berarti integrasi Telegram sudah jalan 100%.";

$url = "https://api.telegram.org/bot{$token}/sendMessage";
$postData = [
    'chat_id' => $chatId,
    'text' => $text,
    'parse_mode' => 'HTML',
];

$options = [
    'http' => [
        'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
        'method'  => 'POST',
        'content' => http_build_query($postData),
        'ignore_errors' => true
    ]
];

$context  = stream_context_create($options);
$response = file_get_contents($url, false, $context);

echo "<b>Response dari Server Telegram:</b><pre>";
if ($response === false) {
    echo "Gagal terhubung ke URL API Telegram.";
} else {
    echo htmlspecialchars(print_r(json_decode($response, true) ?: $response, true));
}
echo "</pre>";

if ($response && strpos($response, '"ok":true') !== false) {
    echo "<p style='color:green;'>✔️ SUKSES! Pesan test berhasil terkirim ke Telegram Anda.</p>";
} else {
    echo "<p style='color:red;'>❌ GAGAL! Periksa API Token atau Chat ID Anda. (Mungkin Chat ID Anda salah, atau Anda belum klik Start di Bot).</p>";
}

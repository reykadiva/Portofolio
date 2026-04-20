<?php
/**
 * contact.php — Main Contact Form Endpoint
 *
 * Endpoint tunggal yang menangani semua request ke backend
 * contact form portfolio.
 *
 * Flow:
 *   1. Set CORS headers (wajib, karena frontend di Vercel ≠ backend di Render)
 *   2. Tangani OPTIONS preflight
 *   3. Validasi HTTP method (hanya POST)
 *   4. Parse JSON body
 *   5. Honeypot check (anti-spam)
 *   6. Rate limiting per IP
 *   7. Validasi & sanitasi input
 *   8. Simpan ke SQLite
 *   9. Kirim email notifikasi + auto-reply
 *  10. Return JSON response
 */

declare(strict_types=1);

require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/validate.php';
require_once __DIR__ . '/includes/mailer.php';
require_once __DIR__ . '/includes/telegram.php';

// Matikan error display agar response murni JSON dan tidak break
ini_set('display_errors', '0');

// ============================================================
// 1. CORS Headers — WAJIB sebelum output apapun
// ============================================================
header('Access-Control-Allow-Origin: https://muhammad-reyka-portofolio.vercel.app');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=UTF-8');

// ============================================================
// 2. Handle preflight OPTIONS request
// ============================================================
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ============================================================
// 3. Hanya terima POST
// ============================================================
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status'  => 'error',
        'errors'  => ['Method tidak diizinkan. Gunakan POST.'],
    ]);
    exit;
}

// ============================================================
// 4. Parse JSON body
// ============================================================
$rawBody = file_get_contents('php://input');
$raw     = json_decode($rawBody, true);

if (!is_array($raw)) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'errors' => ['Request body harus berupa JSON yang valid.'],
    ]);
    exit;
}

// ============================================================
// 5. Honeypot check — jika field "website" terisi = bot
//    Kembalikan sukses palsu agar bot tidak tahu
// ============================================================
if (!empty($raw['website'])) {
    echo json_encode([
        'status'  => 'success',
        'message' => 'Pesan berhasil dikirim!',
        'detail'  => [],
    ]);
    exit;
}

// ============================================================
// 6. Rate Limiting — max 5 pesan per IP per jam
// ============================================================
$clientIp = $_SERVER['HTTP_X_FORWARDED_FOR']
    ?? $_SERVER['REMOTE_ADDR']
    ?? '0.0.0.0';
// Ambil IP pertama jika ada beberapa (proxy chain)
$clientIp = trim(explode(',', $clientIp)[0]);

if (isRateLimited($clientIp)) {
    http_response_code(429);
    echo json_encode([
        'status' => 'error',
        'errors' => ['Terlalu banyak permintaan. Coba lagi dalam 1 jam.'],
    ]);
    exit;
}

// ============================================================
// 7. Validasi input
// ============================================================
$errors = validateInput($raw);

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode([
        'status' => 'error',
        'errors' => $errors,
    ]);
    exit;
}

// ============================================================
// 8. Sanitasi data
// ============================================================
$data = sanitizeData($raw);

// ============================================================
// 9. Simpan ke SQLite
// ============================================================
try {
    saveMessage($data, $clientIp);
    recordRateLimit($clientIp);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'errors' => ['Gagal menyimpan pesan. Silakan coba lagi.'],
    ]);
    exit;
}

// ============================================================
// 10. Kirim notifikasi (Email & Telegram)
// ============================================================
$now  = new DateTime('now', new DateTimeZone('Asia/Jakarta'));
$time = $now->format('d M Y, H:i');

// Telegram (error tidak membatalkan response sukses)
try {
    sendTelegramMessage($data, $time);
} catch (Exception $e) {
    error_log('[telegram_exception] ' . $e->getMessage());
}

// Email (error tidak membatalkan response sukses)
try {
    sendEmails($data, $time);
} catch (Exception $e) {
    error_log('[mailer] ' . $e->getMessage());
}

// ============================================================
// 11. Response sukses
// ============================================================
http_response_code(200);
echo json_encode([
    'status'  => 'success',
    'message' => 'Pesan berhasil dikirim!',
    'detail'  => [
        'name'     => $data['name'],
        'email'    => $data['email'],
        'category' => $data['category'],
        'subject'  => $data['subject'],
        'message'  => $data['message'],
        'time'     => $time,
    ],
]);

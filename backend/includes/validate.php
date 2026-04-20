<?php
/**
 * validate.php — Input Validation & Rate Limiting
 *
 * Memvalidasi dan menyanitasi semua input dari contact form.
 * Menjalankan rate limiting berbasis IP menggunakan tabel SQLite.
 */

require_once __DIR__ . '/db.php';

/** Kategori yang diizinkan */
const ALLOWED_CATEGORIES = ['collaboration', 'hiring', 'project', 'just_saying'];

/** Rate limit: maksimal N pesan per IP per jam */
const RATE_LIMIT_MAX  = 50; // Ditingkatkan sementara untuk mempermudah testing
const RATE_LIMIT_HOUR = 3600; // detik

/**
 * Sanitasi satu string: trim + htmlspecialchars.
 */
function sanitize(string $value): string
{
    return htmlspecialchars(trim($value), ENT_QUOTES, 'UTF-8');
}

/**
 * Validasi semua field form.
 * Mengembalikan array errors (kosong = valid).
 *
 * @param array $raw Data mentah dari request body
 * @return array<string> Daftar pesan error
 */
function validateInput(array $raw): array
{
    $errors = [];

    // --- name ---
    $name = trim($raw['name'] ?? '');
    if ($name === '') {
        $errors[] = 'Nama wajib diisi.';
    } elseif (mb_strlen($name) < 2) {
        $errors[] = 'Nama minimal 2 karakter.';
    }

    // --- email ---
    $email = trim($raw['email'] ?? '');
    if ($email === '') {
        $errors[] = 'Email wajib diisi.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = 'Format email tidak valid.';
    }

    // --- category ---
    $category = trim($raw['category'] ?? '');
    if ($category === '') {
        $errors[] = 'Kategori wajib dipilih.';
    } elseif (!in_array($category, ALLOWED_CATEGORIES, true)) {
        $errors[] = 'Kategori tidak valid.';
    }

    // --- subject ---
    $subject = trim($raw['subject'] ?? '');
    if ($subject === '') {
        $errors[] = 'Subjek wajib diisi.';
    } elseif (mb_strlen($subject) > 150) {
        $errors[] = 'Subjek maksimal 150 karakter.';
    }

    // --- message ---
    $message = trim($raw['message'] ?? '');
    if ($message === '') {
        $errors[] = 'Pesan wajib diisi.';
    } elseif (mb_strlen($message) < 10) {
        $errors[] = 'Pesan minimal 10 karakter.';
    } elseif (mb_strlen($message) > 3000) {
        $errors[] = 'Pesan maksimal 3000 karakter.';
    }

    return $errors;
}

/**
 * Sanitasi semua field yang dibutuhkan ke array bersih.
 *
 * @param array $raw Data mentah
 * @return array Data yang sudah disanitasi
 */
function sanitizeData(array $raw): array
{
    return [
        'name'     => sanitize($raw['name']     ?? ''),
        'email'    => sanitize($raw['email']     ?? ''),
        'category' => sanitize($raw['category']  ?? ''),
        'subject'  => sanitize($raw['subject']   ?? ''),
        'message'  => sanitize($raw['message']   ?? ''),
    ];
}

/**
 * Periksa apakah IP telah melebihi rate limit.
 * Juga membersihkan record lama (> 1 jam).
 *
 * @param string $ip Alamat IP pengirim
 * @return bool true jika rate limit terlampaui
 */
function isRateLimited(string $ip): bool
{
    $pdo = getDB();

    // Hapus record lebih dari 1 jam
    $pdo->prepare("
        DELETE FROM rate_limits
        WHERE created_at < datetime('now', '-1 hour')
    ")->execute();

    // Hitung pesan dari IP ini dalam 1 jam terakhir
    $stmt = $pdo->prepare("
        SELECT COUNT(*) AS total FROM rate_limits
        WHERE ip = :ip AND created_at >= datetime('now', '-1 hour')
    ");
    $stmt->execute([':ip' => $ip]);
    $count = (int) $stmt->fetchColumn();

    return $count >= RATE_LIMIT_MAX;
}

/**
 * Catat satu pengiriman dari IP ke tabel rate_limits.
 */
function recordRateLimit(string $ip): void
{
    $pdo  = getDB();
    $stmt = $pdo->prepare("INSERT INTO rate_limits (ip) VALUES (:ip)");
    $stmt->execute([':ip' => $ip]);
}

<?php
/**
 * router.php — Router untuk PHP Built-in Server
 *
 * Menangani routing, CORS preflight, dan security rules
 * yang biasanya ditangani .htaccess di Apache.
 */

define('ALLOWED_ORIGIN', 'https://muhammad-reyka-portofolio.vercel.app');

$path   = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

// ── CORS: selalu inject header untuk SEMUA request ──────────────
// Ini penting karena browser mengirim OPTIONS preflight dulu
// sebelum POST yang sebenarnya, dan CORS header harus ada
// di setiap response termasuk response router.
header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// ── Handle preflight OPTIONS langsung di router ──────────────────
if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// ── Block akses langsung ke folder includes/ ─────────────────────
if (preg_match('#^/includes/#i', $path)) {
    http_response_code(403);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['status' => 'error', 'errors' => ['Forbidden']]);
    exit;
}

// ── Block akses ke file sensitif ─────────────────────────────────
if (preg_match('#\.(db|sql)$#i', $path) || $path === '/router.php') {
    http_response_code(403);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['status' => 'error', 'errors' => ['Forbidden']]);
    exit;
}

// ── Kembalikan false: PHP built-in server layani file normal ─────
return false;

<?php
/**
 * router.php — Router untuk PHP Built-in Server
 *
 * PHP built-in server (php -S) membutuhkan router script
 * untuk menangani routing dan security rules yang biasanya
 * ditangani .htaccess di Apache.
 *
 * Jika file ditemukan di filesystem, return false agar
 * PHP melayani file tersebut secara normal.
 */

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Block akses langsung ke folder includes/
// (hanya boleh di-require dari contact.php, bukan via HTTP)
if (preg_match('#^/includes/#i', $path)) {
    http_response_code(403);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['status' => 'error', 'errors' => ['Forbidden']]);
    exit;
}

// Block akses langsung ke file .db, .sql, router.php
if (preg_match('#\.(db|sql)$#i', $path) || $path === '/router.php') {
    http_response_code(403);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['status' => 'error', 'errors' => ['Forbidden']]);
    exit;
}

// Kembalikan false agar PHP built-in server melayani file secara normal
return false;

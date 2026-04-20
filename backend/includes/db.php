<?php
/**
 * db.php — Database Handler
 * 
 * Mengelola koneksi PDO SQLite dan auto-create tabel
 * jika belum ada (messages & rate_limits).
 * 
 * Database disimpan di luar web root (/var/www/data/)
 * agar tidak bisa diakses publik.
 */

function getDB(): PDO
{
    // Simpan SQLite di luar web root, fallback ke /tmp di local dev
    $dataDir = is_dir('/var/www/data') ? '/var/www/data' : sys_get_temp_dir();
    $dbPath  = $dataDir . '/portfolio_contact.db';

    static $pdo = null;

    if ($pdo === null) {
        $pdo = new PDO('sqlite:' . $dbPath);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

        // Auto-create tabel jika belum ada
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS messages (
                id         INTEGER PRIMARY KEY AUTOINCREMENT,
                name       TEXT    NOT NULL,
                email      TEXT    NOT NULL,
                category   TEXT    NOT NULL,
                subject    TEXT    NOT NULL,
                message    TEXT    NOT NULL,
                ip         TEXT    NOT NULL,
                is_read    INTEGER NOT NULL DEFAULT 0,
                created_at TEXT    NOT NULL DEFAULT (datetime('now'))
            );

            CREATE TABLE IF NOT EXISTS rate_limits (
                id         INTEGER PRIMARY KEY AUTOINCREMENT,
                ip         TEXT    NOT NULL,
                created_at TEXT    NOT NULL DEFAULT (datetime('now'))
            );

            CREATE INDEX IF NOT EXISTS idx_rate_limits_ip
                ON rate_limits (ip, created_at);
        ");
    }

    return $pdo;
}

/**
 * Simpan pesan ke tabel messages.
 * Semua nilai sudah disanitasi sebelum dipanggil.
 */
function saveMessage(array $data, string $ip): int
{
    $pdo  = getDB();
    $stmt = $pdo->prepare("
        INSERT INTO messages (name, email, category, subject, message, ip)
        VALUES (:name, :email, :category, :subject, :message, :ip)
    ");
    $stmt->execute([
        ':name'     => $data['name'],
        ':email'    => $data['email'],
        ':category' => $data['category'],
        ':subject'  => $data['subject'],
        ':message'  => $data['message'],
        ':ip'       => $ip,
    ]);

    return (int) $pdo->lastInsertId();
}

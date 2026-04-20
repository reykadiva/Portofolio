<?php
/**
 * telegram.php — Telegram API Integration
 * 
 * Mengirim notifikasi pesan baru dari portfolio ke Telegram bot.
 * Membaca konfigurasi dari environment variables (Railway).
 */

function sendTelegramMessage(array $data, string $time): bool
{
    $token  = getenv('TELEGRAM_BOT_TOKEN') ?: ($_SERVER['TELEGRAM_BOT_TOKEN'] ?? ($_ENV['TELEGRAM_BOT_TOKEN'] ?? ''));
    $chatId = getenv('TELEGRAM_CHAT_ID') ?: ($_SERVER['TELEGRAM_CHAT_ID'] ?? ($_ENV['TELEGRAM_CHAT_ID'] ?? ''));

    // Jika environment variable belum diset, loncati pengiriman tanpa error mencolok
    if (empty($token) || empty($chatId)) {
        error_log('[telegram] TELEGRAM_BOT_TOKEN atau TELEGRAM_CHAT_ID tidak dikonfigurasi.');
        return false;
    }

    $name     = $data['name'] ?? 'Unknown';
    $email    = $data['email'] ?? 'Unknown';
    $category = $data['category'] ?? 'None';
    $subject  = $data['subject'] ?? '';
    $message  = $data['message'] ?? '';

    // Mempercantik label kategori
    $labels = [
        'collaboration' => 'Collaboration',
        'hiring'        => 'Hiring / Recruitment',
        'project'       => 'Project Inquiry',
        'just_saying'   => 'Just saying hi!',
    ];
    $categoryLabel = $labels[$category] ?? ucfirst($category);

    // Merangkai teks pesan bot
    $text  = "📩 <b>PESAN BARU DARI PORTFOLIO</b>\n\n";
    $text .= "👤 <b>Nama:</b> " . htmlspecialchars($name) . "\n";
    $text .= "📧 <b>Email:</b> " . htmlspecialchars($email) . "\n";
    $text .= "🏷 <b>Kategori:</b> " . htmlspecialchars($categoryLabel) . "\n";
    $text .= "📅 <b>Waktu:</b> " . htmlspecialchars($time) . "\n";
    $text .= "📌 <b>Subjek:</b> " . htmlspecialchars($subject) . "\n\n";
    $text .= "💬 <b>Pesan:</b>\n<i>" . htmlspecialchars($message) . "</i>\n\n";
    $text .= "👉 <a href='mailto:" . htmlspecialchars($email) . "?subject=RE: " . htmlspecialchars(rawurlencode($subject)) . "'>Balas via Email</a>";

    $url = "https://api.telegram.org/bot{$token}/sendMessage";
    
    $postData = [
        'chat_id' => $chatId,
        'text' => $text,
        'parse_mode' => 'HTML',
        'disable_web_page_preview' => true
    ];

    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($postData),
            'ignore_errors' => true // Jangan panic jika HTTP 400/500
        ]
    ];
    
    $context  = stream_context_create($options);
    
    // Panggil API (gunakan @ untuk suppress warning bawaan PHP jika network error)
    $response = @file_get_contents($url, false, $context);

    if ($response === false) {
        error_log('[telegram] Gagal menghubungi API Telegram. Cek jaringan/konektivitas.');
        return false;
    }

    $json = json_decode($response, true);
    if (isset($json['ok']) && $json['ok'] === true) {
        return true;
    } else {
        error_log('[telegram] Error dari API Telegram: ' . $response);
        return false;
    }
}

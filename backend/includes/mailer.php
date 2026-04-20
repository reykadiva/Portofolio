<?php
/**
 * mailer.php — Email Handler
 *
 * Mengirim dua email via PHP mail():
 *   1. Notifikasi ke admin (revka334@gmail.com)
 *   2. Auto-reply ke pengirim
 */

const ADMIN_EMAIL = 'revka334@gmail.com';
const SITE_NAME   = 'Muhammad Reyka — Portfolio';

/**
 * Label tampilan untuk kategori.
 */
function categoryLabel(string $category): string
{
    $labels = [
        'collaboration' => 'Collaboration',
        'hiring'        => 'Hiring / Recruitment',
        'project'       => 'Project Inquiry',
        'just_saying'   => 'Just saying hi!',
    ];
    return $labels[$category] ?? ucfirst($category);
}

/**
 * Kirim email notifikasi ke admin dan auto-reply ke pengirim.
 *
 * @param array  $data  Data pesan yang sudah disanitasi
 * @param string $time  Waktu pengiriman format "dd MMM yyyy, HH:mm"
 * @return bool  true jika setidaknya email admin berhasil dikirim
 */
function sendEmails(array $data, string $time): bool
{
    $name     = $data['name'];
    $email    = $data['email'];
    $category = categoryLabel($data['category']);
    $subject  = $data['subject'];
    $message  = $data['message'];

    // ------------------------------------------------------------------
    // 1. Email notifikasi ke admin
    // ------------------------------------------------------------------
    $adminSubject = "[Portfolio] Pesan Baru: {$subject}";
    $adminBody    = <<<EOL
Halo Reyka,

Kamu mendapat pesan baru dari portfolio website kamu.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DETAIL PESAN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nama     : {$name}
Email    : {$email}
Kategori : {$category}
Subjek   : {$subject}
Waktu    : {$time}

Pesan:
{$message}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Balas langsung ke email pengirim: {$email}

Salam,
Muhammad Reyka — Portfolio
EOL;

    $adminHeaders  = "From: noreply@portfolio.local\r\n";
    $adminHeaders .= "Reply-To: {$email}\r\n";
    $adminHeaders .= "MIME-Version: 1.0\r\n";
    $adminHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $adminSent = @mail(ADMIN_EMAIL, $adminSubject, $adminBody, $adminHeaders);

    // ------------------------------------------------------------------
    // 2. Auto-reply ke pengirim
    // ------------------------------------------------------------------
    $replySubject = "Terima kasih telah menghubungi saya, {$name}!";
    $replyBody    = <<<EOL
Halo {$name},

Terima kasih telah menghubungi saya melalui portfolio website.
Saya sudah menerima pesanmu dan akan membalas secepatnya!

Berikut ringkasan pesanmu:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Kategori : {$category}
Subjek   : {$subject}
Waktu    : {$time}

Pesan:
{$message}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Sampai jumpa,
Muhammad Reyka Agastya Divaputra
https://muhammad-reyka-portofolio.vercel.app
EOL;

    $replyHeaders  = "From: Muhammad Reyka <noreply@portfolio.local>\r\n";
    $replyHeaders .= "Reply-To: " . ADMIN_EMAIL . "\r\n";
    $replyHeaders .= "MIME-Version: 1.0\r\n";
    $replyHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

    @mail($email, $replySubject, $replyBody, $replyHeaders);

    return $adminSent;
}

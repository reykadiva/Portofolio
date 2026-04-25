"use server";

import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  email: z.string().email("Format email tidak valid"),
  category: z.string().min(1, "Silakan pilih kategori"),
  subject: z.string().min(3, "Subjek minimal 3 karakter"),
  message: z.string().min(10, "Pesan minimal 10 karakter"),
  website: z.string().optional(), // Honeypot
});

export async function sendContactForm(formData: FormData) {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    category: formData.get("category"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    website: formData.get("website"),
  };

  const validated = contactSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      status: "error",
      errors: validated.error.errors.map((e) => e.message),
    };
  }

  const { name, email, category, subject, message, website } = validated.data;

  // Honeypot check
  if (website) {
    return { status: "success", message: "Pesan berhasil dikirim!" };
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error("Telegram credentials missing");
    return {
      status: "error",
      errors: ["Server configuration error. Please try again later."],
    };
  }

  const text = `
📬 *Pesan Baru dari Portofolio*
    
👤 *Nama:* ${name}
📧 *Email:* ${email}
🏷️ *Kategori:* ${category}
📌 *Subjek:* ${subject}
    
💬 *Pesan:*
${message}
    
⏰ *Waktu:* ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send Telegram message");
    }

    return {
      status: "success",
      message: "Pesan Anda telah terkirim! Saya akan segera menghubungi Anda.",
      detail: {
        name,
        email,
        category,
        subject,
        message,
        time: new Date().toLocaleTimeString("id-ID"),
      },
    };
  } catch (error) {
    console.error("Contact form error:", error);
    return {
      status: "error",
      errors: ["Gagal mengirim pesan. Silakan coba lagi nanti."],
    };
  }
}

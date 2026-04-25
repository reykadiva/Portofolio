# Muhammad Reyka - Portfolio (Next.js Edition)

This is a modern, high-performance portfolio website built with Next.js 15, Tailwind CSS, and Framer Motion.

## 📁 Project Structure

To make it easy to debug and maintain, the project is organized as follows:

### 🎨 Frontend (UI & Routing)
- `src/app/`: Contains all pages and routing logic.
  - `page.tsx`: Home page.
  - `about/`: About me page.
  - `projects/`: Project showcase.
  - `experience/`: Organizational timeline.
  - `contact/`: Contact form UI.
- `src/components/`: Reusable UI components like Navbar, Footer, and ProjectCards.
- `public/`: Static assets (images, profile photos).

### ⚙️ Backend (Server Logic)
- `src/app/actions/`: Contains Server Actions that handle backend logic (e.g., sending contact form data to Telegram).
- `package.json`: Manages dependencies and environment configuration.

## 🚀 Deployment
Hosted on **Vercel** for maximum speed and seamless integration.

### Environment Variables Required:
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`

---
*Built with ❤️ by Muhammad Reyka.*

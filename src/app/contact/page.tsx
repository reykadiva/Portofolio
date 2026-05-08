"use client";
// Force update for Vercel deployment
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { sendContactForm } from "../actions/contact";
import { personalInfo } from "@/data/portfolio";

export default function Contact() {
  const [isPending, setIsPending] = useState(false);
  const [feedback, setFeedback] = useState<{ status: "success" | "error"; message: string; errors?: string[] } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);
    setFeedback(null);

    const formData = new FormData(event.currentTarget);
    const result = await sendContactForm(formData);

    setIsPending(false);
    if (result.status === "success") {
      setFeedback({ status: "success", message: result.message || "Message sent successfully!" });
      (event.target as HTMLFormElement).reset();
    } else {
      setFeedback({ status: "error", message: result.message || "Ada kesalahan pada form:", errors: result.errors });
    }
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <header className="mb-10 sm:mb-16">
        <div className="w-12 h-1 bg-accent mb-4 sm:mb-6" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
          Get In <span className="text-accent">Touch</span>
        </h1>
        <p className="text-base sm:text-lg text-text-secondary max-w-2xl">
          Want to discuss, collaborate, or just say hi? Don&apos;t hesitate to contact me.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-bg-secondary p-5 sm:p-8 rounded-2xl border border-white/5 shadow-xl order-2 lg:order-1"
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 sm:mb-8">Send a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="hidden">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium text-text-secondary">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="w-full bg-bg-elevated border border-border px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none text-sm sm:text-base"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs sm:text-sm font-medium text-text-secondary">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="email@example.com"
                  className="w-full bg-bg-elevated border border-border px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium text-text-secondary">Category</label>
              <select
                name="category"
                required
                defaultValue=""
                className="w-full bg-bg-elevated border border-border px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none appearance-none text-sm sm:text-base"
              >
                <option value="" disabled>Select a category…</option>
                <option value="collaboration">Collaboration</option>
                <option value="hiring">Hiring / Recruitment</option>
                <option value="project">Project Inquiry</option>
                <option value="just_saying">Just saying hi!</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium text-text-secondary">Subject</label>
              <input
                type="text"
                name="subject"
                required
                placeholder="What do you want to discuss?"
                className="w-full bg-bg-elevated border border-border px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs sm:text-sm font-medium text-text-secondary">Message</label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Write your message here..."
                className="w-full bg-bg-elevated border border-border px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none resize-none text-sm sm:text-base"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-accent text-bg-primary font-bold rounded-full flex items-center justify-center gap-3 hover:bg-accent-hover disabled:opacity-50 transition-all shadow-glow text-sm sm:text-base"
            >
              {isPending ? "Sending..." : "Send Message"}
              <Send size={16} />
            </button>
          </form>

          {/* Feedback UI */}
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl border ${
                feedback.status === "success" 
                ? "bg-green-500/10 border-green-500/30" 
                : "bg-red-500/10 border-red-500/30"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                {feedback.status === "success" 
                  ? <CheckCircle2 className="text-green-500 shrink-0" size={18} /> 
                  : <AlertCircle className="text-red-500 shrink-0" size={18} />
                }
                <span className={`font-bold text-sm sm:text-base ${feedback.status === "success" ? "text-green-500" : "text-red-500"}`}>
                  {feedback.message}
                </span>
              </div>
              {feedback.errors && (
                <ul className="list-disc list-inside text-xs sm:text-sm text-red-400 space-y-1">
                  {feedback.errors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Sidebar Info */}
        <aside className="space-y-4 sm:space-y-6 order-1 lg:order-2">
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Contact Information</h2>
          
          <div className="space-y-3 sm:space-y-4">
            <ContactInfo icon={<Mail size={18} />} label="Email" value={personalInfo.email} href={`mailto:${personalInfo.email}`} />
            <ContactInfo icon={<Phone size={18} />} label="Phone" value={personalInfo.phone} href={`tel:${personalInfo.phone}`} />
            <ContactInfo icon={<MapPin size={18} />} label="Location" value={personalInfo.location} />
            <ContactInfo icon={<Linkedin size={18} />} label="LinkedIn" value={personalInfo.fullName} href={personalInfo.linkedin} />
          </div>

          <div className="flex gap-3 sm:gap-4 pt-2 sm:pt-4">
            <SocialLink href={personalInfo.github} icon={<Github size={18} />} />
            <SocialLink href={personalInfo.linkedin} icon={<Linkedin size={18} />} />
          </div>
        </aside>
      </div>
    </div>
  );
}

function ContactInfo({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  return (
    <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-bg-secondary rounded-xl sm:rounded-2xl border border-white/5 hover:border-accent/20 hover:bg-bg-elevated transition-all group">
      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-accent/10 text-accent rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-widest text-text-muted mb-0.5 sm:mb-1">{label}</div>
        {href ? (
          <a href={href} className="text-xs sm:text-sm text-text-primary font-medium hover:text-accent transition-colors break-all">{value}</a>
        ) : (
          <span className="text-xs sm:text-sm text-text-primary font-medium">{value}</span>
        )}
      </div>
    </div>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-bg-secondary border border-white/10 rounded-xl text-text-secondary hover:bg-accent hover:text-bg-primary hover:-translate-y-1 transition-all shadow-md"
    >
      {icon}
    </a>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { sendContactForm } from "../actions/contact";

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
      setFeedback({ status: "success", message: result.message });
      (event.target as HTMLFormElement).reset();
    } else {
      setFeedback({ status: "error", message: "Ada kesalahan pada form:", errors: result.errors });
    }
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <header className="mb-16">
        <div className="w-12 h-1 bg-accent mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Get In <span className="text-accent">Touch</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          Want to discuss, collaborate, or just say hi? Don&apos;t hesitate to contact me.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-bg-secondary p-8 rounded-2xl border border-white/5 shadow-xl"
        >
          <h2 className="text-2xl font-semibold mb-8">Send a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="hidden">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="w-full bg-bg-elevated border border-border px-4 py-3 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-secondary">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="email@example.com"
                  className="w-full bg-bg-elevated border border-border px-4 py-3 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Category</label>
              <select
                name="category"
                required
                defaultValue=""
                className="w-full bg-bg-elevated border border-border px-4 py-3 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none appearance-none"
              >
                <option value="" disabled>Select a category…</option>
                <option value="collaboration">Collaboration</option>
                <option value="hiring">Hiring / Recruitment</option>
                <option value="project">Project Inquiry</option>
                <option value="just_saying">Just saying hi!</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Subject</label>
              <input
                type="text"
                name="subject"
                required
                placeholder="What do you want to discuss?"
                className="w-full bg-bg-elevated border border-border px-4 py-3 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-secondary">Message</label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Write your message here..."
                className="w-full bg-bg-elevated border border-border px-4 py-3 rounded-xl focus:border-accent focus:ring-1 focus:ring-accent transition-all outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full md:w-auto px-10 py-4 bg-accent text-bg-primary font-bold rounded-full flex items-center justify-center gap-3 hover:bg-accent-hover disabled:opacity-50 transition-all shadow-glow"
            >
              {isPending ? "Sending..." : "Send Message"}
              <Send size={18} />
            </button>
          </form>

          {/* Feedback UI */}
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-8 p-6 rounded-xl border ${
                feedback.status === "success" 
                ? "bg-green-500/10 border-green-500/30" 
                : "bg-red-500/10 border-red-500/30"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                {feedback.status === "success" 
                  ? <CheckCircle2 className="text-green-500" /> 
                  : <AlertCircle className="text-red-500" />
                }
                <span className={`font-bold ${feedback.status === "success" ? "text-green-500" : "text-red-500"}`}>
                  {feedback.message}
                </span>
              </div>
              {feedback.errors && (
                <ul className="list-disc list-inside text-sm text-red-400 space-y-1">
                  {feedback.errors.map((err, i) => <li key={i}>{err}</li>)}
                </ul>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Sidebar Info */}
        <aside className="space-y-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          
          <div className="space-y-4">
            <ContactInfo icon={<Mail size={20} />} label="Email" value="revka334@gmail.com" href="mailto:revka334@gmail.com" />
            <ContactInfo icon={<Phone size={20} />} label="Phone" value="085267900655" href="tel:085267900655" />
            <ContactInfo icon={<MapPin size={20} />} label="Location" value="Cikarang, West Java" />
            <ContactInfo icon={<Linkedin size={20} />} label="LinkedIn" value="Muhammad Reyka Agastya Divaputra" href="https://www.linkedin.com/in/reykaagastya/" />
          </div>

          <div className="flex gap-4 pt-4">
            <SocialLink href="https://github.com/reykadiva" icon={<Github size={20} />} />
            <SocialLink href="https://www.linkedin.com/in/reykaagastya/" icon={<Linkedin size={20} />} />
          </div>
        </aside>
      </div>
    </div>
  );
}

function ContactInfo({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  return (
    <div className="flex items-center gap-6 p-6 bg-bg-secondary rounded-2xl border border-white/5 hover:border-accent/20 hover:bg-bg-elevated transition-all group">
      <div className="w-12 h-12 flex items-center justify-center bg-accent/10 text-accent rounded-xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-text-muted mb-1">{label}</div>
        {href ? (
          <a href={href} className="text-text-primary font-medium hover:text-accent transition-colors">{value}</a>
        ) : (
          <span className="text-text-primary font-medium">{value}</span>
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
      className="w-12 h-12 flex items-center justify-center bg-bg-secondary border border-white/10 rounded-xl text-text-secondary hover:bg-accent hover:text-bg-primary hover:-translate-y-1 transition-all shadow-md"
    >
      {icon}
    </a>
  );
}

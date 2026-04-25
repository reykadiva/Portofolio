"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-6 py-12 md:py-24">
      <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-24 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -top-[50%] -right-[20%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex-1 text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-accent font-medium uppercase tracking-[3px] text-sm mb-4"
          >
            IoT Enthusiast & Full-Stack Developer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 bg-gradient-to-br from-text-primary to-text-secondary bg-clip-text text-transparent"
          >
            Muhammad <br />
            <span className="text-text-primary">Reyka Agastya</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl leading-relaxed"
          >
            I build bridges between hardware and software. Specializing in IoT systems, 
            embedded devices, and modern web applications with a focus on performance and impact.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center md:justify-start gap-4 mb-12"
          >
            <Link href="/projects" className="group px-8 py-3 bg-accent text-bg-primary font-bold rounded-full flex items-center gap-2 hover:bg-accent-hover hover:scale-[1.03] transition-all duration-200">
              SEE MY WORK
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="px-8 py-3 border border-border-light text-text-primary font-bold rounded-full hover:border-text-primary hover:scale-[1.03] transition-all duration-200">
              HIRE ME
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center justify-center md:justify-start gap-6"
          >
            <a href="https://github.com/reykadiva" target="_blank" className="text-text-muted hover:text-accent transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/reykaagastya/" target="_blank" className="text-text-muted hover:text-accent transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="mailto:revka334@gmail.com" className="text-text-muted hover:text-accent transition-colors">
              <Mail size={24} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative shrink-0"
        >
          <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] relative">
            <Image
              src="/profile2.jpeg"
              alt="Muhammad Reyka"
              fill
              className="object-cover rounded-full border-4 border-accent shadow-glow"
            />
            {/* Animated Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border-2 border-dashed border-accent/30 rounded-full"
            />
          </div>
        </motion.div>
      </div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-white/5"
      >
        <div className="text-center md:text-left">
          <div className="text-3xl font-bold text-accent">2+</div>
          <div className="text-xs text-text-muted uppercase tracking-widest mt-1">Years Experience</div>
        </div>
        <div className="text-center md:text-left">
          <div className="text-3xl font-bold text-accent">10+</div>
          <div className="text-xs text-text-muted uppercase tracking-widest mt-1">Projects Built</div>
        </div>
        <div className="text-center md:text-left">
          <div className="text-3xl font-bold text-accent">5+</div>
          <div className="text-xs text-text-muted uppercase tracking-widest mt-1">IoT Systems</div>
        </div>
        <div className="text-center md:text-left">
          <div className="text-3xl font-bold text-accent">3.50</div>
          <div className="text-xs text-text-muted uppercase tracking-widest mt-1">GPA Score</div>
        </div>
      </motion.div>
    </div>
  );
}

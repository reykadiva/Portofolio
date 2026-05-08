"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo, homeStats } from "@/data/portfolio";

export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 md:py-24">
      <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-24 relative">
        {/* Decorative background glow */}
        <div className="absolute -top-[50%] -right-[20%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex-1 text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-accent font-medium uppercase tracking-[2px] sm:tracking-[3px] text-xs sm:text-sm mb-3 sm:mb-4"
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-7xl font-extrabold leading-tight mb-4 sm:mb-6 bg-gradient-to-br from-text-primary to-text-secondary bg-clip-text text-transparent"
          >
            Muhammad <br />
            <span className="text-text-primary">Reyka Agastya</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-text-secondary mb-8 sm:mb-10 max-w-2xl leading-relaxed mx-auto md:mx-0"
          >
            {personalInfo.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-3 sm:gap-4 mb-10 sm:mb-12"
          >
            <Link href="/projects" className="group px-6 sm:px-8 py-3 bg-accent text-bg-primary font-bold rounded-full flex items-center justify-center gap-2 hover:bg-accent-hover hover:scale-[1.03] transition-all duration-200 text-sm sm:text-base">
              SEE MY WORK
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="px-6 sm:px-8 py-3 border border-border-light text-text-primary font-bold rounded-full hover:border-text-primary hover:scale-[1.03] transition-all duration-200 text-center text-sm sm:text-base">
              HIRE ME
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center justify-center md:justify-start gap-6"
          >
            <a href={personalInfo.github} target="_blank" className="text-text-muted hover:text-accent transition-colors">
              <Github size={22} />
            </a>
            <a href={personalInfo.linkedin} target="_blank" className="text-text-muted hover:text-accent transition-colors">
              <Linkedin size={22} />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="text-text-muted hover:text-accent transition-colors">
              <Mail size={22} />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative shrink-0"
        >
          {/* Outer wrapper with enough padding for the animated ring */}
          <div className="p-6">
            <div className="w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] md:w-[320px] md:h-[320px] relative">
              <Image
                src={personalInfo.profileImage}
                alt={personalInfo.shortName}
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
          </div>
        </motion.div>
      </div>

      {/* Stats Section — auto-generated from portfolio data */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mt-16 sm:mt-24 pt-8 sm:pt-12 border-t border-white/5"
      >
        {homeStats.map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <div className="text-2xl sm:text-3xl font-bold text-accent">{stat.value}</div>
            <div className="text-[10px] sm:text-xs text-text-muted uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

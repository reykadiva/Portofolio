"use client";

import { motion } from "framer-motion";
import { ClipboardList, Users, Clock } from "lucide-react";
import { experienceData, experienceStats } from "@/data/portfolio";

const statIcons = [
  <ClipboardList key="clipboard" size={24} />,
  <Users key="users" size={24} />,
  <Clock key="clock" size={24} />,
];

export default function Experience() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <header className="mb-10 sm:mb-16">
        <div className="w-12 h-1 bg-accent mb-4 sm:mb-6" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
          Organizational <span className="text-accent">Experience</span>
        </h1>
        <p className="text-base sm:text-lg text-text-secondary max-w-2xl">
          A timeline of my organizational experiences and university activities.
        </p>
      </header>

      {/* Stats Summary */}
      <section className="grid grid-cols-3 gap-3 sm:gap-6 mb-16 sm:mb-24">
        {experienceStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-4 sm:p-8 bg-bg-secondary rounded-xl sm:rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:border-accent/20 transition-all"
          >
            <div className="text-accent mb-2 sm:mb-4 group-hover:scale-110 transition-transform">
              {statIcons[i]}
            </div>
            <div className="text-2xl sm:text-4xl font-black text-accent mb-1">{stat.number}</div>
            <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-text-muted font-bold leading-tight">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Timeline Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Timeline</h2>
        
        <div className="relative pl-6 sm:pl-8 md:pl-12 border-l-2 border-accent/20 space-y-12 sm:space-y-16">
          {experienceData.map((item) => (
            <motion.article
              key={item.role + item.org}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Dot */}
              <div className="absolute -left-[31px] sm:-left-[37px] md:-left-[57px] top-2 w-3 h-3 sm:w-4 sm:h-4 bg-accent rounded-full border-[3px] sm:border-4 border-bg-primary shadow-[0_0_10px_rgba(29,185,84,0.5)]" />
              
              <div className="flex flex-col gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <h3 className="text-lg sm:text-2xl font-bold text-text-primary">{item.role}</h3>
                  <p className="text-accent font-medium text-sm sm:text-base">{item.org}</p>
                </div>
                <span className="self-start px-3 sm:px-4 py-1 sm:py-1.5 bg-bg-elevated text-text-muted text-[10px] sm:text-xs font-bold rounded-full border border-white/5 whitespace-nowrap">
                  {item.period}
                </span>
              </div>

              <ul className="space-y-3 sm:space-y-4">
                {item.details.map((detail, j) => (
                  <li key={j} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-text-secondary leading-relaxed">
                    <span className="text-accent mt-1 sm:mt-1.5 shrink-0 text-xs sm:text-base">▹</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}

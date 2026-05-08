"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { personalInfo, education, aboutDescriptions, skills, languages } from "@/data/portfolio";

const profileDetails = [
  { label: "Full Name", value: personalInfo.fullName },
  { label: "Location", value: personalInfo.location },
  { label: "Email", value: personalInfo.email, isLink: true, href: `mailto:${personalInfo.email}` },
  { label: "University", value: education.university },
];

export default function About() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <header className="mb-10 sm:mb-16">
        <div className="w-12 h-1 bg-accent mb-4 sm:mb-6" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
          About <span className="text-accent">Me</span>
        </h1>
        <p className="text-base sm:text-lg text-text-secondary max-w-2xl">
          Get to know me better, my educational background, and my skills.
        </p>
      </header>

      {/* Profile Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center mb-16 sm:mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full aspect-square max-w-[280px] sm:max-w-md mx-auto lg:mx-0"
        >
          <Image
            src={personalInfo.profileImage}
            alt={personalInfo.shortName}
            fill
            className="object-cover rounded-2xl border-2 border-white/5 shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-4 sm:space-y-6"
        >
          {aboutDescriptions.map((desc, i) => (
            <p
              key={i}
              className={desc.className}
              dangerouslySetInnerHTML={{ __html: desc.text }}
            />
          ))}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6">
            {profileDetails.map((detail) => (
              <div key={detail.label} className="p-3 sm:p-4 bg-bg-secondary rounded-xl border border-white/5">
                <div className="text-[10px] uppercase tracking-widest text-text-muted mb-1">{detail.label}</div>
                {detail.isLink ? (
                  <a href={detail.href} className="text-xs sm:text-sm font-medium hover:text-accent transition-colors break-all">{detail.value}</a>
                ) : (
                  <div className="text-xs sm:text-sm font-medium">{detail.value}</div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Education Section */}
      <section className="mb-16 sm:mb-24">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Education</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-bg-secondary p-6 sm:p-8 rounded-2xl border border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6"
        >
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-1">{education.degree}</h3>
            <p className="text-accent font-medium text-sm sm:text-base">{education.university}</p>
          </div>
          <div className="sm:text-right">
            <div className="text-xs sm:text-sm text-text-muted mb-2 font-medium">{education.period}</div>
            <div className="text-3xl sm:text-4xl font-black text-accent">{education.gpa.toFixed(2)}</div>
            <div className="text-[10px] uppercase tracking-widest text-text-muted">GPA / {education.maxGpa.toFixed(2)}</div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="mb-16 sm:mb-24">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Key <span className="text-accent">Skills</span></h2>
        
        {/* Mobile: Card layout */}
        <div className="block sm:hidden space-y-4">
          {skills.map((skill) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-bg-secondary p-4 rounded-xl border border-white/5"
            >
              <div className="text-xs font-bold text-accent uppercase tracking-widest mb-3">{skill.category}</div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span key={item} className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop: Table layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="hidden sm:block overflow-hidden rounded-2xl border border-white/5 bg-bg-secondary"
        >
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-elevated/50">
                <th className="p-6 text-sm font-bold text-accent uppercase tracking-widest border-b border-white/5">Category</th>
                <th className="p-6 text-sm font-bold text-accent uppercase tracking-widest border-b border-white/5">Skills</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill) => (
                <tr key={skill.category} className="group hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-sm font-bold border-b border-white/5 align-top w-40">{skill.category}</td>
                  <td className="p-6 border-b border-white/5">
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span key={item} className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20">
                          {item}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </section>

      {/* Languages Section */}
      <section>
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Languages</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 max-w-3xl">
          {languages.map((lang) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <div className="flex justify-between items-end">
                <span className="font-bold text-sm sm:text-base">{lang.name}</span>
                <span className="text-[10px] sm:text-xs text-text-muted">{lang.level}</span>
              </div>
              <div className="h-2 bg-bg-secondary rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${lang.percentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="h-full bg-accent"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

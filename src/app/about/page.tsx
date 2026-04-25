"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const profileDetails = [
  { label: "Full Name", value: "Muhammad Reyka Agastya Divaputra" },
  { label: "Location", value: "Cikarang, West Java" },
  { label: "Email", value: "revka334@gmail.com", isLink: true, href: "mailto:revka334@gmail.com" },
  { label: "University", value: "Paramadina University" },
];

const skills = [
  { category: "Technical", items: ["IoT Projects", "C++", "Figma", "Canva", "Photoshop"] },
  { category: "Organizational", items: ["Event Management", "Project Management", "Leadership", "Team Coordination"] },
  { category: "Analytical", items: ["Problem Solving", "Analytical Thinking", "Attention to Detail"] },
  { category: "Tools", items: ["Microsoft Office", "Google Workspace"] },
];

const languages = [
  { name: "Indonesian", level: "Native", percentage: 100 },
  { name: "English", level: "Limited Working Proficiency", percentage: 55 },
];

export default function About() {
  return (
    <div className="container mx-auto px-6 py-12">
      <header className="mb-16">
        <div className="w-12 h-1 bg-accent mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About <span className="text-accent">Me</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          Get to know me better, my educational background, and my skills.
        </p>
      </header>

      {/* Profile Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-full aspect-square max-w-md mx-auto lg:mx-0"
        >
          <Image
            src="/profile2.jpeg"
            alt="Muhammad Reyka"
            fill
            className="object-cover rounded-2xl border-2 border-white/5 shadow-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="text-lg leading-relaxed">
            I am an <strong className="text-accent">Informatics Engineering</strong> student at Paramadina University, 
            actively involved in various student activities and organizations. Experienced as 
            Vice Chairperson in a social organization, Event Division Coordinator during university orientation programs, 
            and Game Making Division member in the IT Fest competition.
          </p>
          <p className="text-lg leading-relaxed text-text-secondary">
            Skilled in teamwork, able to perform well under pressure, and adaptable 
            to various roles. With this background, I am eager to develop my career 
            in the digital field and contribute positively to a professional environment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6">
            {profileDetails.map((detail) => (
              <div key={detail.label} className="p-4 bg-bg-secondary rounded-xl border border-white/5">
                <div className="text-[10px] uppercase tracking-widest text-text-muted mb-1">{detail.label}</div>
                {detail.isLink ? (
                  <a href={detail.href} className="text-sm font-medium hover:text-accent transition-colors">{detail.value}</a>
                ) : (
                  <div className="text-sm font-medium">{detail.value}</div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Education Section */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-8">Education</h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-bg-secondary p-8 rounded-2xl border border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div>
            <h3 className="text-2xl font-bold mb-1">Informatics Engineering</h3>
            <p className="text-accent font-medium">Paramadina University</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-text-muted mb-2 font-medium">2023 — Present</div>
            <div className="text-4xl font-black text-accent">3.67</div>
            <div className="text-[10px] uppercase tracking-widest text-text-muted">GPA / 4.00</div>
          </div>
        </motion.div>
      </section>

      {/* Skills Table Section */}
      <section className="mb-24">
        <h2 className="text-3xl font-bold mb-8">Key <span className="text-accent">Skills</span></h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-hidden rounded-2xl border border-white/5 bg-bg-secondary"
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
        <h2 className="text-3xl font-bold mb-8">Languages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl">
          {languages.map((lang) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-3"
            >
              <div className="flex justify-between items-end">
                <span className="font-bold">{lang.name}</span>
                <span className="text-xs text-text-muted">{lang.level}</span>
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

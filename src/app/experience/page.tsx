"use client";

import { motion } from "framer-motion";
import { ClipboardList, Users, Clock } from "lucide-react";

const stats = [
  { icon: <ClipboardList size={24} />, number: "4", label: "Total Organizations" },
  { icon: <Users size={24} />, number: "350+", label: "People Managed" },
  { icon: <Clock size={24} />, number: "2+", label: "Years of Experience" },
];

const timelineData = [
  {
    role: "Event Coordinator",
    org: "Exmazarts — Campus Orientation Program",
    period: "Jul 2025 — Sep 2025",
    details: [
      "Led a team of 10 members in organizing the Campus Orientation Program attended by over 350 participants.",
      "Collaborated with the Event Chairperson to design and execute the main event agenda, ensuring smooth coordination across all committees.",
      "Achieved a successful and well-received event, gaining positive feedback from participants and appreciation from university executives."
    ]
  },
  {
    role: "Vice Chairperson",
    org: "Paramadina Social Care",
    period: "Jan 2024 — Mar 2025",
    details: [
      "Led and coordinated a team of over 80 active members in managing multiple social and educational programs focused on elementary to high school students.",
      "Successfully served as the person-in-charge for several major initiatives such as PSC Peduli Kasih, Biru Muda, and Inauguration Events, ensuring smooth execution and strong team collaboration.",
      "Fostered unity and collaboration across all divisions by integrating ideas from various team members, resulting in well-executed and impactful community programs."
    ]
  },
  {
    role: "Event Division Member",
    org: "Exmazarts — Campus Orientation Program",
    period: "Jul 2024 — Sep 2024",
    details: [
      "Contributed to the planning and development of event concepts, themes, and activity schedules as part of a 40+ member organizing team.",
      "Assisted in managing event logistics and ensuring smooth execution for an event attended by around 180 participants.",
      "Gained valuable experience in teamwork, event coordination, and creative planning — serving as a foundation for leadership role in the following year's orientation program."
    ]
  },
  {
    role: "Game Making Division Member",
    org: "IT Fest 4.0 — Universitas Paramadina",
    period: "May 2024 — Sep 2024",
    details: [
      "Contributed to the successful execution of one of IT Fest's key sub-events, promoting creativity and innovation among student participants.",
      "Organized the Game Making competition, handling the development of themes, subthemes, technical guidelines, jury selection, and overall event logistics.",
      "Collaborated with fellow committee members to ensure a well-structured and engaging competition involving 5–7 participating teams."
    ]
  }
];

export default function Experience() {
  return (
    <div className="container mx-auto px-6 py-12">
      <header className="mb-16">
        <div className="w-12 h-1 bg-accent mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Organizational <span className="text-accent">Experience</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          A timeline of my organizational experiences and university activities.
        </p>
      </header>

      {/* Stats Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-bg-secondary rounded-2xl border border-white/5 flex flex-col items-center text-center group hover:border-accent/20 transition-all"
          >
            <div className="text-accent mb-4 group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <div className="text-4xl font-black text-accent mb-1">{stat.number}</div>
            <div className="text-[10px] uppercase tracking-widest text-text-muted font-bold">{stat.label}</div>
          </motion.div>
        ))}
      </section>

      {/* Timeline Section */}
      <section>
        <h2 className="text-3xl font-bold mb-12">Timeline</h2>
        
        <div className="relative pl-8 md:pl-12 border-l-2 border-accent/20 space-y-16">
          {timelineData.map((item, i) => (
            <motion.article
              key={item.role + item.org}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Dot */}
              <div className="absolute -left-[41px] md:-left-[57px] top-2 w-4 h-4 bg-accent rounded-full border-4 border-bg-primary shadow-[0_0_10px_rgba(29,185,84,0.5)]" />
              
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-text-primary">{item.role}</h3>
                  <p className="text-accent font-medium">{item.org}</p>
                </div>
                <span className="px-4 py-1.5 bg-bg-elevated text-text-muted text-xs font-bold rounded-full border border-white/5 whitespace-nowrap">
                  {item.period}
                </span>
              </div>

              <ul className="space-y-4">
                {item.details.map((detail, j) => (
                  <li key={j} className="flex items-start gap-3 text-text-secondary leading-relaxed">
                    <span className="text-accent mt-1.5 shrink-0">▹</span>
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

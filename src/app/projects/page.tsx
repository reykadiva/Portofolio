"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { X, ExternalLink, Github as GithubIcon } from "lucide-react";

const projectsData = [
  {
    id: "project-1",
    title: "Smart Attendance System (SAS) Based On IoT",
    category: "IoT / Full-Stack",
    description: "Smart Attendance System (SAS) Based On IoT utilizing ESP32, RFID, and facial verification along with a web monitoring dashboard.",
    longDescription: `
      <p>The Smart Attendance System (SAS) is an IoT project that aims to integrate hardware components like the ESP32 and RFID RC522 with a custom-built web server. It features a web dashboard for live monitoring and attendance logs.</p>
      <p><strong>Note:</strong> Meskipun project ini pada akhirnya tidak begitu berhasil sepenuhnya seperti yang diharapkan, saya belajar banyak hal berharga dari proses pembuatannya. Pengalaman ini mengajarkan saya tentang integrasi hardware-software, komunikasi API, dan pengembangan sistem full-stack secara keseluruhan.</p>
    `,
    image: "/sas-iot.jpg",
    tags: ["ESP32", "Python", "Flask", "RFID", "HTML/CSS", "IoT"],
    features: [
      "Live attendance monitoring web dashboard",
      "Hardware integration using ESP32 and RFID RC522",
      "Facial verification service attempt",
      "Student attendance data logging and statistics"
    ],
    links: [
      { label: "View Source", url: "https://github.com/reykadiva/AbsenProject", type: "primary" }
    ]
  },
  {
    id: "project-2",
    title: "BeBeauty - Sustainable Beauty Platform",
    category: "Web App / Sustainability",
    description: "A sustainable beauty movement platform for recycling cosmetic packaging with reward systems and eco-impact tracking.",
    longDescription: `
      <p>BeBeauty adalah platform inovatif yang dirancang untuk mendorong daur ulang kemasan kosmetik. Platform ini menghubungkan pengguna dengan mesin daur ulang khusus, memungkinkan mereka melacak dampak lingkungan mereka dan mendapatkan reward atas kontribusi mereka.</p>
      <p><strong>Note:</strong> Data lokasi mesin yang ditampilkan saat ini adalah data dummy dan platform ini siap untuk dikembangkan lebih lanjut untuk integrasi dengan sistem IoT mesin daur ulang fisik jika diperlukan.</p>
    `,
    image: "/bebeauty.jpg",
    tags: ["React", "Tailwind CSS", "Lovable", "UI/UX Design", "Sustainability"],
    features: [
      "Dashboard interaktif untuk melacak poin dan item kosmetik",
      "Pelacakan dampak lingkungan (Eco-Impact) secara real-time",
      "Sistem pencari lokasi mesin daur ulang terdekat (Dummy Data)",
      "Sistem rewards untuk menukarkan poin",
      "Desain modern dan responsif dengan estetika premium"
    ],
    links: [
      { label: "View Live", url: "https://bebeautyproject.lovable.app/", type: "primary" },
      { label: "View Source", url: "https://github.com/reykadiva/bebeautyproject", type: "outline" }
    ]
  },
  {
    id: "project-3",
    title: "Personal Portfolio Website",
    category: "Web Development",
    description: "A modern, responsive portfolio website built from scratch using only HTML, CSS, and vanilla JavaScript with a dark Spotify-inspired theme.",
    longDescription: `
      <p>A fully custom-built, multi-page personal portfolio website designed with a dark Spotify-inspired theme. The site is built entirely from scratch using HTML, CSS, and vanilla JavaScript — no frameworks or libraries used.</p>
      <p>The portfolio showcases my educational background, organizational experiences, technical skills, and projects in a clean, modern, and responsive layout with smooth page transitions and micro-animations.</p>
    `,
    image: "/profile2.jpeg", // Using profile as placeholder
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "SEO"],
    features: [
      "Multi-page architecture with consistent design system",
      "Custom CSS design tokens (Spotify-inspired)",
      "Responsive design for all device sizes",
      "SVG-based icons for crisp visuals",
      "Fade-in scroll animations"
    ],
    links: [
      { label: "View Source", url: "https://github.com/reykadiva/Portofolio", type: "primary" }
    ]
  }
];

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = projectsData.find((p) => p.id === selectedId);

  return (
    <div className="container mx-auto px-6 py-12">
      <header className="mb-16">
        <div className="w-12 h-1 bg-accent mb-6" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          My <span className="text-accent">Projects</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl">
          A showcase of things I've built, explored, and experimented with.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.id}
            {...project}
            index={index}
            onClick={setSelectedId}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-[2000] flex items-center justify-center p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transform-gpu"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-bg-secondary w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 shadow-2xl transform-gpu"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-white/10 rounded-full text-white transition-colors"
              >
                <X size={20} />
              </button>

              <div className="relative h-64 md:h-96 w-full">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent" />
              </div>

              <div className="p-8 md:p-12">
                <div className="text-xs text-accent font-bold uppercase tracking-widest mb-2">
                  {selectedProject.category}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  {selectedProject.title}
                </h2>

                <div className="prose prose-invert max-w-none mb-8 text-text-secondary leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: selectedProject.longDescription }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-4">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-accent/10 text-accent text-xs rounded-full border border-accent/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-4">Key Features</h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map(feature => (
                        <li key={feature} className="text-sm text-text-secondary flex items-start gap-2">
                          <span className="text-accent mt-1">▹</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 pt-8 border-t border-white/5">
                  {selectedProject.links.map(link => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      className={`px-8 py-3 rounded-full font-bold flex items-center gap-2 transition-all ${
                        link.type === "primary" 
                        ? "bg-accent text-bg-primary hover:bg-accent-hover" 
                        : "border border-border-light text-text-primary hover:border-text-primary"
                      }`}
                    >
                      {link.label}
                      {link.label.includes("Live") ? <ExternalLink size={16} /> : <GithubIcon size={16} />}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

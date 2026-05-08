"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { X, ExternalLink, Github as GithubIcon } from "lucide-react";
import { projectsData } from "@/data/portfolio";

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = projectsData.find((p) => p.id === selectedId);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedId]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <header className="mb-10 sm:mb-16">
        <div className="w-12 h-1 bg-accent mb-4 sm:mb-6" />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
          My <span className="text-accent">Projects</span>
        </h1>
        <p className="text-base sm:text-lg text-text-secondary max-w-2xl">
          A showcase of things I've built, explored, and experimented with.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
          <div className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transform-gpu"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="relative bg-bg-secondary w-full sm:max-w-4xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-white/10 shadow-2xl transform-gpu"
            >
              {/* Drag handle for mobile */}
              <div className="sm:hidden flex justify-center pt-3 pb-1 sticky top-0 z-20 bg-bg-secondary rounded-t-2xl">
                <div className="w-10 h-1 bg-white/20 rounded-full" />
              </div>

              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 p-2 bg-black/50 hover:bg-white/10 rounded-full text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="relative h-48 sm:h-64 md:h-96 w-full">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent" />
              </div>

              <div className="p-5 sm:p-8 md:p-12">
                <div className="text-[10px] sm:text-xs text-accent font-bold uppercase tracking-widest mb-2">
                  {selectedProject.category}
                </div>
                <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
                  {selectedProject.title}
                </h2>

                <div className="prose prose-invert max-w-none mb-6 sm:mb-8 text-sm sm:text-base text-text-secondary leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: selectedProject.longDescription }} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-text-muted uppercase tracking-widest mb-3 sm:mb-4">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map(tag => (
                        <span key={tag} className="px-2.5 sm:px-3 py-1 bg-accent/10 text-accent text-[10px] sm:text-xs rounded-full border border-accent/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-text-muted uppercase tracking-widest mb-3 sm:mb-4">Key Features</h4>
                    <ul className="space-y-2">
                      {selectedProject.features.map(feature => (
                        <li key={feature} className="text-xs sm:text-sm text-text-secondary flex items-start gap-2">
                          <span className="text-accent mt-0.5 sm:mt-1">▹</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-white/5">
                  {selectedProject.links.map(link => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      className={`px-6 sm:px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 transition-all text-sm sm:text-base ${
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

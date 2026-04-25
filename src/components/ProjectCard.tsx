"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  onClick: (id: string) => void;
  index: number;
}

export default function ProjectCard({
  id,
  title,
  category,
  description,
  image,
  tags,
  onClick,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-bg-secondary rounded-lg border border-white/5 overflow-hidden cursor-pointer group hover:bg-bg-elevated hover:border-white/10 transition-all duration-300 shadow-md hover:shadow-lg"
      onClick={() => onClick(id)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image.startsWith("/") ? image : `/${image}`}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary to-transparent opacity-60 group-hover:from-bg-elevated" />
      </div>

      <div className="p-6">
        <div className="text-[10px] text-accent font-bold uppercase tracking-widest mb-2">
          {category}
        </div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h3 className="text-xl font-semibold text-text-primary">
            {title}
          </h3>
          <ArrowRight className="text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" size={18} />
        </div>
        <p className="text-sm text-text-secondary line-clamp-2 mb-4 leading-relaxed">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-medium px-2.5 py-1 bg-accent/10 text-accent rounded-full border border-accent/15"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

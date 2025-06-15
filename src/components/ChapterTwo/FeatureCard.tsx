
import React from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";

// Only allow list these icons as per docs
const allowedIcons = {
  "star": LucideIcons.Star,
  "arrow-right": LucideIcons.ArrowRight,
  "bookmark": LucideIcons.Bookmark,
} as const;

type FeatureCardProps = {
  icon: keyof typeof allowedIcons;
  title: string;
  description: string;
};

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  const Icon = allowedIcons[icon];
  return (
    <motion.div
      whileHover={{ rotateY: 11, scale: 1.06, boxShadow: "0 10px 36px -7px #7266f7aa" }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className="flex flex-col items-center bg-indigo-800/80 px-7 py-7 rounded-2xl shadow-xl border border-indigo-500/30 min-w-[210px] w-full md:w-[220px] select-none cursor-pointer hover:border-indigo-500/70 focus:outline-none focus:ring-2 focus:ring-indigo-600"
      style={{ perspective: 600 }}
      tabIndex={0}
    >
      <Icon size={38} className="mb-3 text-indigo-300" />
      <h4 className="mb-2 font-bold text-lg text-indigo-100">{title}</h4>
      <p className="text-indigo-200/90 text-base text-center">{description}</p>
    </motion.div>
  );
}

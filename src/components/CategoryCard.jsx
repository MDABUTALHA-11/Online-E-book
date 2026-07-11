import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Microscope, Calculator, Atom, FlaskConical, Infinity as InfinityIcon, Dna, BookOpen, ChevronRight } from 'lucide-react';

const icons = { microscope:Microscope, calculator:Calculator, atom:Atom, 'flask-conical':FlaskConical, infinity:InfinityIcon, dna:Dna, binary:InfinityIcon };

export default function CategoryCard({ category }) {
  const Icon = icons[category.icon] || BookOpen;

  return (
    <Link to={`/subject/${category.slug}`} className="no-underline block group">
      <motion.div
        whileHover={{ 
          y: -4, 
          scale: 1.02, 
          boxShadow: `0 0 20px ${category.themeColor}25, 0 0 0 1.5px ${category.themeColor}`
        }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-2 sm:gap-4 p-4 sm:p-5 rounded-lg text-center sm:text-left relative overflow-hidden"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}
      >
        {/* Glow Background Effect */}
        <div 
          className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-[40px] opacity-10"
          style={{ background: category.themeColor }}
        />

        {/* Icon */}
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform border border-[var(--bg-border)]"
          style={{ 
            background: `${category.themeColor}10`, 
            borderColor: `${category.themeColor}25` 
          }}
        >
          <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: category.themeColor }} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 flex flex-col items-center sm:items-start w-full">
          <h3 className="text-[var(--text-primary)] font-bold text-[18px] sm:text-[20px] font-bn leading-tight transition-colors truncate w-full group-hover:text-[var(--primary)]"
              style={{ textShadow: `0 0 20px ${category.themeColor}10` }}>
            {category.name}
          </h3>
          <p className="text-[var(--text-muted)] text-[12px] sm:text-[13px] font-bold mt-1.5 flex flex-col sm:flex-row items-center sm:justify-start gap-1 w-full justify-center">
            <span className="flex items-center gap-1.5 font-mono">
              <BookOpen className="w-4 h-4 hidden sm:block opacity-40 text-[var(--primary)]" /> 
              {category.count}
            </span>
            <span className="hidden sm:inline opacity-30">·</span>
            <span className="font-bold px-2 py-0.5 rounded-sm text-[10px] sm:text-[11px] uppercase tracking-wider animate-pulse-soft font-mono border" 
                  style={{ background: `${category.themeColor}15`, borderColor: `${category.themeColor}30`, color: category.themeColor }}>
              Free
            </span>
          </p>
        </div>

        {/* Arrow */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 opacity-0 sm:opacity-100 group-hover:opacity-100 transition-all hidden sm:block">
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" style={{ color: category.themeColor }} />
        </div>
      </motion.div>
    </Link>
  );
}

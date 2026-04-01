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
        whileHover={{ y: -4, borderColor: category.themeColor + '40' }}
        className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-2 sm:gap-4 p-4 sm:p-5 rounded-2xl transition-all duration-300 text-center sm:text-left relative overflow-hidden"
        style={{ background: '#0d1b2a', border: '1.5px solid #1e3a5f' }}
      >
        {/* Glow Background Effect */}
        <div 
          className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-[40px] opacity-10"
          style={{ background: category.themeColor }}
        />

        {/* Icon */}
        <div
          className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
          style={{ 
            background: `${category.themeColor}10`, 
            border: `1px solid ${category.themeColor}25` 
          }}
        >
          <Icon className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: category.themeColor }} />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0 flex flex-col items-center sm:items-start w-full">
          <h3 className="text-white font-black text-[18px] sm:text-[20px] font-bn leading-tight transition-colors truncate w-full group-hover:text-white"
              style={{ textShadow: `0 0 20px ${category.themeColor}20` }}>
            {category.name}
          </h3>
          <p className="text-[#64748b] text-[12px] sm:text-[13px] font-bold mt-1.5 flex flex-col sm:flex-row items-center sm:justify-start gap-1 w-full justify-center">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 hidden sm:block opacity-40" /> 
              {category.count}
            </span>
            <span className="hidden sm:inline opacity-30">·</span>
            <span className="font-black px-2 py-0.5 rounded-lg text-[10px] sm:text-[11px] uppercase tracking-wider" 
                  style={{ background: `${category.themeColor}15`, color: category.themeColor }}>
              বিনামূল্যে
            </span>
          </p>
        </div>

        {/* Arrow */}
        <div className="absolute top-1/2 -translate-y-1/2 right-4 opacity-0 sm:opacity-100 group-hover:opacity-100 transition-all hidden sm:block">
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" style={{ color: category.themeColor }} />
        </div>
      </motion.div>
    </Link>
  );
}

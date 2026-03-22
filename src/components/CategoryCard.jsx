import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Microscope,
  Calculator,
  Atom,
  FlaskConical,
  Infinity,
  Dna,
  ChevronRight,
  BookOpen
} from 'lucide-react';

const icons = {
  microscope: Microscope,
  calculator: Calculator,
  atom: Atom,
  'flask-conical': FlaskConical,
  infinity: Infinity,
  dna: Dna,
  binary: Infinity // Fallback for binary
};

const CategoryCard = ({ category }) => {
  const Icon = icons[category.icon] || Microscope;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link to={`/subject/${category.slug}`} className="no-underline block group">
      <motion.div
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -12 }}
        className={`relative p-12 rounded-[4rem] bg-white border-2 border-slate-100 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden cursor-pointer flex flex-col items-center text-center group-hover:border-primary/20 min-h-[300px]`}
      >
        {/* Background Decorative Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
        
        {/* Animated Icon Logic */}
        <div className={`relative mb-8 p-6 rounded-[2.5rem] bg-slate-50 text-slate-800 ring-1 ring-slate-100 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-500 transform group-hover:rotate-6 shadow-2xl group-hover:shadow-primary/30 shadow-slate-100`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isHovered ? 'hover' : 'default'}
              initial={{ scale: 0.8, opacity: 0, rotate: -15 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 15 }}
            >
              <Icon className="w-12 h-12" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content Section */}
        <div className="relative z-10 w-full mb-8">
          <h3 className="text-3xl font-bn font-black mb-4 text-slate-800 italic group-hover:text-primary transition-colors leading-none tracking-tight">
            {category.name} <span className="text-primary group-hover:text-primary transition-colors italic">.</span>
          </h3>
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-slate-50 rounded-full border border-slate-100 group-hover:bg-primary/5 transition-colors">
             <BookOpen className="w-4 h-4 text-primary" />
             <p className="text-slate-400 text-xs font-black en-font tracking-[0.2em] uppercase group-hover:text-primary transition-colors">
               {category.count}
             </p>
          </div>
        </div>

        {/* Action Button Section Area */}
        <div className="mt-auto">
            <motion.div
              animate={{ 
                x: isHovered ? 0 : 20, 
                opacity: isHovered ? 1 : 0 
              }}
              className={`text-primary text-sm font-black en-font flex items-center gap-2 italic tracking-widest uppercase transition-all`}
            >
              Explore Notes <ChevronRight className="w-5 h-5" />
            </motion.div>
        </div>
      </motion.div>
    </Link>
  );
};

export default CategoryCard;

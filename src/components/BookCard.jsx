import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, FileText, User, ChevronRight, Bookmark, Sparkles, BookOpen, Eye } from 'lucide-react';
import { useDownloadCount } from '../hooks/useDownloadCount';
import { useToast } from './Toast';
import { useComingSoon } from './ComingSoonModal';

const BookCard = ({ book }) => {
  const { count, incrementCount } = useDownloadCount(book.id);
  const { showToast } = useToast();
  const { showComingSoon } = useComingSoon();

  const isAvailable = book.pdfUrl && book.pdfUrl !== '#';

  const handleDownload = (e) => {
    if (!isAvailable) {
      e.preventDefault();
      showComingSoon(book.title);
    } else {
      incrementCount();
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative bg-white rounded-[2rem] md:rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-lg md:shadow-xl transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] h-full flex flex-col p-3 md:p-6"
    >
      {/* Background Decorative Gradient */}
      <div className={`absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity`} />
      
      {/* Subject Badge */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8 z-20">
        <span className={`px-2 py-1 md:px-6 md:py-2 rounded-lg md:rounded-2xl text-[8px] md:text-[10px] font-black en-font tracking-widest md:tracking-[0.2em] uppercase shadow-md md:shadow-2xl backdrop-blur-3xl border border-white/50 text-white
          ${book.level === 'SSC' ? 'bg-rose-500/90' : 'bg-primary/90'}`}
        >
          {book.level}
        </span>
      </div>

      {/* Bookmark Icon */}
      <button className="absolute top-4 right-4 md:top-8 md:right-8 z-20 w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-2xl bg-white/90 md:bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400 opacity-100 md:opacity-0 group-hover:opacity-100 md:translate-x-10 group-hover:translate-x-0 transition-all duration-500 hover:text-primary hover:bg-white hover:scale-110 shadow-sm md:shadow-lg">
        <Bookmark className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Image Container */}
      <div className="relative aspect-[3/4.2] rounded-xl md:rounded-[2.5rem] overflow-hidden mb-3 md:mb-6 bg-slate-100 shadow-inner group-hover:shadow-2xl transition-all duration-500 border border-slate-50">
        <img 
          src={book.image} 
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/600x800?text=Premium+Cover'; }}
        />
      </div>

      {/* Content Section */}
      <div className="px-1 md:px-2 flex-1 flex flex-col items-center text-center">
        <h3 className="text-sm sm:text-lg md:text-2xl font-bn font-black mb-2 md:mb-4 italic leading-tight group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem] md:min-h-[3rem] flex items-center justify-center">
          {book.title}
        </h3>
        
        <div className="grid grid-cols-2 gap-1.5 md:gap-3 w-full mb-3 md:mb-6">
          <div className="flex flex-col items-center p-1.5 md:p-3 rounded-lg md:rounded-2xl bg-slate-50 border border-slate-100 transition-colors group-hover:bg-white">
            <User className="w-3 h-3 md:w-4 md:h-4 text-primary mb-0.5 md:mb-1 opacity-60" />
            <span className="text-[7px] md:text-[10px] font-black en-font text-slate-400 uppercase tracking-widest truncate max-w-full">
              {book.author?.split(' ')[0] || 'SHAIFLY'}
            </span>
          </div>
          <div className="flex flex-col items-center p-1.5 md:p-3 rounded-lg md:rounded-2xl bg-slate-50 border border-slate-100 transition-colors group-hover:bg-white">
            <FileText className="w-3 h-3 md:w-4 md:h-4 text-secondary mb-0.5 md:mb-1 opacity-60" />
            <span className="text-[7px] md:text-[10px] font-black en-font text-slate-400 uppercase tracking-widest">
              {book.fileSize || '3.5MB'}
            </span>
          </div>
        </div>

        {/* Both Options Visible: Read & Download */}
        <div className="grid grid-cols-2 gap-1.5 md:gap-3 w-full mb-3 md:mb-6 mt-auto">
           <a 
             href={isAvailable ? book.pdfUrl : '#'} 
             target={isAvailable ? "_blank" : "_self"}
             rel="noopener noreferrer"
             onClick={isAvailable ? undefined : handleDownload}
             className={`h-8 md:h-14 rounded-lg md:rounded-2xl text-[8px] md:text-[11px] font-black en-font tracking-widest md:tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-1 md:gap-2
               ${isAvailable ? 'bg-primary/10 text-primary hover:bg-primary hover:text-white' : 'bg-slate-50 text-slate-400'}`}
           >
              <BookOpen className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">Read</span>
           </a>
           <a 
             href={isAvailable ? book.pdfUrl : '#'} 
             download 
             onClick={handleDownload}
             className={`h-8 md:h-14 rounded-lg md:rounded-2xl text-[8px] md:text-[11px] font-black en-font tracking-widest md:tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-1 md:gap-2 shadow-sm hover:shadow-xl hover:-translate-y-1
               ${isAvailable ? 'bg-slate-900 text-white hover:bg-primary shadow-slate-900/20' : 'bg-slate-50 text-slate-400'}`}
           >
              <Download className="w-3 h-3 md:w-4 md:h-4" /> <span className="hidden sm:inline">Save</span>
           </a>
        </div>

        {/* Dynamic Footer Info */}
        <div className="w-full pt-2 md:pt-4 border-t border-slate-50 flex items-center justify-between pl-1 md:pl-2">
           <div className="flex items-center gap-1 md:gap-2 bg-slate-50 py-1 px-1.5 md:py-1.5 md:px-3 rounded-md md:rounded-xl group-hover:bg-primary transition-colors">
              <Eye className="w-3 h-3 text-primary group-hover:text-white" />
              <span className="text-[7px] md:text-[9px] font-black en-font text-slate-500 group-hover:text-white uppercase tracking-widest hidden sm:inline">
                {((count || 0) + 124).toLocaleString()} Reads
              </span>
           </div>
           
           <div className="w-6 h-6 md:w-10 md:h-10 rounded-lg md:rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all group-hover:rotate-12">
              <ChevronRight className="w-3 h-3 md:w-5 md:h-5" />
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;

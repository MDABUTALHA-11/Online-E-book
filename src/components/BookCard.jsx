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
      whileHover={{ y: -15, scale: 1.02 }}
      className="group relative bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-xl transition-all duration-500 hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] h-full flex flex-col p-6"
    >
      {/* Background Decorative Gradient */}
      <div className={`absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity`} />
      
      {/* Subject Badge */}
      <div className="absolute top-8 left-8 z-20">
        <span className={`px-6 py-2 rounded-2xl text-[10px] font-black en-font tracking-[0.2em] uppercase shadow-2xl backdrop-blur-3xl border border-white/50 text-white
          ${book.level === 'SSC' ? 'bg-rose-500' : 'bg-primary'}`}
        >
          {book.level} • {book.subject === 'higher-math' ? 'H. MATH' : book.subject?.toUpperCase()}
        </span>
      </div>

      {/* Bookmark Icon */}
      <button className="absolute top-8 right-8 z-20 w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 text-slate-400 opacity-0 group-hover:opacity-100 translate-x-10 group-hover:translate-x-0 transition-all duration-500 hover:text-primary hover:bg-white hover:scale-110 shadow-lg">
        <Bookmark className="w-5 h-5" />
      </button>

      {/* Image Container */}
      <div className="relative aspect-[3/4.2] rounded-[2.5rem] overflow-hidden mb-10 bg-slate-100 shadow-inner group-hover:shadow-2xl transition-all duration-500 border border-slate-50">
        <img 
          src={book.image} 
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/600x800?text=Premium+Cover'; }}
        />
        
        {/* Overlay Content On Hover */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-8 backdrop-blur-[4px]">
           <motion.div 
             initial={{ scale: 0.8, opacity: 0 }}
             whileHover={{ scale: 1.1 }}
             className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-2xl"
           >
              <BookOpen className="w-10 h-10 text-primary" />
           </motion.div>
           
           <a 
             href={isAvailable ? book.pdfUrl : '#'} 
             download 
             onClick={handleDownload}
             className={`btn ${isAvailable ? 'btn-primary' : 'bg-slate-800 text-slate-400'} w-full h-16 rounded-2xl text-lg font-black tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-2xl`}
           >
              {isAvailable ? <><Download className="w-6 h-6" /> Download Now</> : 'Coming Soon'}
           </a>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 flex-1 flex flex-col items-center text-center">
        <h3 className="text-2xl font-bn font-black mb-6 italic leading-tight group-hover:text-primary transition-colors line-clamp-2 px-2">
          {book.title}
        </h3>
        
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="flex flex-col items-center p-4 rounded-3xl bg-slate-50 border border-slate-100 transition-colors group-hover:bg-white">
            <User className="w-5 h-5 text-primary mb-2 opacity-60" />
            <span className="text-[10px] font-black en-font text-slate-400 uppercase tracking-widest truncate max-w-full">
              {book.author?.split(' ')[0] || 'SHAIFLY'}
            </span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-3xl bg-slate-50 border border-slate-100 transition-colors group-hover:bg-white">
            <FileText className="w-5 h-5 text-secondary mb-2 opacity-60" />
            <span className="text-[10px] font-black en-font text-slate-400 uppercase tracking-widest">
              {book.fileSize || '3.5MB'}
            </span>
          </div>
        </div>

        {/* Dynamic Footer Info */}
        <div className="w-full mt-auto pt-8 border-t border-slate-50 flex items-center justify-between px-2">
           <div className="flex items-center gap-3 bg-slate-50 py-2 px-4 rounded-xl group-hover:bg-primary transition-colors">
              <Eye className="w-4 h-4 text-primary group-hover:text-white" />
              <span className="text-[10px] font-black en-font text-slate-500 group-hover:text-white uppercase tracking-widest">
                {((count || 0) + 124).toLocaleString()} Reads
              </span>
           </div>
           
           <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all group-hover:rotate-12">
              <ChevronRight className="w-6 h-6" />
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Eye } from 'lucide-react';
import { useReadCount } from '../hooks/useReadCount';
import { useComingSoon } from './ComingSoonModal';

const BookCard = ({ book }) => {
  const { count: readCount, incrementReadCount } = useReadCount(book.id);
  const { showComingSoon } = useComingSoon();

  const isAvailable = book.pdfUrl && book.pdfUrl !== '#';

  const handleRead = (e) => {
    if (!isAvailable) {
      e.preventDefault();
      showComingSoon(book.title);
    } else {
      incrementReadCount();
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="vintage-card relative overflow-hidden group"
    >
      {/* Book Image Wrapper */}
      <div className="relative w-full aspect-[3/4] mb-3 overflow-hidden rounded-xl shadow-md border border-[#dac09a]">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => { e.target.src = 'https://placehold.co/300x400/2c3e50/f7dc6f?text=PDF+Note'; }}
        />
        <div className="pdf-label">PDF</div>
        
        {/* Availability Badge */}
        {!isAvailable && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-amber-500 text-white text-[8px] font-black uppercase tracking-tighter shadow-lg">
            Coming Soon
          </div>
        )}
      </div>

      {/* Content */}
      <div className="w-full flex flex-col items-center px-0.5">
        <h3 className="text-[#3e2e1c] font-black text-[13px] sm:text-[18px] md:text-[20px] font-bn leading-tight mb-1.5 italic text-center line-clamp-2 min-h-[2.6em] flex items-center justify-center">
          {book.title}
        </h3>
        
        {/* Info Pill */}
        <div className="bg-[#f3ede5] px-2 sm:px-4 py-0.5 sm:py-1 rounded-full mb-3 border border-[#dac09a]/30">
          <p className="text-[#6e5b41] text-[9px] sm:text-[11px] md:text-[13px] font-black italic tracking-tighter sm:tracking-tight flex items-center gap-1">
            {book.level} {book.part ? `· P${book.part}` : ''} · {book.fileSize || '3.5MB'} · <Eye className="w-3 h-3 sm:w-4 sm:h-4" /> {readCount}
          </p>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-center w-full px-0.5">
          <a
            href={isAvailable ? book.pdfUrl : '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleRead}
            className="flex-1 flex items-center justify-center gap-2 h-9 sm:h-11 rounded-xl bg-[#2d5a42] text-white text-[11px] sm:text-[14px] md:text-[16px] font-black no-underline transition-all hover:bg-[#1f422d] shadow-[0_3px_0_#1b3927] sm:shadow-[0_5px_0_#1b3927] active:translate-y-[1px] active:shadow-[0_1px_0_#1b3927] text-center"
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-5 sm:h-5" /> <span>পড়ুন</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;

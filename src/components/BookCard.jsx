import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, User, ChevronRight, Bookmark, BookOpen, Eye } from 'lucide-react';
import { useDownloadCount } from '../hooks/useDownloadCount';
import { useViewCount } from '../hooks/useViewCount';
import { useComingSoon } from './ComingSoonModal';

const BookCard = ({ book }) => {
  const { count: downloadCount, incrementCount } = useDownloadCount(book.id);
  const { count: viewCount, incrementView } = useViewCount(book.id, 'book_views');
  const { showComingSoon } = useComingSoon();
  const isAvailable = book.pdfUrl && book.pdfUrl !== '#';

  React.useEffect(() => {
    incrementView();
  }, [book.id, incrementView]);

  const handleDownload = (e) => {
    if (!isAvailable) { e.preventDefault(); showComingSoon(book.title); }
    else incrementCount();
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex flex-col overflow-hidden rounded-2xl transition-all duration-300"
      style={{ background: '#0d1b2a', border: '1px solid #1e3a5f' }}
      onMouseEnter={e => { e.currentTarget.style.border = '1px solid rgba(34,197,94,0.3)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(34,197,94,0.08)'; }}
      onMouseLeave={e => { e.currentTarget.style.border = '1px solid #1e3a5f'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Book Cover */}
      <div className="relative aspect-[16/9] overflow-hidden" style={{ background: '#112236' }}>
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={e => { e.target.src = 'https://via.placeholder.com/600x338/0d1b2a/22C55E?text=Shaifly+Note'; }}
        />
        {/* Gradient overlay at bottom */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,27,42,0.8) 0%, transparent 60%)' }} />
        {/* Level badge */}
        <div className="absolute top-3 left-3">
          <span
            className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest text-white"
            style={book.level === 'SSC'
              ? { background: '#22C55E' }
              : { background: '#112236', border: '1px solid #22C55E40', color: '#22C55E' }
            }
          >
            {book.level}
          </span>
        </div>
        <button className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center text-[#64748b] hover:text-[#22C55E] transition-colors" style={{ background: 'rgba(13,27,42,0.7)' }}>
          <Bookmark className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-3 md:p-4 flex flex-col gap-2.5 md:gap-3 flex-1">
        <h3 className="text-white font-black text-[13.5px] sm:text-[15px] font-bn leading-snug line-clamp-2">{book.title}</h3>

        {/* Meta */}
        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 text-[9px] sm:text-[11px] font-bold" style={{ color: '#334155' }}>
          <div className="flex items-center gap-1 min-w-0">
            <User className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span className="truncate">{book.author?.split(' ')[0] || 'Shaifly'}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 px-1.5 border-x border-[#1e3a5f]">
            <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{book.fileSize || '3.5MB'}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0 text-[#22C55E]">
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>{viewCount.toLocaleString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1.5 mt-auto pt-1">
          <a
            href={isAvailable ? book.pdfUrl : '#'}
            target={isAvailable ? '_blank' : '_self'}
            rel="noopener noreferrer"
            onClick={isAvailable ? undefined : handleDownload}
            className="flex-1 h-8 sm:h-10 rounded-xl text-[9px] sm:text-[11px] font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all no-underline"
            style={{ background: '#112236', border: '1.5px solid #1e3a5f', color: '#64748b' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#22C55E'; e.currentTarget.style.color = '#22C55E'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e3a5f'; e.currentTarget.style.color = '#64748b'; }}
          >
            <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> Read
          </a>
          <a
            href={isAvailable ? book.pdfUrl : '#'}
            download
            onClick={handleDownload}
            className="flex-1 h-8 sm:h-10 rounded-xl text-[9px] sm:text-[11px] font-sans font-bold uppercase tracking-wider flex items-center justify-center gap-1 text-white transition-all no-underline"
            style={{ background: '#22C55E' }}
            onMouseEnter={e => e.currentTarget.style.background = '#16a34a'}
            onMouseLeave={e => e.currentTarget.style.background = '#22C55E'}
          >
            <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" /> <span className="hidden sm:inline">Download</span><span className="sm:hidden">Get It</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Eye, Zap } from 'lucide-react';
import { useReadCount } from '../hooks/useReadCount';
import { useComingSoon } from './ComingSoonModal';
import { triggerConfetti } from '../lib/confetti';

const BookCard = ({ book, index = 0 }) => {
  const { count: readCount, incrementReadCount } = useReadCount(book.id);
  const { showComingSoon } = useComingSoon();
  const [hovered, setHovered] = React.useState(false);

  const isAvailable = book.pdfUrl && book.pdfUrl !== '#';

  const handleRead = (e) => {
    if (!isAvailable) {
      e.preventDefault();
      showComingSoon(book.title);
    } else {
      incrementReadCount();
      triggerConfetti(e);
    }
  };

  return (
    <motion.div
      variants={{
        hidden:  { opacity: 0, y: 30, scale: 0.97 },
        visible: {
          opacity: 1, y: 0, scale: 1,
          transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1], delay: index * 0.08 },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -10, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="vintage-card relative overflow-hidden group border border-[var(--bg-border)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-[1.25rem] p-4 text-center items-center"
      style={{
        boxShadow: hovered
          ? '0 20px 50px rgba(20, 184, 166, 0.2), 0 0 0 2px rgba(20, 184, 166, 0.35)'
          : '0 4px 20px rgba(15, 23, 42, 0.06)',
        borderColor: hovered ? 'rgba(20, 184, 166, 0.4)' : undefined,
        transition: 'box-shadow 0.4s cubic-bezier(0.4,0,0.2,1), border-color 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* Book Image Wrapper */}
      <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden rounded-xl shadow-md border border-[var(--bg-border)] bg-[var(--bg-elevated)]">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
          onError={e => { e.target.src = 'https://placehold.co/300x400/0f172a/14b8a6?text=PDF+Note'; }}
        />
        <div className="pdf-label font-en">PDF</div>

        {/* Availability Badge */}
        {!isAvailable && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-amber-500 text-white text-[8px] font-black uppercase tracking-tighter shadow-lg">
            Coming Soon
          </div>
        )}

        {/* Quick Preview Button — reveals on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.22, ease: [0, 0, 0.2, 1] }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'rgba(5,15,35,0.55)', backdropFilter: 'blur(4px)' }}
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full text-white font-black text-[12px] uppercase tracking-widest shadow-xl"
                style={{ background: 'rgba(20,184,166,0.9)', border: '1.5px solid rgba(20,184,166,0.8)' }}
              >
                <Zap className="w-3.5 h-3.5" /> Quick Preview
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="w-full flex flex-col items-center px-0.5">
        <h3 className="text-[var(--text-primary)] font-black text-[13px] sm:text-[18px] md:text-[20px] font-bn leading-tight mb-2 italic text-center line-clamp-2 min-h-[2.6em] flex items-center justify-center transition-colors group-hover:text-[var(--teal)]">
          {book.title}
        </h3>
        
        {/* Info Pill */}
        <div className="bg-[var(--bg-elevated)] px-2 sm:px-4 py-1 rounded-full mb-4 border border-[var(--bg-border)]">
          <p className="text-[var(--text-muted)] text-[9px] sm:text-[11px] md:text-[13px] font-black italic tracking-tighter sm:tracking-tight flex items-center gap-1.5">
            {book.level} {book.part ? `· P${book.part}` : ''} · {book.fileSize || '3.5MB'} · <Eye className="w-3.5 h-3.5 text-[var(--teal)]" /> {readCount}
          </p>
        </div>

        {/* Action Row — Download/Read button with pulse + confetti */}
        <div className="flex items-center justify-center w-full px-0.5">
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(20,184,166,0.5)' }}
            whileTap={{ scale: 0.95 }}
            href={isAvailable ? book.pdfUrl : '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleRead}
            className="flex-1 flex items-center justify-center gap-2 h-9 sm:h-11 rounded-xl text-white text-[11px] sm:text-[14px] md:text-[16px] font-black no-underline shadow-md text-center font-bn animate-download-pulse"
            style={{
              background: 'linear-gradient(135deg, #14B8A6 0%, #14B8A6 100%)',
              backgroundSize: '200% 100%',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #14B8A6 0%, #F97316 100%)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #14B8A6 0%, #14B8A6 100%)';
            }}
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-5 sm:h-5" /> <span>পড়ুন</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;

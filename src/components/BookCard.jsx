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
      whileHover={{ y: -8, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative overflow-hidden group border border-[var(--bg-border)] bg-[var(--bg-surface)] text-[var(--text-primary)] rounded-lg p-4 text-center items-center"
      style={{
        boxShadow: hovered
          ? '0 0 25px rgba(0, 240, 255, 0.18), 0 0 0 2px rgba(0, 240, 255, 0.35)'
          : '0 2px 12px rgba(0, 0, 0, 0.15)',
        borderColor: hovered ? 'var(--primary)' : undefined,
        transition: 'box-shadow 0.4s cubic-bezier(0.4,0,0.2,1), border-color 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}
    >
      {/* HUD frame borders for the card */}
      <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t-2 border-l-2 border-[var(--primary)] opacity-30 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b-2 border-r-2 border-[var(--primary)] opacity-30 group-hover:opacity-100 transition-opacity" />

      {/* Book Image Wrapper */}
      <div className="relative w-full aspect-[3/4] mb-4 overflow-hidden rounded-md border border-[var(--bg-border)] bg-[var(--bg-elevated)]">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110"
          onError={e => { e.target.src = 'https://placehold.co/300x400/0a0e1a/00f0ff?text=PDF+Note'; }}
        />
        <div className="pdf-label font-mono">PDF</div>

        {/* Availability Badge */}
        {!isAvailable && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-sm bg-[var(--neon-pink)] text-white text-[8px] font-bold uppercase tracking-wider shadow-lg font-mono border border-[var(--neon-pink)]/35">
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
              style={{ background: 'rgba(10,14,26,0.7)', backdropFilter: 'blur(4px)' }}
            >
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#0A0E1A] font-bold text-[11px] uppercase tracking-wider shadow-lg font-mono"
                style={{ background: 'var(--primary)', border: '1px solid var(--primary)' }}
              >
                <Zap className="w-3.5 h-3.5" /> Quick Preview
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="w-full flex flex-col items-center px-0.5">
        <h3 className="text-[var(--text-primary)] font-bold text-[14px] sm:text-[16px] md:text-[18px] font-bn leading-tight mb-2 tracking-wide text-center line-clamp-2 min-h-[2.5em] flex items-center justify-center transition-colors group-hover:text-[var(--primary)]">
          {book.title}
        </h3>
        
        {/* Info Pill */}
        <div className="bg-[var(--bg-elevated)] px-3 py-1 rounded-sm mb-4 border border-[var(--bg-border)] w-full">
          <p className="text-[var(--text-muted)] text-[9px] sm:text-[11px] font-semibold tracking-wide flex items-center justify-center gap-1.5 font-mono">
            {book.level} {book.part ? `· P${book.part}` : ''} · {book.fileSize || '3.5MB'} · <Eye className="w-3.5 h-3.5 text-[var(--primary)]" /> {readCount}
          </p>
        </div>

        {/* Action Row — Download/Read button with pulse + confetti */}
        <div className="flex items-center justify-center w-full px-0.5">
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            href={isAvailable ? book.pdfUrl : '#'}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleRead}
            className="flex-1 flex items-center justify-center gap-2 h-9 rounded-lg text-[#0A0E1A] text-[12px] sm:text-[14px] font-bold no-underline shadow-md text-center font-bn animate-download-pulse"
            style={{
              background: 'var(--accent)',
            }}
          >
            <BookOpen className="w-4 h-4" /> <span>পড়ুন</span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;

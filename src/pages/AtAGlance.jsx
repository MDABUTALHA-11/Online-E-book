import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Image as ImageIcon, BookOpen, Clock, ChevronRight, Filter } from 'lucide-react';

const onePageNotes = [
  { id: 1, title: 'Biology Chapter 3: Cell Division', titleBn: 'জীববিজ্ঞান ৩য় অধ্যায়: কোষ বিভাজন', subject: 'Biology', level: 'SSC', image: '/At-A-Glance/ssc_biology_ch3_note.jpg', date: '27 April 2026' },
  { id: 2, title: 'Physics Chapter 2: Motion', titleBn: 'পদার্থবিজ্ঞান ২য় অধ্যায়: গতি (Motion)', subject: 'Physics', level: 'SSC', image: '/At-A-Glance/ssc_physics_ch2_note.jpg', date: '26 April 2026' },
  { id: 8, title: 'Physics Chapter 4: Work & Energy Note', titleBn: 'পদার্থবিজ্ঞান ৪র্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি', subject: 'Physics', level: 'SSC', image: '/At-A-Glance/ssc_physics_ch4_note.jpg', date: '27 April 2026' },
  { id: 9, title: 'Chemistry Chapter 1: Concept of Chemistry', titleBn: 'রসায়ন ১ম অধ্যায়: রসায়নের ধারণা', subject: 'Chemistry', level: 'SSC', image: '/At-A-Glance/ssc_chemistry_ch1_note.jpg', date: '23 May 2026' },
  { id: 10, title: 'Chemistry Chapter 2: States of Matter', titleBn: 'রসায়ন ২য় অধ্যায়: পদার্থের অবস্থা', subject: 'Chemistry', level: 'SSC', image: '/At-A-Glance/ssc_chemistry_ch2_note.jpg', date: '23 May 2026' },
  { id: 14, title: 'Chemistry Chapter 3: Structure of Matter', titleBn: 'রসায়ন ৩য় অধ্যায়: পদার্থের গঠন', subject: 'Chemistry', level: 'SSC', image: '/At-A-Glance/ssc_chemistry_ch3_note.jpg', date: '23 May 2026' },
  { id: 15, title: 'Chemistry Chapter 4: Periodic Table', titleBn: 'রসায়ন ৪র্থ অধ্যায়: পর্যায় সারণি', subject: 'Chemistry', level: 'SSC', image: '/At-A-Glance/ssc_chemistry_ch4_note.jpg', date: '23 May 2026' },
  { id: 3, title: 'Chemistry Chapter 5: Bonds', titleBn: 'রসায়ন ৫ম অধ্যায়: রাসায়নিক বন্ধন', subject: 'Chemistry', level: 'SSC', image: '/At-A-Glance/chemistry_ssc.png', date: '25 April 2026' },
  { id: 16, title: 'Chemistry Chapter 6: Mole Concept', titleBn: 'রসায়ন ৬ষ্ঠ অধ্যায়: মোলের ধারণা ও রাসায়নিক গণনা', subject: 'Chemistry', level: 'SSC', image: '/At-A-Glance/ssc_chemistry_ch6_note.jpg', date: '23 May 2026' },
  { id: 11, title: 'Chemistry Chapter 7: Chemical Reactions', titleBn: 'রসায়ন ৭ম অধ্যায়: রাসায়নিক বিক্রিয়া', subject: 'Chemistry', level: 'SSC', image: '/At-A-Glance/ssc_chemistry_ch7_note.jpg', date: '23 May 2026' },
  { id: 19, title: 'Chemistry Chapter 8: Chemistry & Energy', titleBn: 'রসায়ন ৮ম অধ্যায়: রসায়ন ও শক্তি', subject: 'Chemistry', level: 'SSC', image: '/At-A-Glance/ssc_chemistry_ch8_note.jpg', date: '23 May 2026' },
  { id: 12, title: 'Chemistry Chapter 9: Acid-Base Balance', titleBn: 'রসায়ন ৯ম অধ্যায়: এসিড-ক্ষার সমতা', subject: 'Chemistry', level: 'SSC', image: '/At-A-Glance/ssc_chemistry_ch9_note.jpg', date: '23 May 2026' },
  { id: 17, title: 'Chemistry Chapter 10: Mineral Resources Metals', titleBn: 'রসায়ন ১০ম অধ্যায়: খনিজ সম্পদ: ধাতু-অধাতু', subject: 'Chemistry', level: 'SSC', image: '/At-A-Glance/ssc_chemistry_ch10_note.jpg', date: '23 May 2026' },
  { id: 13, title: 'Chemistry Chapter 11: Mineral Resources Fossil', titleBn: 'রসায়ন ১১শ অধ্যায়: খনিজ সম্পদ: জীবাশ্ম', subject: 'Chemistry', level: 'SSC', image: '/At-A-Glance/ssc_chemistry_ch11_note.jpg', date: '23 May 2026' },
  { id: 18, title: 'Chemistry Chapter 12: Everyday Chemistry', titleBn: 'রসায়ন ১২শ অধ্যায়: আমাদের জীবনে রসায়ন', subject: 'Chemistry', level: 'SSC', image: '/At-A-Glance/ssc_chemistry_ch12_note.jpg', date: '23 May 2026' },
  { id: 4, title: 'Higher Math: Calculus', titleBn: 'উচ্চতর গণিত: ক্যালকুলাস ও ইন্টিগ্রাল', subject: 'Higher Math', level: 'HSC', image: '/At-A-Glance/math_hsc.png', date: '24 April 2026' },
  { id: 5, title: 'Physics Chapter 4: Work & Energy', titleBn: 'পদার্থবিজ্ঞান ৪র্থ অধ্যায়: কাজ ও শক্তি', subject: 'Physics', level: 'SSC', image: '/Book-Image/ghibli_2.png', date: '23 April 2026' },
  { id: 20, title: 'Physics Chapter 13: Modern Physics', titleBn: 'পদার্থবিজ্ঞান ১৩শ অধ্যায়: আধুনিক পদার্থবিজ্ঞান ও ইলেকট্রনিক্স', subject: 'Physics', level: 'SSC', image: '/At-A-Glance/ssc_physics_ch13_note.jpg', date: '23 May 2026' },
  { id: 6, title: 'Biology: Genetics & DNA', titleBn: 'জীববিজ্ঞান: জিনতত্ত্ব ও ডিএনএ', subject: 'Biology', level: 'HSC', image: '/At-A-Glance/biology_hsc.png', date: '22 April 2026' },
  { id: 7, title: 'General Math: Geometry', titleBn: 'সাধারণ গণিত: জ্যামিতি ও ত্রিকোণমিতি', subject: 'General Math', level: 'SSC', image: '/At-A-Glance/math_general_ssc.png', date: '21 April 2026' }
];

const subjects = ['All', 'Biology', 'Physics', 'Chemistry', 'Math', 'Higher Math', 'General Math'];
const levels = ['All', 'SSC', 'HSC'];

export default function AtAGlance() {
  const [activeLevel, setActiveLevel] = useState('All');
  const [activeSubject, setActiveSubject] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNotes = onePageNotes.filter(note => {
    const matchesLevel = activeLevel === 'All' || note.level === activeLevel;
    const matchesSubject = activeSubject === 'All' || note.subject === activeSubject;
    const matchesSearch = note.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          note.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSubject && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-16 px-4">
      {/* ── Header Section ── */}
      <div className="relative mb-12 overflow-hidden rounded-[3rem] p-10 md:p-16 border border-white/5 shadow-2xl" 
           style={{ background: 'var(--bg-surface)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#22C55E]/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-end gap-10">
          <div className="text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-center md:justify-start gap-4 mb-6"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
                <ImageIcon className="text-[#22C55E] w-6 h-6" />
              </div>
              <span className="text-slate-400 font-black text-[14px] md:text-[16px] tracking-[0.2em] uppercase italic">Study Visuals</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-[42px] md:text-[68px] font-black text-white mb-6 italic font-bn leading-none"
            >
              এক নজরে <span className="text-[#22C55E]">অধ্যায়</span>
            </motion.h1>
            <p className="text-slate-400 font-bn text-[18px] md:text-[22px] font-bold max-w-xl italic">এসএসসি ও এইচএসসি পরীক্ষার জন্য ১ পাতার শর্ট নোট ও গুরুত্বপূর্ণ ভিজ্যুয়াল গাইড।</p>
          </div>

          <div className="flex gap-3 bg-black/40 p-2 rounded-2xl border border-white/5 shadow-inner">
            {levels.map(lvl => (
              <button 
                key={lvl}
                onClick={() => setActiveLevel(lvl)}
                className={`px-8 py-3 rounded-xl text-[14px] md:text-[16px] font-black transition-all ${activeLevel === lvl ? 'bg-[#22C55E] text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Search & Filter ── */}
      <div className="flex flex-col gap-8 mb-16">
        <div className="flex flex-col md:flex-row gap-5 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 w-6 h-6" />
            <input 
              type="text" 
              placeholder="নোট অনুসন্ধান করুন (ব্যাখ্যা, সূত্র, চিত্র)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e293b]/50 border border-white/10 rounded-full py-5 pl-16 pr-10 focus:outline-none focus:border-[#22C55E]/50 text-white font-bn text-[18px] md:text-[20px] transition-all shadow-sm"
            />
          </div>
          <div className="flex items-center gap-3 px-8 py-5 rounded-full bg-white/5 border border-white/10 text-slate-400 font-black text-[16px]">
            <Filter className="w-5 h-5" />
            <span>ফিল্টার</span>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4">
          {subjects.map((sub) => (
            <button 
              key={sub}
              onClick={() => setActiveSubject(sub)}
              className={`px-8 py-3 rounded-full font-black text-[14px] md:text-[16px] transition-all whitespace-nowrap border-2 ${activeSubject === sub ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#22C55E]' : 'bg-transparent border-white/5 text-slate-400 hover:text-white hover:border-white/20'}`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid Gallery wrapped in Booklet ── */}
      <div className="booklet-container mb-20">
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-10 border-b-2 border-dashed border-white/10 pb-6">
            <div>
              <h2 className="text-white font-black text-[28px] md:text-[38px] italic leading-none">ভিজ্যুয়াল লাইব্রেরি</h2>
              <p className="text-slate-400 text-[14px] md:text-[16px] font-bold mt-2 uppercase tracking-widest italic">Chapter Highlights · At A Glance</p>
            </div>
            <div className="hidden md:flex bg-white/5 px-6 py-3 rounded-full border border-white/10 text-slate-300 font-black text-[14px] items-center gap-2">
               <ImageIcon className="w-5 h-5 text-[#22C55E]" /> মোট রিসোর্স: {filteredNotes.length}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-12">
            <AnimatePresence mode='popLayout'>
              {filteredNotes.map((note, index) => (
                <motion.div
                  layout key={note.id}
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}
                  className="vintage-card group"
                >
                  {/* Image Container */}
                  <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-[#dac09a] mb-5 shadow-lg">
                    <img 
                      src={note.image} 
                      alt={note.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2d2416]/80 via-transparent to-transparent" />
                    
                    <div className="pdf-label uppercase">IMAGE NOTE</div>
                    
                    {/* Level Badge */}
                    <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-[#2d5a42] text-[10px] md:text-[12px] font-black text-white shadow-xl">
                      {note.level} • {note.subject}
                    </div>
                  </div>

                  <div className="text-center px-2">
                    <h3 className="text-[20px] md:text-[24px] font-black text-[#3e2e1c] mb-2 font-bn italic leading-tight group-hover:text-[#2d5a42] transition-colors">{note.titleBn}</h3>
                    <div className="flex items-center justify-center gap-2 text-[#7f6a51] text-[14px] md:text-[16px] font-bold font-bn italic mb-6">
                      <Clock className="w-4 h-4" />
                      <span>{note.date}</span>
                    </div>

                    <div className="flex gap-3">
                      <a 
                        href={note.image}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 h-10 sm:h-12 rounded-full bg-[#2d5a42] text-white text-[12px] sm:text-[14px] md:text-[16px] font-black no-underline transition-all hover:bg-[#1f422d] shadow-[0_4px_0_#1b3927] active:translate-y-[1px]"
                      >
                        <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" /> পড়ুন
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {filteredNotes.length === 0 && (
        <div className="py-32 flex flex-col items-center justify-center text-center bg-[#fef9ed] rounded-[3rem] border-2 border-dashed border-[#c9a87c]">
          <div className="w-24 h-24 rounded-full bg-[#f3ede5] flex items-center justify-center mb-6 border border-[#dac09a]">
             <Search className="text-[#8b6a41] w-10 h-10" />
          </div>
          <h2 className="text-[28px] font-black text-[#3e2e1c] mb-3 font-bn italic">কোন নোট পাওয়া যায়নি</h2>
          <p className="text-[#7f6a51] font-bn text-[18px] italic">ভিন্ন কোন বিষয়ের নোট অনুসন্ধান করে দেখুন।</p>
        </div>
      )}
    </div>
  );
}

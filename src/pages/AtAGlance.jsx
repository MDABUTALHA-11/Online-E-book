import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Image as ImageIcon, BookOpen, Clock, Download, ChevronRight, Save, Filter } from 'lucide-react';

const onePageNotes = [
  {
    id: 1,
    title: 'Biology Chapter 3: Cell Division',
    titleBn: 'জীববিজ্ঞান ৩য় অধ্যায়: কোষ বিভাজন',
    subject: 'Biology',
    level: 'SSC',
    image: '/At-A-Glance/ssc_biology_ch3_note.jpg',
    date: '27 April 2026'
  },
  {
    id: 2,
    title: 'Physics Chapter 2: Motion',
    titleBn: 'পদার্থবিজ্ঞান ২য় অধ্যায়: গতি (Motion)',
    subject: 'Physics',
    level: 'SSC',
    image: '/At-A-Glance/ssc_physics_ch2_note.jpg',
    date: '26 April 2026'
  },
  {
    id: 8,
    title: 'Physics Chapter 4: Work & Energy Note',
    titleBn: 'পদার্থবিজ্ঞান ৪র্থ অধ্যায়: কাজ, ক্ষমতা ও শক্তি',
    subject: 'Physics',
    level: 'SSC',
    image: '/At-A-Glance/ssc_physics_ch4_note.jpg',
    date: '27 April 2026'
  },
  {
    id: 3,
    title: 'Chemistry Chapter 5: Bonds',
    titleBn: 'রসায়ন ৫ম অধ্যায়: রাসায়নিক বন্ধন',
    subject: 'Chemistry',
    level: 'SSC',
    image: '/At-A-Glance/chemistry_ssc.png',
    date: '25 April 2026'
  },
  {
    id: 4,
    title: 'Higher Math: Calculus',
    titleBn: 'উচ্চতর গণিত: ক্যালকুলাস ও ইন্টিগ্রাল',
    subject: 'Higher Math',
    level: 'HSC',
    image: '/At-A-Glance/math_hsc.png',
    date: '24 April 2026'
  },
  {
    id: 5,
    title: 'Physics Chapter 4: Work & Energy',
    titleBn: 'পদার্থবিজ্ঞান ৪র্থ অধ্যায়: কাজ ও শক্তি',
    subject: 'Physics',
    level: 'SSC',
    image: '/Book-Image/ghibli_2.png',
    date: '23 April 2026'
  },
  {
    id: 6,
    title: 'Biology: Genetics & DNA',
    titleBn: 'জীববিজ্ঞান: জিনতত্ত্ব ও ডিএনএ',
    subject: 'Biology',
    level: 'HSC',
    image: '/At-A-Glance/biology_hsc.png',
    date: '22 April 2026'
  },
  {
    id: 7,
    title: 'General Math: Geometry',
    titleBn: 'সাধারণ গণিত: জ্যামিতি ও ত্রিকোণমিতি',
    subject: 'General Math',
    level: 'SSC',
    image: '/At-A-Glance/math_general_ssc.png',
    date: '21 April 2026'
  }
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

  const handleDownload = (imageUrl, title) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${title.replace(/\s+/g, '_')}_Shaifly.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen pb-12">
      {/* ── Header Section ── */}
      <div className="relative mb-10 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#22C55E]/20 to-[#0EA5E9]/10 border border-white/10 p-10 backdrop-blur-sm">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#22C55E]/10 rounded-full blur-[80px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-4"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <ImageIcon className="text-[#22C55E] w-5 h-5" />
              </div>
              <span className="text-[#64748b] font-bold text-xs tracking-[0.2em] uppercase opacity-70">Study Visuals</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black text-white mb-4 italic font-bn"
            >
              এক নজরে <span className="text-[#22C55E]">অধ্যায়</span>
            </motion.h1>
            <p className="text-[#94a3b8] font-bn max-w-xl">এসএসসি ও এইচএসসি পরীক্ষার জন্য ১ পাতার শর্ট নোট ও গুরুত্বপূর্ণ ভিজ্যুয়াল গাইড।</p>
          </div>

          <div className="flex gap-3 bg-black/40 p-1.5 rounded-2xl border border-white/5 self-end">
            {levels.map(lvl => (
              <button 
                key={lvl}
                onClick={() => setActiveLevel(lvl)}
                className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${activeLevel === lvl ? 'bg-[#22C55E] text-white' : 'text-slate-400 hover:text-white'}`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Search & Filter ── */}
      <div className="flex flex-col gap-6 mb-12">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="নোট অনুসন্ধান করুন (ব্যাখ্যা, সূত্র, চিত্র)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#1e293b]/50 border border-slate-700/50 rounded-2xl py-4 pl-14 pr-8 focus:outline-none focus:border-[#22C55E]/50 text-white font-bn transition-all"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-4 rounded-2xl bg-[#1e293b]/30 border border-white/5 text-slate-400">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-bold opacity-60">ফিল্টার</span>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {subjects.map((sub) => (
            <button 
              key={sub}
              onClick={() => setActiveSubject(sub)}
              className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap border ${activeSubject === sub ? 'bg-[#22C55E]/10 border-[#22C55E] text-[#22C55E]' : 'bg-transparent border-white/5 text-slate-400 hover:text-white hover:border-white/20'}`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* ── Grid Gallery ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode='popLayout'>
          {filteredNotes.map((note, index) => (
            <motion.div
              layout
              key={note.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="group relative bg-[#1e293b]/40 rounded-[2.5rem] border border-white/5 overflow-hidden hover:border-[#22C55E]/30 transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-[300px] overflow-hidden">
                <img 
                  src={note.image} 
                  alt={note.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/20 to-transparent" />
                
                {/* Level Badge */}
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black text-[#22C55E] uppercase tracking-widest">
                  {note.level} • {note.subject}
                </div>
                
                {/* Action Buttons */}
                <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                  <button 
                    onClick={() => handleDownload(note.image, note.title)}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-red-500 hover:border-red-500 transition-all"
                    title="Download Note"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button 
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#22C55E] hover:border-[#22C55E] transition-all"
                    title="Save Note"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                   <h3 className="text-xl font-bold text-white mb-1 font-bn group-hover:text-[#22C55E] transition-colors">{note.titleBn}</h3>
                   <div className="flex items-center gap-2 text-slate-400 text-xs font-bold font-bn opacity-70">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{note.date}</span>
                   </div>
                </div>
              </div>

              {/* View Detail Button */}
              <button className="w-full py-5 bg-white/5 hover:bg-[#22C55E] text-slate-400 hover:text-white font-bold text-sm tracking-widest uppercase transition-all flex items-center justify-center gap-3 border-t border-white/5 group-hover:border-[#22C55E]/50">
                Full Note <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredNotes.length === 0 && (
        <div className="py-32 flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 border border-white/10">
             <Search className="text-slate-600 w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2 font-bn">কোন নোট পাওয়া যায়নি</h2>
          <p className="text-slate-500 font-bn">ভিন্ন কোন বিষয়ের নোট অনুসন্ধান করে দেখুন।</p>
        </div>
      )}
    </div>
  );
}

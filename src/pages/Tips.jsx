import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Clock, CheckCircle, Target, ArrowRight, Brain, BookOpen, GraduationCap, Rocket, Zap, Coffee, Moon, Star, PenTool, BarChart2, Headphones, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import usePageSEO from '../hooks/usePageSEO';

import { tipsData } from '../data/tips';

import RoutineImg from '../assets/tips/routine.png';
import LibraryImg from '../assets/tips/library.png';

const Tips = () => {
  usePageSEO({
    title: 'পড়ার কৌশল — Shaifly Library',
    description: 'পরীক্ষায় ভালো ফলাফলের জন্য বিশেষজ্ঞ শিক্ষকদের পরামর্শমতো সেরা পড়ার পদ্ধতিগুলো জেনে নিন।',
    keywords: 'Study Tips, SSC, HSC, BD Education, Exam Hacks',
  });

  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'SSC', 'HSC', 'Study Hacks', 'Health'];

  const filtered = activeCategory === 'All' ? tipsData : tipsData.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen pb-20 text-slate-800">
      {/* Hero Section */}
      <section className="relative pt-8 md:pt-16 pb-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] -mr-80 -mt-80 animate-pulse-soft pointer-events-none" style={{ background: 'rgba(20,184,166,0.05)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] -ml-40 animate-pulse-soft delay-1000 pointer-events-none" style={{ background: 'rgba(20,184,166,0.05)' }} />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="pb-10 md:pb-20 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full text-[10px] font-black en-font mb-10 tracking-[0.2em] uppercase shadow-sm" style={{ background: 'rgba(15,23,42,0.05)', border: '1px solid rgba(15,23,42,0.1)', color: '#0F172A' }}>
                <Lightbulb className="w-4 h-4 text-[#F97316] animate-pulse" /> Academic Tips & Tricks
              </div>
              <h1 className="text-[#0F172A] text-5xl md:text-7xl lg:text-8xl font-bn font-black mb-8 leading-none tracking-tighter">
                পড়ার সেরা <span style={{ color: '#F97316' }}>কৌশল</span>সমূহ
              </h1>
              <p className="text-lg md:text-xl text-slate-500 font-bn leading-relaxed mb-12 max-w-2xl mx-auto lg:mx-0">
                পরীক্ষায় ভালো ফলাফলের জন্য বিশেষজ্ঞ শিক্ষকদের পরামর্শমতো সেরা পড়ার পদ্ধতিগুলো জেনে নিন।
              </p>
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="px-6 py-2.5 rounded-full text-xs font-black en-font tracking-[0.15em] uppercase transition-all"
                    style={
                      activeCategory === cat
                        ? { background: '#0F172A', color: 'white', border: '1px solid #0F172A', boxShadow: '0 4px 12px rgba(15,23,42,0.15)' }
                        : { background: 'var(--bg-elevated)', color: '#64748b', border: '1px solid var(--bg-border)' }
                    }
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:flex items-center justify-center p-8"
            >
               <div className="w-full aspect-square rounded-[3rem] overflow-hidden relative" style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}>
                <img
                  src={LibraryImg}
                  alt="Student Study Tips"
                  className="w-full h-full object-cover opacity-70 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-app)] to-transparent pointer-events-none" />
                <div className="absolute inset-0" style={{ background: 'rgba(20,184,166,0.08)', mixBlendMode: 'overlay' }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tips Grid */}
      <div className="container mx-auto max-w-7xl relative z-20">
        {/* Count Info */}
        <div className="flex items-center gap-4 mb-12 mt-8 md:mt-16">
          <div className="h-px flex-1" style={{ background: 'var(--bg-border)' }} />
          <span className="font-black en-font text-xs tracking-[0.2em] uppercase whitespace-nowrap" style={{ color: '#334155' }}>
            Showing {filtered.length} Expert Tips
          </span>
          <div className="h-px flex-1" style={{ background: 'var(--bg-border)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {filtered.map((tip, index) => (
            <Link
              key={tip.id}
              to={`/tips/${tip.id}`}
              className="no-underline"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.4 }}
                className="group relative rounded-[2rem] p-7 md:p-10 transition-all duration-300 hover:-translate-y-2 overflow-hidden h-full"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}
              >
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: tip.color }} />

                <div className="flex gap-5 md:gap-6 items-start relative z-10">
                  <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" style={{ background: tip.iconBg }}>
                    <tip.icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[10px] font-black en-font tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full text-slate-600" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}>
                      {tip.tag}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bn font-black mb-3 text-[#0F172A] group-hover:text-[#F97316] transition-colors leading-tight">
                      {tip.title}
                    </h3>
                    <p className="text-[14px] md:text-base leading-relaxed font-bn mb-6 text-slate-500">
                      {tip.desc}
                    </p>
                    
                    <div className="flex items-center gap-2 text-[#F97316] text-[12px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                       READ TIP <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 md:mt-32 grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[3rem] lg:rounded-[4rem] overflow-hidden shadow-2xl relative" style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}>
          <div className="p-10 md:p-20 flex flex-col justify-center relative z-10">
            <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-8" style={{ background: 'rgba(20,184,166,0.08)', border: '1px solid rgba(20,184,166,0.12)' }}>
              <Brain className="w-8 h-8 text-[#14B8A6]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bn font-black text-[#0F172A] mb-6 leading-tight">
              পড়াশোনায় আরো <span style={{ color: '#F97316' }}>এগিয়ে যান</span> শাইফলির সাথে।
            </h2>
            <p className="font-bn text-lg md:text-xl leading-relaxed mb-10 text-slate-500">
              প্রিমিয়াম নোট, বিশেষজ্ঞ শিক্ষকের গাইড এবং এক্সক্লুসিভ সাজেশন পেতে আজই ভিআইপি মেম্বার হন।
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/subscription" className="h-[54px] px-8 rounded-2xl text-[15px] font-bn font-black text-white flex items-center justify-center gap-3 transition-all hover:scale-105 bg-[#F97316] shadow-[0_6px_20px_rgba(249,115,22,0.35)]">
                VIP মেম্বার হন <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/categories" className="h-[54px] px-8 rounded-2xl text-[15px] flex items-center justify-center transition-all bg-[var(--bg-elevated)] text-[#0F172A] font-bn font-bold" style={{ border: '1.5px solid var(--bg-border)' }}>
                নোটস দেখুন
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative overflow-hidden bg-[var(--bg-app)]">
            <img
              src={RoutineImg}
              alt="Study Books"
              className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-surface)] via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;

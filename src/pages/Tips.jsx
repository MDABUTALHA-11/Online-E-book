import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Clock, CheckCircle, Target, ArrowRight, Brain, BookOpen, GraduationCap, Rocket, Zap, Coffee, Moon, Star, PenTool, BarChart2, Headphones, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import usePageSEO from '../hooks/usePageSEO';

import { tipsData } from '../data/tips';

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
    <div className="min-h-screen pb-20 text-[#f1f5f9]">
      {/* Hero Section */}
      <section className="relative pt-8 md:pt-16 pb-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] -mr-80 -mt-80 animate-pulse-soft pointer-events-none" style={{ background: 'rgba(34,197,94,0.05)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] -ml-40 animate-pulse-soft delay-1000 pointer-events-none" style={{ background: 'rgba(34,197,94,0.05)' }} />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="pb-10 md:pb-20 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full text-[10px] font-black en-font mb-10 tracking-[0.2em] uppercase shadow-sm" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E' }}>
                <Lightbulb className="w-4 h-4 animate-pulse" /> Academic Tips & Tricks
              </div>
              <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bn font-black mb-8 italic leading-none tracking-tighter">
                পড়ার সেরা <span style={{ color: '#22C55E' }} className="italic">কৌশল</span>সমূহ
              </h1>
              <p className="text-lg md:text-xl text-[#64748b] font-bn italic leading-relaxed mb-12 max-w-2xl mx-auto lg:mx-0">
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
                        ? { background: '#22C55E', color: 'white', border: '1px solid #22C55E', boxShadow: '0 4px 12px rgba(34,197,94,0.3)' }
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
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1400&auto=format&fit=crop"
                  alt="Student Study Tips"
                  className="w-full h-full object-cover opacity-70 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-app)] to-transparent pointer-events-none" />
                <div className="absolute inset-0" style={{ background: 'rgba(34,197,94,0.1)', mixBlendMode: 'overlay' }} />
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
          <span className="font-black en-font text-xs tracking-[0.2em] uppercase whitespace-nowrap" style={{ color: '#64748b' }}>
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
                    <span className="inline-block text-[10px] font-black en-font tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full text-white" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}>
                      {tip.tag}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bn font-black mb-3 text-white italic group-hover:text-[#22C55E] transition-colors leading-tight">
                      {tip.title}
                    </h3>
                    <p className="text-[14px] md:text-base leading-relaxed font-bn italic mb-6" style={{ color: '#64748b' }}>
                      {tip.desc}
                    </p>
                    
                    <div className="flex items-center gap-2 text-[#22C55E] text-[12px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
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
            <div className="w-16 h-16 rounded-3xl flex items-center justify-center mb-8" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <Brain className="w-8 h-8 text-[#22C55E]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bn font-black text-white italic mb-6 leading-tight">
              পড়াশোনায় আরো <span style={{ color: '#22C55E' }}>এগিয়ে যান</span> শাইফলির সাথে।
            </h2>
            <p className="font-bn italic text-lg md:text-xl leading-relaxed mb-10" style={{ color: '#64748b' }}>
              প্রিমিয়াম নোট, বিশেষজ্ঞ শিক্ষকের গাইড এবং এক্সক্লুসিভ সাজেশন পেতে আজই ভিআইপি মেম্বার হন।
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/subscription" className="h-[54px] px-8 rounded-2xl text-[15px] font-bn font-black text-white flex items-center justify-center gap-3 transition-all hover:scale-105" style={{ background: '#22C55E', boxShadow: '0 6px 20px rgba(34,197,94,0.35)' }}>
                VIP মেম্বার হন <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/categories" className="h-[54px] px-8 rounded-2xl text-[15px] flex items-center justify-center transition-all bg-[var(--bg-elevated)] text-[#22C55E] font-bn italic" style={{ border: '1.5px solid var(--bg-border)' }}>
                নোটস দেখুন
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative overflow-hidden bg-[var(--bg-app)]">
            <img
              src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1400&auto=format&fit=crop"
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

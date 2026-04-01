import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Clock, CheckCircle, Target, ArrowRight, Brain, BookOpen, GraduationCap, Rocket, Zap, Coffee, Moon, Star, PenTool, BarChart2, Headphones, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import usePageSEO from '../hooks/usePageSEO';

const Tips = () => {
  usePageSEO({
    title: 'পড়ার কৌশল — Shaifly Library',
    description: 'পরীক্ষায় ভালো ফলাফলের জন্য বিশেষজ্ঞ শিক্ষকদের পরামর্শমতো সেরা পড়ার পদ্ধতিগুলো জেনে নিন।',
    keywords: 'Study Tips, SSC, HSC, BD Education, Exam Hacks',
  });

  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'SSC', 'HSC', 'Study Hacks', 'Health'];

  const tips = [
    {
      title: 'রুটিন মাফিক পড়ালেখা করুন',
      desc: 'প্রতিদিন নির্দিষ্ট সময়ে পড়ার অভ্যাস গড়ে তুলুন। রুটিন থাকলে পড়ার প্রতি মনোযোগ বাড়ে এবং সময়ের সঠিক ব্যবহার নিশ্চিত হয়। সকালে ঘুম থেকে উঠে প্রথম ২ ঘণ্টা কঠিন বিষয় পড়ুন।',
      icon: Clock,
      category: 'Study Hacks',
      tag: 'Time Management',
      color: 'rgba(59,130,246,0.1)',
      iconBg: '#3b82f6',
    },
    {
      title: 'নিজস্ব শর্টনোট তৈরি করুন',
      desc: 'পড়ার পাশাপাশি নিজের ভাষায় একটি নোট রাখুন। গুরুত্বপূর্ণ তথ্যগুলো নিজের কথায় লিখে রাখলে মনে রাখতে সুবিধা হয় এবং পরীক্ষার আগে রিভিশন দিতে সময় বাঁচে।',
      icon: PenTool,
      category: 'Study Hacks',
      tag: 'Note Taking',
      color: 'rgba(16,185,129,0.1)',
      iconBg: '#10b981',
    },
    {
      title: 'বিগত বছরের প্রশ্ন সমাধান করুন',
      desc: 'বিগত ১০ বছরের প্রশ্নগুলো সমাধান করলে পরীক্ষার প্যাটার্ন সম্পর্কে স্পষ্ট ধারণা পাওয়া যায়। এটি আত্মবিশ্বাস বৃদ্ধি করে এবং কমন প্রশ্ন চেনার দক্ষতা তৈরি হয়।',
      icon: Target,
      category: 'SSC',
      tag: 'Practice',
      color: 'rgba(244,63,94,0.1)',
      iconBg: '#f43f5e',
    },
    {
      title: 'পর্যাপ্ত ঘুম ও বিশ্রাম নিন',
      desc: 'মস্তিষ্ককে সজীব রাখতে প্রতিদিন ৭-৮ ঘণ্টা ঘুম প্রয়োজন। একটানা দীর্ঘসময় না পড়ে প্রতি ৪৫ মিনিটে ১০ মিনিট বিরতি নিন। এতে মনের একাগ্রতা বজায় থাকে।',
      icon: Moon,
      category: 'Health',
      tag: 'Well-being',
      color: 'rgba(168,85,247,0.1)',
      iconBg: '#a855f7',
    },
    {
      title: 'Pomodoro পদ্ধতিতে পড়ুন',
      desc: '২৫ মিনিট গভীর মনোযোগ দিয়ে পড়ুন, তারপর ৫ মিনিট বিরতি নিন। ৪টি চক্র পার হলে ১৫-৩০ মিনিটের বড় বিরতি নিন। এই পদ্ধতিতে মনোযোগ বহুগুণে বৃদ্ধি পায়।',
      icon: Zap,
      category: 'Study Hacks',
      tag: 'Productivity',
      color: 'rgba(234,179,8,0.1)',
      iconBg: '#eab308',
    },
    {
      title: 'গ্রুপ স্টাডি করুন',
      desc: 'বন্ধুদের সাথে গ্রুপ স্টাডি করুন। একে অপরকে পড়িয়ে দেওয়া হলো বোঝার সেরা উপায়। কঠিন অধ্যায়গুলো আলোচনা করলে সহজেই বোঝা যায় এবং নতুন দৃষ্টিভঙ্গি পাওয়া যায়।',
      icon: Heart,
      category: 'HSC',
      tag: 'Collaboration',
      color: 'rgba(236,72,153,0.1)',
      iconBg: '#ec4899',
    },
    {
      title: 'দুর্বল বিষয়কে প্রাধান্য দিন',
      desc: 'যে বিষয়ে দুর্বল সেটিকে বেশি সময় দিন। শক্তিশালী বিষয় পড়া সহজ মনে হলেও দুর্বল বিষয়ে উন্নতি না করলে ফলাফলে পিছিয়ে পড়বেন।',
      icon: BarChart2,
      category: 'SSC',
      tag: 'Strategy',
      color: 'rgba(99,102,241,0.1)',
      iconBg: '#6366f1',
    },
    {
      title: 'স্বাস্থ্যকর সকালের রুটিন মানুন',
      desc: 'সকালে ঘুম থেকে উঠে হালকা ব্যায়াম করুন, প্রচুর পানি পান করুন এবং পুষ্টিকর খাবার খান। সুস্বাস্থ্য মেধার বিকাশে সবচেয়ে বড় ভূমিকা রাখে।',
      icon: Coffee,
      category: 'Health',
      tag: 'Morning Routine',
      color: 'rgba(249,115,22,0.1)',
      iconBg: '#f97316',
    },
    {
      title: 'লক্ষ্য নির্ধারণ করুন',
      desc: 'প্রতিদিন, প্রতি সপ্তাহ ও প্রতি মাসের জন্য আলাদা আলাদা লক্ষ্য নির্ধারণ করুন। ছোট ছোট লক্ষ্য অর্জন অনুপ্রেরণা বাড়ায়। একটি ডায়েরিতে লিখে রাখুন এবং নিয়মিত পর্যালোচনা করুন।',
      icon: Star,
      category: 'HSC',
      tag: 'Goal Setting',
      color: 'rgba(20,184,166,0.1)',
      iconBg: '#14b8a6',
    },
    {
      title: 'Focus Music ব্যবহার করুন',
      desc: 'পড়ার সময় Lo-fi বা প্রকৃতির শব্দ (বৃষ্টি, পাখির গান) চালু রাখলে মনোযোগ বাড়ে। তবে গান শুনলে বাংলা বা ইংরেজি গান এড়িয়ে চলুন, কারণ এগুলো মনোযোগ বিচ্ছিন্ন করে।',
      icon: Headphones,
      category: 'Study Hacks',
      tag: 'Focus',
      color: 'rgba(6,182,212,0.1)',
      iconBg: '#06b6d4',
    },
  ];

  const filtered = activeCategory === 'All' ? tips : tips.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen pb-20 text-[#f1f5f9]">
      {/* Hero Section */}
      <section className="relative pt-8 md:pt-16 pb-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] -mr-80 -mt-80 animate-pulse-soft pointer-events-none" style={{ background: 'rgba(34,197,94,0.05)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] -ml-40 animate-pulse-soft delay-1000 pointer-events-none" style={{ background: 'rgba(14,165,233,0.05)' }} />

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
                        : { background: '#112236', color: '#64748b', border: '1px solid #1e3a5f' }
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
               <div className="w-full aspect-square rounded-[3rem] overflow-hidden relative" style={{ background: '#0d1b2a', border: '1px solid #1e3a5f' }}>
                <img
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1400&auto=format&fit=crop"
                  alt="Student Study Tips"
                  className="w-full h-full object-cover opacity-70 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060d14] to-transparent pointer-events-none" />
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
          <div className="h-px flex-1" style={{ background: '#1e3a5f' }} />
          <span className="font-black en-font text-xs tracking-[0.2em] uppercase whitespace-nowrap" style={{ color: '#64748b' }}>
            Showing {filtered.length} Expert Tips
          </span>
          <div className="h-px flex-1" style={{ background: '#1e3a5f' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {filtered.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.4 }}
              className="group relative rounded-[2rem] p-7 md:p-10 transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              style={{ background: '#0d1b2a', border: '1px solid #1e3a5f' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: tip.color }} />

              <div className="flex gap-5 md:gap-6 items-start relative z-10">
                <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" style={{ background: tip.iconBg }}>
                  <tip.icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[10px] font-black en-font tracking-[0.2em] uppercase mb-4 px-3 py-1 rounded-full text-white" style={{ background: '#112236', border: '1px solid #1e3a5f' }}>
                    {tip.tag}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bn font-black mb-3 text-white italic group-hover:text-[#22C55E] transition-colors leading-tight">
                    {tip.title}
                  </h3>
                  <p className="text-[14px] md:text-base leading-relaxed font-bn italic" style={{ color: '#64748b' }}>
                    {tip.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 md:mt-32 grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-[3rem] lg:rounded-[4rem] overflow-hidden shadow-2xl relative" style={{ background: '#0d1b2a', border: '1px solid #1e3a5f' }}>
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
              <Link to="/categories" className="h-[54px] px-8 rounded-2xl text-[15px] flex items-center justify-center transition-all bg-[#112236] text-[#22C55E] font-bn italic" style={{ border: '1.5px solid #1e3a5f' }}>
                নোটস দেখুন
              </Link>
            </div>
          </div>
          <div className="hidden lg:block relative overflow-hidden bg-[#060d14]">
            <img
              src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1400&auto=format&fit=crop"
              alt="Study Books"
              className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d1b2a] via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;

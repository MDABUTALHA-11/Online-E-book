import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Target, 
  Users, 
  CheckCircle2, 
  BookOpen, 
  Rocket, 
  ChevronRight 
} from 'lucide-react';
import usePageSEO from '../hooks/usePageSEO';

const About = () => {
  usePageSEO({
    title: 'আমাদের সম্পর্কে — Shaifly Library',
    description: 'শাইফলির লক্ষ্য হলো সকল ছাত্রছাত্রীদের কাছে মানসম্মত নোট সম্পূর্ণ ফ্রিতে পৌঁছে দেওয়া।',
    keywords: 'About, Shaifly, Contact, SSC, HSC, Bangladesh',
  });

  const stats = [
    { label: 'Books', value: '1.2K+', icon: BookOpen, color: 'text-[#22C55E]' },
    { label: 'Students', value: '5K+', icon: Users, color: 'text-blue-500' },
    { label: 'Downloads', value: '15K+', icon: Rocket, color: 'text-purple-500' },
    { label: 'Reviews', value: '4.9/5', icon: Heart, color: 'text-red-500' }
  ];

  const features = [
    { title: 'Verified Experts', desc: 'আমাদের প্রতিটি হ্যান্ডনোট অভিজ্ঞ শিক্ষকদের দ্বারা যাচাইকৃত।' },
    { title: 'Free Forever', desc: 'শাইফলির লক্ষ্য হলো সকল ছাত্রছাত্রীদের কাছে মানসম্মত নোট সম্পূর্ণ ফ্রিতে পৌঁছে দেওয়া।' },
    { title: 'Mobile Friendly', desc: 'যে কোনো ডিভাইস থেকে আপনি আমাদের লাইব্রেরি ব্যবহার করতে পারবেন।' },
    { title: 'Regular Update', desc: 'নতুন সিলেবাসের সাথে তাল মিলিয়ে প্রতিদিন নতুন নতুন সব নোট আপলোড করা হয়।' }
  ];

  return (
    <div className="pt-8 md:pt-16 min-h-screen text-[#f1f5f9]">
      <section className="section-padding">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full text-sm font-black mb-8 animate-pulse shadow-sm" style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.2)' }}>
                <Target className="w-4 h-4" /> আমাদের লক্ষ্য
              </div>
              <h1 className="text-4xl md:text-6xl font-bn font-black mb-8 leading-tight">শাইফলি: অনলাইন একাডেমিক <span style={{ color: '#22C55E' }}>সফলতার সাথী</span></h1>
              <p className="text-lg md:text-xl leading-relaxed mb-10 text-justify text-[#64748b]">
              শাইফলি (Shaifly) একটি ওপেন-সোর্স লাইব্রেরি যা বাংলাদেশের নবম-দ্বাদশ শ্রেণির শিক্ষার্থীদের কথা মাথায় রেখে তৈরি করা হয়েছে। আমাদের লক্ষ্য হচ্ছে সল্প খরচে বা বিনামূল্যে মানসম্মত ডিজিটাল একাডেমিক কন্টেন্ট সকলের হাতের নাগালে পৌঁছে দেওয়া। বিশেষ করে যারা গ্রামে থাকে বা ভালো শিক্ষকের সান্নিধ্য পায় না—তারা যেন পিছিয়ে না থাকে, সেটাই শাইফলির মূল উদ্দেশ্য।
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <button className="flex items-center justify-center gap-2 font-black font-bn text-[15px] h-[54px] w-full sm:w-auto px-8 rounded-2xl text-white transition-all hover:-translate-y-1" style={{ background: '#22C55E', boxShadow: '0 6px 20px rgba(34,197,94,0.35)' }}>শাইফলি সম্পর্কে জানুন</button>
                <button className="flex items-center justify-center gap-2 font-black font-bn text-[15px] h-[54px] w-full sm:w-auto px-8 rounded-2xl transition-all group" style={{ background: '#112236', border: '1.5px solid #1e3a5f', color: '#22C55E' }}>অফিসিয়াল ভিডিও <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:w-1/2 relative"
            >
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative" style={{ background: '#0d1b2a', border: '2px solid #1e3a5f' }}>
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop" alt="Students studying" className="w-full h-full object-cover opacity-60 hover:opacity-100 hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 bg-gradient-to-t from-[#060d14] to-transparent">
                  <div className="p-6 text-white text-center rounded-3xl backdrop-blur-md" style={{ background: 'rgba(13,27,42,0.6)', border: '1px solid #1e3a5f' }}>
                    <p className="text-sm font-bold opacity-80 mb-1" style={{ color: '#22C55E' }}>Founder Message</p>
                    <h4 className="text-xl md:text-2xl font-black font-bn mb-2 whitespace-normal italic">"শিক্ষার আলো ছড়িয়ে পড়ুক প্রতিটা গ্রামে, প্রতিটা ঘরে।"</h4>
                    <p className="text-xs text-[#64748b]">Team Shaifly</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl" style={{ background: 'rgba(34,197,94,0.1)' }} />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full blur-3xl" style={{ background: 'rgba(14,165,233,0.1)' }} />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-20 md:mb-32">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] text-center transition-all duration-300 hover:-translate-y-2 group"
                style={{ background: '#0d1b2a', border: '1px solid #1e3a5f' }}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl" style={{ background: '#112236', border: '1px solid #1e3a5f' }}>
                  <stat.icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color} group-hover:scale-110 transition-transform`} />
                 </div>
                <h4 className="text-2xl md:text-4xl font-black mb-2 text-white">{stat.value}</h4>
                <p className="font-bold uppercase tracking-widest text-[10px] md:text-xs text-[#64748b]">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="rounded-[3rem] md:rounded-[4rem] p-8 md:p-24 text-white relative overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(135deg, #0d1b2a, #060d14)', border: '1px solid #1e3a5f' }}>
             <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(34,197,94,0.05)' }} />
             <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-16 md:mb-20">
                  <h2 className="text-4xl md:text-6xl font-bn font-black mb-6">কেন আপনি শাইফলি <span style={{ color: '#22C55E' }}>বেছে নিবেন?</span></h2>
                  <div className="w-24 h-1.5 mx-auto rounded-full" style={{ background: '#22C55E' }} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                   {features.map((f) => (
                      <div key={f.title} className="flex gap-5 md:gap-6 group">
                         <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg rotate-6 group-hover:rotate-0" style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.2)' }}>
                            <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7" />
                         </div>
                         <div>
                            <h4 className="text-xl md:text-2xl font-bn font-black mb-2 text-white">{f.title}</h4>
                            <p className="text-[14px] md:text-[16px] leading-relaxed text-[#64748b]">{f.desc}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

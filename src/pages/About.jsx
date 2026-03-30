import React from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Target, 
  Users, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  Rocket, 
  ChevronRight 
} from 'lucide-react';

const About = () => {
  const stats = [
    { label: 'Books', value: '1.2K+', icon: BookOpen, color: 'text-primary' },
    { label: 'Students', value: '5K+', icon: Users, color: 'text-secondary' },
    { label: 'Downloads', value: '15K+', icon: Rocket, color: 'text-accent' },
    { label: 'Reviews', value: '4.9/5', icon: Heart, color: 'text-red-500' }
  ];

  const features = [
    { title: 'Verified Experts', desc: 'আমাদের প্রতিটি হ্যান্ডনোট অভিজ্ঞ শিক্ষকদের দ্বারা যাচাইকৃত।' },
    { title: 'Free Forever', desc: 'শাইফলির লক্ষ্য হলো সকল ছাত্রছাত্রীদের কাছে মানসম্মত নোট সম্পূর্ণ ফ্রিতে পৌঁছে দেওয়া।' },
    { title: 'Mobile Friendly', desc: 'যে কোনো ডিভাইস থেকে আপনি আমাদের লাইব্রেরি ব্যবহার করতে পারবেন।' },
    { title: 'Regular Update', desc: 'নতুন সিলেবাসের সাথে তাল মিলিয়ে প্রতিদিন নতুন নতুন সব নোট আপলোড করা হয়।' }
  ];

  return (
    <div className="pt-24 min-h-screen">
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-primary/10 text-primary rounded-full text-sm font-black mb-8 animate-pulse shadow-sm shadow-primary/10">
                <Target className="w-4 h-4" /> আমাদের লক্ষ্য
              </div>
              <h1 className="text-4xl md:text-6xl font-bn font-black mb-8 leading-tight">শাইফলি: অনলাইন একাডেমিক <span className="gradient-text">সফলতার সাথী</span></h1>
              <p className="text-xl text-slate-500 leading-relaxed mb-10 text-justify">
              শাইফলি (Shaifly) একটি ওপেন-সোর্স লাইব্রেরি যা বাংলাদেশের নবম-দ্বাদশ শ্রেণির শিক্ষার্থীদের কথা মাথায় রেখে তৈরি করা হয়েছে। আমাদের লক্ষ্য হচ্ছে সল্প খরচে বা বিনামূল্যে মানসম্মত ডিজিটাল একাডেমিক কন্টেন্ট সকলের হাতের নাগালে পৌঁছে দেওয়া। বিশেষ করে যারা গ্রামে থাকে বা ভালো শিক্ষকের সান্নিধ্য পায় না—তারা যেন পিছিয়ে না থাকে, সেটাই শাইফলির মূল উদ্দেশ্য।
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <button className="btn btn-primary btn-lg w-full sm:w-auto rounded-2xl px-6 md:px-10 shadow-lg shadow-primary/20">শাইফলি সম্পর্কে জানুন</button>
                <button className="btn btn-outline btn-lg w-full sm:w-auto rounded-2xl px-6 md:px-10 group justify-center">অফিসিয়াল ভিডিও <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:w-1/2 relative"
            >
              <div className="aspect-square bg-slate-100 rounded-[4rem] overflow-hidden shadow-2xl relative border-4 border-white">
                <img src="/Logo/Shaifly_Logo_Big.png" alt="Shaifly Big Logo" className="w-full h-full object-cover scale-110 hover:scale-100 transition-transform duration-700" 
                  onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1000'; }}
                />
                <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="glass p-6 text-white text-center rounded-3xl">
                    <p className="text-sm font-bold opacity-80 mb-1">Founder Message</p>
                    <h4 className="text-2xl font-black font-bn mb-2 whitespace-normal italic">"শিক্ষার আলো ছড়িয়ে পড়ুক প্রতিটা গ্রামে, প্রতিটা ঘরে।"</h4>
                    <p className="text-xs opacity-70">Team Shaifly</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-20 md:mb-32">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-xl text-center border border-slate-100 hover:shadow-2xl transition-all hover:border-primary/20"
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 bg-slate-50 ${stat.color} shadow-sm`}>
                  <stat.icon className="w-6 h-6 md:w-7 md:h-7" />
                 </div>
                <h4 className="text-2xl md:text-4xl font-black mb-2 text-slate-800">{stat.value}</h4>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] md:text-xs">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-[3rem] md:rounded-[4rem] p-8 md:p-24 text-white relative overflow-hidden shadow-2xl">
             <div className="max-w-4xl mx-auto">
                <div className="text-center mb-20">
                  <h2 className="text-4xl md:text-6xl font-bn font-black mb-6 italic">কেন আপনি শাইফলি <span className="text-primary italic">বেছে নিবেন?</span></h2>
                  <div className="w-24 h-2 bg-primary mx-auto rounded-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   {features.map((f) => (
                      <div key={f.title} className="flex gap-6 group">
                         <div className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-lg rotate-12 group-hover:rotate-0">
                            <CheckCircle2 className="w-6 h-6" />
                         </div>
                         <div>
                            <h4 className="text-2xl font-bn font-black mb-3 text-slate-100 italic">{f.title}</h4>
                            <p className="text-slate-400 text-lg leading-relaxed">{f.desc}</p>
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

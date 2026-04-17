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
import GoogleAd from '../components/GoogleAd';

const About = () => {
  usePageSEO({
    title: 'আমাদের সম্পর্কে — Shaifly Library',
    description: 'শাইফলির লক্ষ্য হলো সকল ছাত্রছাত্রীদের কাছে মানসম্মত নোট সম্পূর্ণ ফ্রিতে পৌঁছে দেওয়া।',
    keywords: 'About, Shaifly, Contact, SSC, HSC, Bangladesh',
  });

  const stats = [
    { label: 'Books', value: '1.2K+', icon: BookOpen, color: 'text-[#22C55E]' },
    { label: 'Students', value: '5K+', icon: Users, color: 'text-emerald-500' },
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
                <button className="flex items-center justify-center gap-2 font-black font-bn text-[15px] h-[54px] w-full sm:w-auto px-8 rounded-2xl transition-all group" style={{ background: 'var(--bg-elevated)', border: '1.5px solid var(--bg-border)', color: '#22C55E' }}>অফিসিয়াল ভিডিও <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></button>
              </div>
            </motion.div>
            
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl" style={{ background: 'rgba(34,197,94,0.1)' }} />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full blur-3xl" style={{ background: 'rgba(34,197,94,0.1)' }} />
            </motion.div>
          </div>

          {/* Detailed Mission Section for AdSense Compatibility */}
          <div className="mb-24 p-8 md:p-16 rounded-[3rem]" style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                   <h2 className="text-3xl md:text-5xl font-bn font-black text-white italic mb-8 leading-tight">আমাদের লক্ষ্য ও <span style={{ color: '#22C55E' }}>মূল দর্শন</span></h2>
                   <div className="space-y-6 text-[#64748b] font-bn text-[17px] md:text-[19px] leading-relaxed italic">
                      <p>
                         শাইফলি (Shaifly) তৈরি করার পেছনে আমাদের সবচেয়ে বড় অনুপ্রেরণা ছিল বাংলাদেশের সাধারণ মধ্যবিত্ত এবং নিম্ন-মধ্যবিত্ত পরিবারের মেধাবী শিক্ষার্থীরা। বর্তমান সময়ে মানসম্মত শিক্ষা উপকরণ যেমন—ভালো টিউটর কিংবা দামী গাইড বই কেনা অনেকের জন্যই দুঃসাধ্য হয়ে দাঁড়িয়েছে। আমরা চেয়েছি এমন একটি ডিজিটাল প্ল্যাটফর্ম তৈরি করতে যেখানে একজন শিক্ষার্থী তার ঘরের কোণে বসেই দেশের সেরা হ্যান্ডনোটগুলো হাতের নাগালে পায়।
                      </p>
                      <p>
                         আমরা মনে করি, শিক্ষা কোনো ব্যবসায়িক পণ্য নয়, এটি প্রতিটি নাগরিকের মৌলিক অধিকার। তাই আমরা টেকনোলজি এবং শিক্ষাকে একীভূত করে এমন এক সমাধান তৈরি করেছি যা যেকোনো সময়, যেকোনো জায়গা থেকে ব্যবহার করা সম্ভব। বিশেষ করে SSC এবং HSC স্তরের বিজ্ঞান বিভাগের শিক্ষার্থীদের জন্য পদার্থবিজ্ঞান, উচ্চতর গণিত এবং রসায়নের মতো জটিল বিষয়গুলোকে সহজ এবং আকর্ষণীয় করে তোলাই আমাদের মূল লক্ষ্য।
                      </p>
                   </div>
                </div>
                <div className="grid grid-cols-1 gap-6">
                   <div className="p-8 rounded-3xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}>
                      <h3 className="text-[#22C55E] font-black font-bn text-xl mb-3 italic">১. গুণমান নিশ্চিত করা</h3>
                      <p className="text-[#64748b] font-bn italic">আমাদের প্রতিটি নোট অভিজ্ঞ শিক্ষকদের দ্বারা একাধিকবার যাচাই করা হয় যেন তথ্যের কোনো ভুল না থাকে এবং শিক্ষার্থীরা সঠিক জ্ঞান অর্জন করতে পারে।</p>
                   </div>
                   <div className="p-8 rounded-3xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}>
                      <h3 className="text-[#22C55E] font-black font-bn text-xl mb-3 italic">২. নিরবচ্ছিন্ন সেবা</h3>
                      <p className="text-[#64748b] font-bn italic">২৪/৭ অনলাইন অ্যাক্সেস নিশ্চিত করার মাধ্যমে আমরা শিক্ষার্থীদের পড়াশোনাকে আরও গতিশীল করতে প্রতিশ্রুতিবদ্ধ। আমাদের লাইব্রেরি সবসময় সকলের জন্য উন্মুক্ত।</p>
                   </div>
                </div>
             </div>
          </div>

          {/* Expert Contributors Section for E-E-A-T */}
          <div className="mb-24">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bn font-black text-white italic mb-4">আমাদের <span style={{ color: '#22C55E' }}>মেধাবী টিম</span></h2>
                <p className="text-[#64748b] font-bn italic text-lg">সেরা নোট নিশ্চিত করতে যারা দিনরাত কাজ করছেন।</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                   { name: 'Dr. Ariful Islam', role: 'Physics Mentor', bio: 'বুয়েট থেকে গ্র্যাজুয়েশন শেষ করে গত ১০ বছর ধরে ফিজিক্স পড়ানোর অভিজ্ঞতা।' },
                   { name: 'Sultana Razia', role: 'Biology Expert', bio: 'ঢাকা বিশ্ববিদ্যালয় থেকে এম.এসসি শেষ করে বর্তমানে ক্যাডেট কলেজে শিক্ষকতা করছেন।' },
                   { name: 'Kamrul Hasan', role: 'Math Architect', bio: 'গণিতকে সহজ করার প্যাশন নিয়ে শাইফলির সাথে কাজ করছেন শুরু থেকেই।' }
                ].map((expert, i) => (
                   <div key={i} className="group p-8 rounded-[2.5rem] transition-all hover:-translate-y-2" style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}>
                      <div className="w-20 h-20 rounded-2xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center mb-6 transition-all group-hover:rotate-6 group-hover:scale-110">
                         <Users className="w-10 h-10 text-[#22C55E]" />
                      </div>
                      <h3 className="text-white font-black font-bn text-2xl mb-1 italic">{expert.name}</h3>
                      <p className="text-[#22C55E] font-black text-[11px] uppercase tracking-widest mb-4">{expert.role}</p>
                      <p className="text-[#64748b] font-bn italic text-[15px] leading-relaxed">{expert.bio}</p>
                   </div>
                ))}
             </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-20 md:mb-32">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] text-center transition-all duration-300 hover:-translate-y-2 group"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}>
                  <stat.icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color} group-hover:scale-110 transition-transform`} />
                 </div>
                <h4 className="text-2xl md:text-4xl font-black mb-2 text-white">{stat.value}</h4>
                <p className="font-bold uppercase tracking-widest text-[10px] md:text-xs text-[#64748b]">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="rounded-[3rem] md:rounded-[4rem] p-8 md:p-24 text-white relative overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(135deg, var(--bg-surface), var(--bg-app))', border: '1px solid var(--bg-border)' }}>
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

           {/* Ad Unit */}
           <div className="mt-12">
             <GoogleAd slot="2280555349" />
           </div>
        </div>
      </section>
    </div>
  );
};

export default About;

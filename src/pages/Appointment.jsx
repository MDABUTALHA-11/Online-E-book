import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  HelpCircle, 
  BookOpen, 
  MessageSquare, 
  Zap, 
  Video, 
  CheckCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  CreditCard
} from 'lucide-react';
import usePageSEO from '../hooks/usePageSEO';
import { useBkash } from '../components/BkashModal';
import { useToast } from '../components/Toast';
import { useNavigate } from 'react-router-dom';

const subjects = [
  'পদার্থবিজ্ঞান',
  'রসায়ন',
  'জীববিজ্ঞান',
  'উচ্চতর গণিত',
  'সাধারণ গণিত',
  'ইংরেজি',
  'আইসিটি'
];

const Appointment = () => {
  const { openBkash } = useBkash();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    problem: '',
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(storedUser);
  }, []);

  usePageSEO({
    title: 'টিচার অ্যাপয়েন্টমেন্ট — Shaifly Library',
    description: 'পরীক্ষার আগের রাতে কোনো পড়া বুঝতে সমস্যা? আমাদের সেরা শিক্ষকদের কাছ থেকে সরাসরি সমাধান বুঝে নিন।',
    keywords: 'Appointment, Teacher Help, Online Class, Shaifly, Exam Support',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!user) {
      showToast('অনুগ্রহ করে আগে প্রোফাইল তৈরি করুন', 'error');
      navigate('/register');
      return;
    }

    if (!formData.subject || !formData.problem) {
      showToast('সবগুলো ঘর পূরণ করুন', 'error');
      return;
    }

    openBkash({
      name: `টিচার সাপোর্ট: ${formData.subject}`,
      price: '৳৯৯',
      type: 'appointment',
      studentProblem: formData.problem,
      subject: formData.subject,
      studentName: user.name
    });
  };

  return (
    <div className="min-h-screen pb-40 text-slate-800">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-20 overflow-hidden text-center md:text-left">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] -mr-60 -mt-60 pointer-events-none" style={{ background: 'rgba(20,184,166,0.1)' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:w-1/2"
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full text-[10px] font-black en-font mb-10 tracking-[0.2em] uppercase shadow-sm" style={{ background: 'rgba(20,184,166,0.1)', border: '1px solid rgba(20,184,166,0.2)', color: '#14B8A6' }}>
                <Video className="w-4 h-4 animate-pulse" /> 1-on-1 Live Support
              </div>
              <h1 className="text-[#0F172A] text-5xl md:text-7xl lg:text-[5.5rem] font-bn font-black mb-10 italic leading-[0.9] tracking-tighter">
                পরীক্ষার আগে <br />
                <span className="italic" style={{ color: '#F97316' }}>শিক্ষকের সরাসরি সাহায্য</span>
              </h1>
              <p className="text-xl md:text-2xl font-bn italic leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-12 text-slate-550">
                গভীর রাতে কোনো অংক বা থিওরি বুঝতে পারছেন না? চিন্তার কিছু নেই! আমাদের দক্ষ শিক্ষকরা জুম লিংকের মাধ্যমে আপনাকে যেকোনো জটিল সমস্যা বুঝিয়ে দেবে।
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                 {[
                   { icon: Clock, text: '৩০ মিনিটের সেশন' },
                   { icon: HelpCircle, text: 'যেকোনো প্রশ্নের সমাধান' },
                   { icon: ShieldCheck, text: 'সেরা শিক্ষক প্যানেল' },
                   { icon: Sparkles, text: 'সহজ ও কার্যকর সমাধান' }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--bg-border)]">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[#14B8A6]" style={{ background: 'rgba(20,184,166,0.1)' }}>
                         <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-bn font-bold italic text-[#0F172A]">{item.text}</span>
                   </div>
                 ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:w-1/2 w-full"
            >
              <div className="bg-[var(--bg-surface)] border border-[var(--bg-border)] rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#14B8A6]/5 rounded-bl-[100px] pointer-events-none" />
                
                <h3 className="text-3xl font-bn font-black mb-8 italic text-[#0F172A] flex items-center gap-4">
                   <div className="w-12 h-12 rounded-2xl bg-[#14B8A6] flex items-center justify-center text-white shadow-lg shadow-[#14B8A6]/30">
                      <MessageSquare className="w-6 h-6" />
                   </div>
                   অ্যাপয়েন্টমেন্ট ফরম
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Subject Field */}
                  <div className="space-y-2">
                    <label className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4 font-en">Select Subject</label>
                    <div className="relative group">
                      <BookOpen className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#14B8A6] transition-colors" />
                      <select 
                        required
                        className="w-full h-16 pl-14 pr-6 rounded-2xl bg-[var(--bg-elevated)] border-[1.5px] border-[var(--bg-border)] text-[#0F172A] font-bn font-black italic text-[16px] outline-none focus:border-[#14B8A6]/40 transition-all appearance-none cursor-pointer"
                        value={formData.subject}
                        onChange={e => setFormData({...formData, subject: e.target.value})}
                      >
                        <option value="" disabled>বিষয় নির্বাচন করুন...</option>
                        {subjects.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Problem Field */}
                  <div className="space-y-2">
                    <label className="text-[12px] font-black uppercase tracking-[0.2em] text-slate-550 ml-4 font-en">Your Question / Problem</label>
                    <div className="relative group">
                      <HelpCircle className="absolute left-5 top-5 w-5 h-5 text-slate-500 group-focus-within:text-[#14B8A6] transition-colors" />
                      <textarea 
                        required
                        placeholder="আপনার সমস্যাটি বিস্তারিত লিখুন (যেমন: ফিজিক্সের ২য় অধ্যায়ের অংকটি বুঝতে পারছি না)..."
                        className="w-full h-40 pl-14 pr-6 py-5 rounded-2xl bg-[var(--bg-elevated)] border-[1.5px] border-[var(--bg-border)] text-[#0F172A] font-bn font-black italic text-[16px] outline-none focus:border-[#14B8A6]/40 transition-all resize-none no-scrollbar"
                        value={formData.problem}
                        onChange={e => setFormData({...formData, problem: e.target.value})}
                      />
                    </div>
                  </div>

                  {/* Price Banner */}
                  <div className="p-6 rounded-2xl bg-[#14B8A6]/10 border border-[#14B8A6]/20 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <Zap className="w-6 h-6 text-[#14B8A6]" />
                        <div>
                           <p className="text-[#14B8A6] text-[10px] font-black uppercase tracking-widest font-en leading-none mb-1">Session Fee</p>
                           <p className="text-xl font-bn font-black text-[#0F172A] italic">৳৯৯ এককালীন</p>
                        </div>
                     </div>
                     <Star className="text-yellow-500 fill-yellow-500 w-6 h-6 animate-pulse" />
                  </div>

                  <button 
                    type="submit"
                    className="w-full h-16 rounded-2xl bg-[#F97316] text-white font-bn font-black italic text-xl shadow-[0_8px_25px_rgba(249,115,22,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    বুকিং নিশ্চিত করুন <ArrowRight className="w-6 h-6" />
                  </button>

                  <p className="text-center text-slate-500 text-[12px] font-bn italic font-bold">
                    বিকাশে পেমেন্ট করার ১০-১৫ মিনিটের মধ্যে শিক্ষক আপনার সাথে যোগাযোগ করবেন।
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="container mx-auto px-6 pt-20">
         <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bn font-black italic text-[#0F172A] mb-4">কিভাবে কাজ করে?</h2>
            <div className="w-24 h-1.5 bg-[#14B8A6] mx-auto rounded-full" />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-[var(--bg-border)] -translate-y-12 z-0" />
            
            {[
              { 
                title: '১. ফরম পূরণ করুন', 
                desc: 'আপনার বিষয় এবং যে সমস্যাটি বুঝতে পারছেন না তা বিস্তারিত লিখুন।',
                icon: HelpCircle
              },
              { 
                title: '২. পেমেন্ট সম্পন্ন করুন', 
                desc: 'বিকাশের মাধ্যমে নির্ধারিত ফি প্রদান করে আপনার বুকিং সম্পন্ন করুন।',
                icon: CreditCard
              },
              { 
                title: '৩. সরাসরি সমাধান নিন', 
                desc: 'শিক্ষক আপনাকে নির্ধারিত সময়ে জুম লিংক প্রদান করবেন এবং সমস্যাটি বুঝিয়ে দেবেন।',
                icon: CheckCircle
              }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 flex flex-col items-center text-center p-8 rounded-[2.5rem] bg-[var(--bg-surface)] border border-[var(--bg-border)]"
              >
                 <div className="w-20 h-20 rounded-3xl bg-[#14B8A6] flex items-center justify-center text-white shadow-xl shadow-[#14B8A6]/20 mb-8 border-4 border-[var(--bg-app)]">
                    <step.icon className="w-10 h-10" />
                 </div>
                 <h3 className="text-2xl font-bn font-black italic text-[#0F172A] mb-4">{step.title}</h3>
                 <p className="text-slate-500 font-bn font-bold italic leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
         </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-6 mt-32">
         <div className="p-10 md:p-20 rounded-[3rem] md:rounded-[4rem] text-center relative overflow-hidden bg-gradient-to-br from-[var(--bg-surface)] to-slate-100 border border-[var(--bg-border)] shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none bg-[url('/noise.png')]" />
            <Sparkles className="w-16 h-16 text-[#F97316] mx-auto mb-8 animate-bounce" />
            <h2 className="text-4xl md:text-6xl font-bn font-black italic text-[#0F172A] mb-8">আর কোনো চিন্তা নেই পরীক্ষার আগের রাতে!</h2>
            <p className="text-xl md:text-2xl font-bn italic text-slate-550 mb-12 max-w-3xl mx-auto">
               শাইফলির বিশেষজ্ঞ শিক্ষকরা আপনার প্রতিটি অস্পষ্ট থিওরিকে সহজ করে তুলতে প্রস্তুত। এখনই আপনার অ্যাপয়েন্টমেন্ট বুক করুন।
            </p>
            <div className="flex flex-wrap justify-center gap-6">
                <button 
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="h-16 px-12 rounded-2xl bg-[#F97316] text-white font-bn font-black italic text-xl shadow-lg hover:scale-105 transition-all"
                >
                   বুকিং শুরু করুন
                </button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Appointment;

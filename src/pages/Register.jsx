import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, School, MapPin, ShieldCheck, ArrowRight, Camera, Sparkles, CheckCircle2, PencilLine, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import usePageSEO from '../hooks/usePageSEO';

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    school: '',
    location: '',
    level: 'SSC',
    bio: '',
    photo: null
  });
  const fileInputRef = React.useRef(null);

  usePageSEO({
    title: 'প্রোফাইল তৈরি করুন — Shaifly Library',
    description: 'শাইফলিতে আপনার ফ্রি প্রোফাইল তৈরি করুন এবং পড়াশোনা শুরু করুন।',
    keywords: 'Register, Student Profile, Shaifly, SSC, HSC',
  });

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 2) setStep(step + 1);
    else {
      // Get existing user data or create new
      const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
      const newUser = { ...existingUser, ...formData };
      localStorage.setItem('user', JSON.stringify(newUser));
      // Dispatch a storage event to update TopBar
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen pb-24 pt-10 md:pt-20 flex items-center justify-center relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#22C55E]/5 rounded-full blur-[120px] pointer-events-none animate-pulse-soft" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse-soft delay-700" />

      <div className="container mx-auto px-4 max-w-xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0d1b2a] border border-[#1e3a5f] rounded-[3rem] p-8 md:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#22C55E]/10 to-transparent rounded-bl-[100px] pointer-events-none" />
          
          {/* Header */}
          <div className="text-center mb-10 relative">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-24 h-24 bg-[#112236] border border-[#1e3a5f] rounded-[2.5rem] mx-auto flex items-center justify-center mb-6 shadow-xl group cursor-pointer relative overflow-hidden transition-all hover:border-[#22C55E]/40"
            >
                {formData.photo ? (
                  <img src={formData.photo} alt="Profile" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[#22C55E]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Camera className="w-9 h-9 text-[#22C55E] group-hover:scale-110 transition-transform" />
                  </>
                )}
                <div className="absolute bottom-0 right-0 p-1.5 bg-[#22C55E] text-white rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity">
                   <PencilLine className="w-3.5 h-3.5" />
                </div>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handlePhotoUpload} 
            />
            <h1 className="text-3xl md:text-5xl font-bn font-black text-white mb-3 italic tracking-tighter">
                প্রোফাইল <span className="text-[#22C55E]">তৈরি</span> করুন
            </h1>
            <p className="text-slate-400 font-bn italic text-[16px] font-bold">
                সেকেন্ডের মধ্যেই আপনার একাডেমিক যাত্রা শুরু করুন।
            </p>
          </div>

          {/* Stepper */}
          <div className="flex items-center justify-center gap-3 mb-10 px-10">
             <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-[#22C55E]' : 'bg-[#1e3a5f]'}`} />
             <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-[#22C55E]' : 'bg-[#1e3a5f]'}`} />
          </div>

          <form onSubmit={handleNext} className="space-y-6">
            {step === 1 ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="space-y-5"
              >
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="text-[12px] font-black uppercase tracking-[0.2em] text-[#334155] ml-4 font-en">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#334155] group-focus-within:text-[#22C55E] transition-colors" />
                    <input 
                      required
                      type="text" 
                      placeholder="আপনার পূর্ণ নাম লিখুন..."
                      className="w-full h-16 pl-14 pr-6 rounded-2xl bg-[#112236] border-[1.5px] border-[#1e3a5f] text-white font-bn font-black italic text-[16px] outline-none focus:border-[#22C55E]/40 focus:bg-[#112236] transition-all"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-[12px] font-black uppercase tracking-[0.2em] text-[#334155] ml-4 font-en">Email Address</label>
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#334155] group-focus-within:text-[#22C55E] transition-colors" />
                    <input 
                      required
                      type="email" 
                      placeholder="ইমেইল এড্রেস (ঐচ্ছিক নয়)..."
                      className="w-full h-16 pl-14 pr-6 rounded-2xl bg-[#112236] border-[1.5px] border-[#1e3a5f] text-white font-bn font-black italic text-[16px] outline-none focus:border-[#22C55E]/40 focus:bg-[#112236] transition-all"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                className="space-y-5"
              >
                {/* School Field */}
                <div className="space-y-2">
                  <label className="text-[12px] font-black uppercase tracking-[0.2em] text-[#334155] ml-4 font-en">School / College</label>
                  <div className="relative group">
                    <School className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#334155] group-focus-within:text-[#22C55E] transition-colors" />
                    <input 
                      required
                      type="text" 
                      placeholder="আপনার শিক্ষা প্রতিষ্ঠানের নাম..."
                      className="w-full h-16 pl-14 pr-6 rounded-2xl bg-[#112236] border-[1.5px] border-[#1e3a5f] text-white font-bn font-black italic text-[16px] outline-none focus:border-[#22C55E]/40 focus:bg-[#112236] transition-all"
                      value={formData.school}
                      onChange={e => setFormData({...formData, school: e.target.value})}
                    />
                  </div>
                </div>

                {/* Level Select */}
                <div className="grid grid-cols-2 gap-4">
                   <button 
                     type="button"
                     onClick={() => setFormData({...formData, level: 'SSC'})}
                     className={`h-16 rounded-2xl font-bn font-black italic text-lg transition-all border-2 ${formData.level === 'SSC' ? 'bg-[#22C55E] text-white border-[#22C55E]' : 'bg-[#112236] text-[#64748b] border-[#1e3a5f]'}`}
                   >
                     SSC
                   </button>
                   <button 
                     type="button"
                     onClick={() => setFormData({...formData, level: 'HSC'})}
                     className={`h-16 rounded-2xl font-bn font-black italic text-lg transition-all border-2 ${formData.level === 'HSC' ? 'bg-[#22C55E] text-white border-[#22C55E]' : 'bg-[#112236] text-[#64748b] border-[#1e3a5f]'}`}
                   >
                     HSC
                   </button>
                </div>

                 {/* Bio Field */}
                 <div className="space-y-2">
                   <label className="text-[12px] font-black uppercase tracking-[0.2em] text-[#334155] ml-4 font-en">About Your Story</label>
                   <div className="relative group">
                     <PencilLine className="absolute left-5 top-5 w-5 h-5 text-[#334155] group-focus-within:text-[#22C55E] transition-colors" />
                     <textarea 
                       placeholder="আপনার সম্পর্কে কিছু বলুন..."
                       className="w-full h-32 pl-14 pr-6 py-5 rounded-2xl bg-[#112236] border-[1.5px] border-[#1e3a5f] text-white font-bn font-black italic text-[16px] outline-none focus:border-[#22C55E]/40 focus:bg-[#112236] transition-all resize-none no-scrollbar"
                       value={formData.bio}
                       onChange={e => setFormData({...formData, bio: e.target.value})}
                     />
                   </div>
                 </div>
              </motion.div>
            )}

            {/* Action Button */}
            <div className="pt-4 flex flex-col gap-4">
              <button 
                type="submit"
                className="w-full h-16 rounded-2xl bg-[#22C55E] text-white font-bn font-black italic text-xl shadow-[0_8px_25px_rgba(34,197,94,0.35)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                {step === 1 ? 'পরবর্তী ধাপে যান' : 'অ্যাকাউন্ট তৈরি নিশ্চিত করুন'} 
                <ArrowRight className="w-6 h-6" />
              </button>
              
              {step === 2 && (
                <button 
                  type="button" onClick={() => setStep(1)}
                  className="w-full text-center text-slate-500 font-bn font-black italic text-[14px] hover:text-[#22C55E] transition-colors"
                >
                  আগের ধাপে ফিরে যান
                </button>
              )}
            </div>

            {/* Footer Info */}
            <div className="bg-[#112236]/50 rounded-2xl p-4 flex items-center gap-3 border border-[#1e3a5f]/50">
               <ShieldCheck className="w-5 h-5 text-[#22C55E] shrink-0" />
               <p className="text-[12px] font-bn italic font-bold text-slate-500 leading-tight">
                  আপনার তথ্যগুলো সম্পূর্ণ নিরাপদ। আমরা কোনো স্প্যাম মেইল পাঠাই না।
               </p>
            </div>
          </form>
        </motion.div>

        {/* Small Benefit Tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 px-4 opacity-60">
           <div className="flex items-center gap-2 text-[12px] font-bn font-black text-white italic">
              <CheckCircle2 className="w-4 h-4 text-[#22C55E]" /> ১০০% ফ্রি আজীবন
           </div>
           <div className="flex items-center gap-2 text-[12px] font-bn font-black text-white italic">
              <Sparkles className="w-4 h-4 text-[#22C55E]" /> আনলিমিটেড নোটস
           </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

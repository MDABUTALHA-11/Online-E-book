import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Bookmark, Clock, CheckCircle2 } from 'lucide-react';
import { tipsData } from '../data/tips';
import usePageSEO from '../hooks/usePageSEO';

const TipDetail = () => {
  const { tipId } = useParams();
  const navigate = useNavigate();
  const tip = tipsData.find(t => t.id === tipId);

  usePageSEO({
    title: tip ? `${tip.title} — Shaifly Library` : 'Tips Detail',
    description: tip ? tip.desc : '',
  });

  if (!tip) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-800">
        <div className="text-center">
            <h2 className="text-3xl font-bn mb-4 text-red-500">টিপসটি পাওয়া যায়নি!</h2>
            <Link to="/tips" className="text-[#F97316] font-bold hover:underline">টিপস পেজে ফিরে যান</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-40 text-slate-800">
      <div className="relative h-[45vh] md:h-[60vh] w-full overflow-hidden mb-12">
        <img 
          src={tip.ghibliImage} 
          alt={tip.title} 
          className="w-full h-full object-cover transition-transform duration-1000 scale-105 hover:scale-100 grayscale hover:grayscale-0" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-app)] via-[var(--bg-app)]/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16 max-w-7xl mx-auto">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="flex flex-col gap-4"
           >
              <div className="flex items-center gap-4">
                 <button 
                   onClick={() => navigate('/tips')} 
                   className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-[#14B8A6] border border-white/20 transition-all group"
                 >
                   <ArrowLeft className="w-5 h-5 text-white group-hover:scale-110" />
                 </button>
                 <span className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/10 border border-white/20 backdrop-blur-md text-white">
                    {tip.tag}
                 </span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bn font-black italic tracking-tight leading-tight text-white drop-shadow-2xl">
                 {tip.title}
              </h1>
           </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">
        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-10"
        >
          <div className="p-8 md:p-12 rounded-[2.5rem] bg-[var(--bg-surface)] border border-[var(--bg-border)] shadow-2xl relative overflow-hidden" 
               style={{ background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-app) 100%)' }}>
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px]" style={{ background: tip.color }} />
            
            <p className="text-xl md:text-3xl font-bn italic text-[#0F172A] leading-relaxed mb-10 border-l-4 border-[#F97316] pl-6">
               {tip.desc}
            </p>

            <div className="max-w-none">
               <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner" style={{ background: tip.iconBg }}>
                     <tip.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-black italic m-0 text-[#0F172A]">বিস্তারিত তথ্য</h3>
               </div>
               <p className="font-bn text-lg leading-loose text-slate-600 text-justify">
                  {tip.fullContent}
               </p>
            </div>
            
            <div className="mt-16 pt-8 border-t border-[var(--bg-border)] flex flex-wrap gap-4 items-center justify-between">
               <div className="flex items-center gap-2 text-[#64748b] text-sm font-black italic">
                  <Clock className="w-4 h-4" /> পড়ার সময়: ৩ মিনিট
               </div>
               <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--bg-elevated)] border border-[var(--bg-border)] hover:bg-[#14B8A6]/10 transition-all text-[#14B8A6] font-black text-xs uppercase tracking-widest font-en shadow-sm">
                     <Share2 className="w-4 h-4" /> Share Tip
                  </button>
               </div>
            </div>
          </div>

          <div className="p-10 rounded-[3rem] bg-[#14B8A6]/5 border border-[#14B8A6]/20 relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center bg-[#14B8A6] shadow-2xl rotate-12">
                   <span className="text-3xl font-black text-white">💡</span>
                </div>
                <div>
                  <h4 className="text-[22px] font-black font-bn italic text-[#0F172A] mb-2 leading-snug">নিজেকে আরও উন্নত করতে চান?</h4>
                  <p className="text-[15px] font-bn italic text-slate-500 mb-0">আমাদের বিশেষজ্ঞ টিপস অনুসরণ করে মাত্র ৩০ দিনে আমূল পরিবর্তন নিশ্চিত করুন।</p>
                </div>
                <Link to="/subscription" className="ml-auto px-8 py-4 rounded-2xl bg-[#F97316] text-white font-black italic hover:scale-105 transition-all text-[15px] shadow-lg no-underline">
                   সদস্য হোন
                </Link>
             </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <aside className="space-y-8">
          <div className="p-8 rounded-[2rem] bg-[var(--bg-surface)] border border-[var(--bg-border)] h-fit sticky top-28">
             <h3 className="text-xl font-black italic text-[#0F172A] mb-6 font-bn border-b border-[var(--bg-border)] pb-4">অন্যান্য টিপস</h3>
             <div className="space-y-5">
                {tipsData.filter(t => t.id !== tipId).slice(0, 4).map((t) => (
                  <Link 
                    key={t.id} 
                    to={`/tips/${t.id}`}
                    className="flex gap-4 group no-underline"
                  >
                     <div className="w-16 h-12 rounded-xl overflow-hidden shrink-0 border border-[var(--bg-border)]">
                        <img src={t.ghibliImage} alt={t.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                     </div>
                     <div>
                        <h4 className="text-[14px] font-black font-bn italic text-[#0F172A] group-hover:text-[#F97316] transition-colors leading-snug">
                           {t.title}
                        </h4>
                        <p className="text-[10px] uppercase tracking-widest text-slate-600 mt-1">{t.tag}</p>
                     </div>
                  </Link>
                ))}
             </div>
             <Link 
               to="/tips" 
               className="mt-8 flex items-center justify-center gap-2 w-full py-4 rounded-xl font-black text-xs text-[#0F172A] bg-[var(--bg-elevated)] hover:bg-[#14B8A6]/10 border border-[var(--bg-border)] transition-all no-underline"
             >
                সকল টিপস দেখুন <CheckCircle2 className="w-4 h-4 text-[#14B8A6]" />
             </Link>
          </div>

          <div className="p-8 rounded-[2rem] bg-gradient-to-br from-[var(--bg-border)]/30 to-[var(--bg-app)] border border-[var(--bg-border)]">
             <h3 className="text-lg font-black italic text-[#0F172A] mb-4 font-bn">Shaifly Pro</h3>
             <p className="text-[13px] text-slate-500 italic mb-6 font-bn">আনলিমিটেড নোটস, প্রিমিয়াম কুইজ এবং এক্সক্লুসিভ সাজেশন পেতে আজই প্রো-তে সাবস্ক্রাইব করুন।</p>
             <Link to="/subscription" className="block text-center py-4 rounded-xl bg-[#F97316] hover:bg-[#E85E2A] text-white font-black text-xs tracking-widest transition-all no-underline shadow-lg">UPGRADE NOW</Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default TipDetail;

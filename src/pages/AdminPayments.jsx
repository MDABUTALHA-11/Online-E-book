import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  ExternalLink, 
  Search, 
  Filter, 
  RefreshCw,
  Phone,
  CreditCard,
  User,
  Calendar,
  AlertCircle,
  X,
  Lock
} from 'lucide-react';
import { useToast } from '../components/Toast';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const { showToast } = useToast();

  const ADMIN_PASSWORD = "shaiflyadmin"; // Simple password for now

  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(collection(db, 'payments'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const p = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPayments(p);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      showToast('লগইন সফল হয়েছে!', 'success');
    } else {
      showToast('ভুল পাসওয়ার্ড!', 'error');
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'payments', id), {
        status: newStatus
      });
      showToast(`স্ট্যাটাস ${newStatus} করা হয়েছে`, 'success');
    } catch (error) {
      showToast('আপডেট করতে ব্যর্থ হয়েছে', 'error');
    }
  };

  const deletePayment = async (id) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এটি ডিলিট করতে চান?')) {
      try {
        await deleteDoc(doc(db, 'payments', id));
        showToast('পেমেন্ট রিকোয়েস্ট ডিলিট করা হয়েছে', 'success');
      } catch (error) {
        showToast('ডিলিট করতে ব্যর্থ হয়েছে', 'error');
      }
    }
  };

  const filteredPayments = payments.filter(p => {
    const matchesSearch = 
      p.userPhone?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.tid?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.userName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || p.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--bg-app)' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 md:p-12 rounded-[2.5rem] bg-[var(--bg-surface)] border border-[var(--bg-border)] shadow-2xl text-center"
        >
          <div className="w-20 h-20 bg-[#22C55E]/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-[#22C55E]/20">
             <Lock className="w-10 h-10 text-[#22C55E]" />
          </div>
          <h1 className="text-3xl font-bn font-black text-white mb-4 italic">এডমিন লগইন</h1>
          <p className="text-slate-400 font-bn italic mb-8">পেমেন্ট ম্যানেজমেন্ট ড্যাশবোর্ডে প্রবেশ করতে পাসওয়ার্ড দিন।</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
             <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="password" 
                  placeholder="পাসওয়ার্ড দিন..."
                  className="w-full h-16 pl-14 pr-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--bg-border)] text-white outline-none focus:border-[#22C55E]/40 transition-all font-en font-black italic"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
             </div>
             <button className="w-full h-16 bg-[#22C55E] text-white rounded-2xl font-bn font-black italic text-xl shadow-lg shadow-[#22C55E]/20 flex items-center justify-center gap-3">
                প্রবেশ করুন <ExternalLink className="w-5 h-5" />
             </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-40 pt-10">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
           <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22C55E]/10 text-[#22C55E] text-[10px] font-black uppercase tracking-widest mb-4 border border-[#22C55E]/20">
                 <ShieldCheck className="w-3.5 h-3.5" /> Admin Panel
              </div>
              <h1 className="text-4xl md:text-6xl font-bn font-black text-white italic tracking-tighter">
                পেমেন্ট <span className="text-[#22C55E]">ম্যানেজমেন্ট</span>
              </h1>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="bg-[var(--bg-surface)] border border-[var(--bg-border)] p-4 rounded-2xl flex flex-col items-center min-w-[120px]">
                 <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1 font-en">Total</span>
                 <span className="text-2xl font-en font-black text-white">{payments.length}</span>
              </div>
              <div className="bg-[var(--bg-surface)] border border-[var(--bg-border)] p-4 rounded-2xl flex flex-col items-center min-w-[120px]">
                 <span className="text-[#22C55E] text-[10px] font-black uppercase tracking-widest mb-1 font-en">Pending</span>
                 <span className="text-2xl font-en font-black text-[#22C55E]">{payments.filter(p => p.status === 'pending').length}</span>
              </div>
           </div>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
           <div className="lg:col-span-2 relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-500 group-focus-within:text-[#22C55E] transition-colors" />
              <input 
                type="text" 
                placeholder="নাম, ট্রানজেকশন আইডি বা নম্বর দিয়ে খুঁজুন..." 
                className="w-full h-16 pl-16 pr-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--bg-border)] text-white italic font-bn font-black outline-none focus:border-[#22C55E]/40 transition-all"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
           </div>
           <div className="flex gap-4">
              <div className="flex-1 relative">
                 <Filter className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                 <select 
                   value={filterStatus}
                   onChange={e => setFilterStatus(e.target.value)}
                   className="w-full h-16 pl-14 pr-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--bg-border)] text-white font-bn font-black italic outline-none cursor-pointer appearance-none"
                 >
                    <option value="all">সব পেমেন্ট</option>
                    <option value="pending">পেন্ডিং</option>
                    <option value="completed">সফল</option>
                    <option value="rejected">বাতিল</option>
                 </select>
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="w-16 h-16 rounded-3xl bg-[var(--bg-surface)] border border-[var(--bg-border)] flex items-center justify-center text-slate-500 hover:text-white hover:bg-[var(--bg-border)] transition-all"
              >
                 <RefreshCw className="w-6 h-6" />
              </button>
           </div>
        </div>

        {/* Payments List */}
        <div className="grid grid-cols-1 gap-6">
           {loading ? (
             <div className="py-20 text-center">
                <div className="w-12 h-12 border-4 border-[var(--bg-border)] border-t-[#22C55E] rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-500 font-bn font-black italic">লোড হচ্ছে...</p>
             </div>
           ) : filteredPayments.length > 0 ? (
             filteredPayments.map((p) => (
               <motion.div 
                 key={p.id}
                 layout
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="p-8 md:p-10 rounded-[3rem] bg-[var(--bg-surface)] border border-[var(--bg-border)] relative overflow-hidden group hover:border-[#22C55E]/30 transition-all"
               >
                 {/* Status Badge */}
                 <div className={`absolute top-0 right-0 px-8 py-3 rounded-bl-[2rem] text-[10px] font-black uppercase tracking-widest font-en shadow-xl ${
                   p.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-l border-b border-amber-500/20' : 
                   p.status === 'completed' ? 'bg-[#22C55E]/10 text-[#22C55E] border-l border-b border-[#22C55E]/20' : 
                   'bg-red-500/10 text-red-500 border-l border-b border-red-500/20'
                 }`}>
                     {p.status}
                 </div>

                 <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* User Info */}
                    <div className="flex items-start gap-5">
                       <div className="w-14 h-14 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--bg-border)] flex items-center justify-center text-[#22C55E] shrink-0">
                          <User className="w-7 h-7" />
                       </div>
                       <div>
                          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1 font-en">Student</p>
                          <h3 className="text-xl font-bn font-black italic text-white leading-tight mb-1">{p.userName}</h3>
                          <p className="text-slate-400 font-en font-bold text-[12px]">{p.userEmail}</p>
                       </div>
                    </div>

                    {/* Payment Info */}
                    <div className="flex items-start gap-5">
                       <div className="w-14 h-14 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--bg-border)] flex items-center justify-center text-[#22C55E] shrink-0">
                          <CreditCard className="w-7 h-7" />
                       </div>
                       <div>
                          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1 font-en">Payment Details</p>
                          <h3 className="text-xl font-en font-black italic text-white leading-tight mb-1">{p.tid}</h3>
                          <p className="text-slate-400 font-bn font-bold text-[14px] italic">{p.planName} — {p.amount}</p>
                          {p.studentProblem && (
                            <div className="mt-4 p-4 rounded-xl bg-[#22C55E]/5 border border-[#22C55E]/10">
                               <p className="text-[#22C55E] text-[10px] font-black uppercase tracking-widest mb-2 font-en">Student Problem:</p>
                               <p className="text-white font-bn italic text-[14px] leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">{p.studentProblem}</p>
                            </div>
                          )}
                       </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex items-start gap-5">
                       <div className="w-14 h-14 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--bg-border)] flex items-center justify-center text-[#22C55E] shrink-0">
                          <Phone className="w-7 h-7" />
                       </div>
                       <div>
                          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1 font-en">bKash Number</p>
                          <h3 className="text-xl font-en font-black italic text-white leading-tight mb-1">{p.userPhone}</h3>
                          <p className="text-slate-400 font-bn font-bold text-[14px] italic">
                             {p.createdAt?.toDate ? new Date(p.createdAt.toDate()).toLocaleString('bn-BD') : 'N/A'}
                          </p>
                       </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center lg:justify-end gap-3">
                       {p.status === 'pending' && (
                         <button 
                           onClick={() => updateStatus(p.id, 'completed')}
                           className="h-14 px-6 rounded-2xl bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 hover:bg-[#22C55E] hover:text-white transition-all flex items-center gap-2 font-bn font-black italic"
                         >
                            <CheckCircle2 className="w-5 h-5" /> Approve
                         </button>
                       )}
                       <button 
                         onClick={() => deletePayment(p.id)}
                         className="h-14 w-14 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center"
                       >
                          <Trash2 className="w-5 h-5" />
                       </button>
                    </div>
                 </div>
               </motion.div>
             ))
           ) : (
             <div className="py-32 text-center bg-[var(--bg-surface)] border border-[var(--bg-border)] rounded-[3rem] border-dashed">
                <AlertCircle className="w-16 h-16 text-slate-500 mx-auto mb-6 opacity-20" />
                <h3 className="text-3xl font-bn font-black text-slate-600 italic">কোনো পেমেন্ট রেকর্ড পাওয়া যায়নি</h3>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;

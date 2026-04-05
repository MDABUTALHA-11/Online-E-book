import React from 'react';
import usePageSEO from '../hooks/usePageSEO';

const Terms = () => {
  usePageSEO({
    title: 'Terms & Conditions — Shaifly Library',
    description: 'শাইফলির ব্যবহারবিধি এবং শর্তাবলী।',
  });

  return (
    <div className="pt-24 pb-40 min-h-screen text-[#f1f5f9]">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bn font-black mb-10 italic">শর্তাবলী ও <span className="text-[#22C55E]">ব্যবহারবিধি</span></h1>
        
        <div className="space-y-12 font-bn text-[17px] leading-relaxed text-slate-400">
          <section>
            <h2 className="text-2xl text-white font-black mb-4">১. সঠিক তথ্য প্রদান</h2>
            <p>প্রোফাইল তৈরি বা কন্টেন্ট ব্যবহারের সময় আপনাকে সঠিক ও পূর্ণাঙ্গ তথ্য প্রদান করতে হবে। কোনো ভুয়া তথ্য প্রদান করলে আপনার প্রোফাইল বাতিল হতে পারে।</p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-black mb-4">২. কন্টেন্টের সদ্ব্যবহার</h2>
            <p>শাইফলির কন্টেন্টগুলো শুধুমাত্র ব্যক্তিগত শিক্ষার উদ্দেশ্যে ডিজাইন করা হয়েছে। এখানে থাকা কপিরাইটেড ম্যাটেরিয়াল কোনো বাণিজ্যিক কাজে ব্যবহার করা কঠোরভাবে নিষিদ্ধ।</p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-black mb-4">৩. কুইজ ও লিডারবোর্ড</h2>
            <p>কুইজে কোনো প্রকার অসদুপায় অবলম্বন করা যাবে না। যদি কৃত্রিম বুদ্ধিমত্তা বা রোবট ব্যবহার করার প্রমাণ পাওয়া যায় তবে ইউজারের আইপি অ্যাড্রেস ব্যান করা হবে।</p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-black mb-4">৪. পরিবর্তনের ক্ষমতা</h2>
            <p>শাইফলি যেকোনো সময় তার ফি এবং শর্তাবলী পরিবর্তন করার নূন্যতম অধিকার রাখে। আমরা কোনো পরিবর্তন করার আগে অবশ্যই ইউজারদের ইমেইল বা আমাদের প্ল্যাটফর্মে জানাবো।</p>
          </section>

          <p className="pt-10 border-t border-white/10 text-sm italic">সর্বশেষ আপডেট: ২রা এপ্রিল, ২০২৬</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;

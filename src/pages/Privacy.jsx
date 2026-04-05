import React from 'react';
import usePageSEO from '../hooks/usePageSEO';

const Privacy = () => {
  usePageSEO({
    title: 'Privacy Policy — Shaifly Library',
    description: 'শাইফলির গোপনীয়তা নীতি। আমরা আপনার তথ্যের সুরক্ষা নিশ্চিত করি।',
  });

  return (
    <div className="pt-24 pb-40 min-h-screen text-[#f1f5f9]">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bn font-black mb-10 italic">গোপনীয়তা <span className="text-[#22C55E]">নীতি</span></h1>
        
        <div className="space-y-12 font-bn text-[17px] leading-relaxed text-slate-400">
          <section>
            <h2 className="text-2xl text-white font-black mb-4">১. তথ্য সংগ্রহ</h2>
            <p>শাইফলি (Shaifly) শিক্ষার্থীদের কোনো ব্যক্তিগত তথ্য যা অপ্রয়োজনীয় তা সংগ্রহ করে না। শুধুমাত্র কুইজ এবং লিডারবোর্ডের জন্য প্রোফাইল তৈরির সময় নাম ও স্কুলের নাম সংগ্রহ করা হয়।</p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-black mb-4">২. গুগল অ্যাডসেন্স (Google AdSense)</h2>
            <p>আমাদের সাইটে বিজ্ঞাপনের জন্য গুগল অ্যাডসেন্স ব্যবহার করা হয়। গুগল আপনার ব্রাউজারে কুকিজ (Cookies) সেট করতে পারে যার মাধ্যমে তারা আপনার আগ্রহ অনুযায়ী বিজ্ঞাপন প্রদর্শন করবে।</p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-black mb-4">৩. তথ্যের ব্যবহার</h2>
            <p>সংগৃহীত তথ্যগুলো শুধুমাত্র ইউজারের অভিজ্ঞতা উন্নয়নের জন্য এবং লিডারবোর্ডে তাদের র‍্যাঙ্কিং প্রদর্শনের জন্য ব্যবহার করা হয়। আমরা কোনো তথ্য তৃতীয় পক্ষের কাছে বিক্রি করি না।</p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-black mb-4">৪. নিরাপত্তা</h2>
            <p>আপনার তথ্যের নিরাপত্তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। আমরা উচ্চমানের ডিজিটাল নিরাপত্তা ব্যবস্থা ব্যবহার করি যাতে আপনার তথ্য সুরক্ষিত থাকে।</p>
          </section>

          <p className="pt-10 border-t border-white/10 text-sm italic">সর্বশেষ আপডেট: ২রা এপ্রিল, ২০২৬</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

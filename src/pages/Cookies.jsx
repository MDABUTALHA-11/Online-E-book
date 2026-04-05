import React from 'react';
import usePageSEO from '../hooks/usePageSEO';

const Cookies = () => {
  usePageSEO({
    title: 'Cookie Policy — Shaifly Library',
    description: 'শাইফলির কুকিজ ব্যবহারের নীতি।',
  });

  return (
    <div className="pt-24 pb-40 min-h-screen text-[#f1f5f9]">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bn font-black mb-10 italic">কুকিজ <span className="text-[#22C55E]">নীতি</span></h1>
        
        <div className="space-y-12 font-bn text-[17px] leading-relaxed text-slate-400">
          <section>
            <h2 className="text-2xl text-white font-black mb-4">১. কুকিজ কী?</h2>
            <p>কুকিজ হলো ছোট ছোট টেক্সট ফাইল যা ওয়েবসাইট ব্রাউজ করার সময় ব্রাউজার স্বয়ংক্রিয়ভাবে আপনার ডিভাইসে সেট করে। এর মাধ্যমে ওয়েবসাইট আপনাকে পরবর্তী ভিজিটে চিনতে পারে।</p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-black mb-4">২. আমরা কেন কুকিজ ব্যবহার করি?</h2>
            <p>শাইফলিতে লগ ইন স্ট্যাটাস বজায় রাখা, ডার্ক মোড এবং আপনার কুইজ স্কোর সংরক্ষণ করার জন্য কুকিজ ব্যবহার করা হয়। এর মাধ্যমে আপনার ব্রাউজিং অভিজ্ঞতা আরও দ্রুত ও মসৃণ হয়।</p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-black mb-4">৩. থার্ড-পার্টি কুকিজ ও অ্যাডসেন্স</h2>
            <p>আমাদের সাইট গুগল অ্যাডসেন্স (Google AdSense) বিজ্ঞাপন পরিবেশক হিসেবে থার্ড-পার্টি কুকিজ ব্যবহার করে। আপনি আপনার ব্রাউজার সেটিংস থেকে এটি নিয়ন্ত্রণ করতে পারেন।</p>
          </section>

          <section>
            <h2 className="text-2xl text-white font-black mb-4">৪. নিয়ন্ত্রণ</h2>
            <p>বেশিরভাগ ব্রাউজারেই কুকিজ গ্রহণের অপশন অটোমেটিকালি চালু থাকে। তবে আপনি চাইলে কুকিজ ডিলিট বা ডিজেবল করতে পারেন, তবে এর ফলে আমাদের কিছু ফিচার ঠিকমতো কাজ নাও করতে পারে।</p>
          </section>

          <p className="pt-10 border-t border-white/10 text-sm italic">সর্বশেষ আপডেট: ২রা এপ্রিল, ২০২৬</p>
        </div>
      </div>
    </div>
  );
};

export default Cookies;

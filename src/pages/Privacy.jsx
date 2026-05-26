import React from 'react';
import usePageSEO from '../hooks/usePageSEO';

const Privacy = () => {
  usePageSEO({
    title: 'Privacy Policy — Shaifly Library',
    description: 'শাইফলির গোপনীয়তা নীতি। আমরা আপনার তথ্যের সুরক্ষা নিশ্চিত করি।',
  });

  return (
    <div className="pt-24 pb-40 min-h-screen text-slate-800">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bn font-black mb-10 text-[#0F172A] italic">
          গোপনীয়তা <span style={{ color: '#F97316' }}>নীতি</span>
        </h1>
        
        <div className="space-y-12 font-bn text-[17px] leading-relaxed text-slate-600 text-justify">
          <section>
            <p>আমাদের ওয়েবসাইট (Shaifly Library) ব্যবহার করার সময় আপনি যে তথ্যগুলো প্রদান করেন, তার সুরক্ষা নিশ্চিত করা আমাদের প্রধান দায়িত্ব। এই গোপনীয়তা নীতিমালায় আমরা বর্ণনা করেছি যে কীভাবে আমরা আপনার তথ্য সংগ্রহ করি, কেন করি এবং কীভাবে তা সুরক্ষিত রাখি।</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-black mb-4">১. তথ্য সংগ্রহ ও ব্যবহার</h2>
            <p>আমাদের সাইট ব্যবহারের সময় আমরা সাধারণত নিচের তথ্যগুলো সংগ্রহ করি:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>লগ ফাইলস: আমরা আইপি (IP) অ্যাড্রেস, ব্রাউজারের ধরণ এবং ভিজিটের সময় ট্র্যাক করি যা সাইট অ্যানালিটিক্সের জন্য ব্যবহৃত হয়।</li>
              <li>ইউজার প্রোফাইল: কুইজ লিডারবোর্ড ব্যবহারের জন্য আমরা আপনার নাম এবং স্কুল/কলেজের নাম সংগ্রহ করি।</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-black mb-4">২. গুগল অ্যাডসেন্স ও কুকিজ (Google AdSense & Cookies)</h2>
            <p>আমাদের ওয়েবসাইট গুগল অ্যাডসেন্স (Google AdSense) বিজ্ঞাপন পরিবেশন করে। গুগল তার বিজ্ঞাপনগুলো উন্নত করতে এবং ইউজারের আগ্রহ বুঝতে কুকিজ (Cookies) ব্যবহার করতে পারে।</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>গুগল ডার্ট (DART) কুকি ব্যবহার করে আপনার আগের ভিজিটের ওপর ভিত্তি করে বিজ্ঞাপন প্রদর্শন করে।</li>
              <li>আপনি চাইলে গুগলের বিজ্ঞাপন এবং কন্টেন্ট নেটওয়ার্কের গোপনীয়তা নীতিতে গিয়ে ডার্ট কুকি ব্যবহার বন্ধ করতে পারেন।</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-black mb-4">৩. থার্ড পার্টি প্রাইভেসি পলিসি</h2>
            <p>শাইফলির গোপনীয়তা নীতি অন্য কোনো বিজ্ঞাপনদাতা বা ওয়েবসাইটের ক্ষেত্রে প্রযোজ্য নয়। আমরা আপনাকে পরামর্শ দিচ্ছি যে কোনো তৃতীয় পক্ষ বা বিজ্ঞাপনদাতার সাইটে যাওয়ার আগে তাদের নিজস্ব গোপনীয়তা নীতি পড়ে নিন।</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-black mb-4">৪. শিশুদের তথ্য সুরক্ষা (Children's Information)</h2>
            <p>ইন্টারনেট ব্যবহারের সময় শিশুদের সুরক্ষা নিশ্চিত করা আমাদের অন্যতম লক্ষ্য। আমরা ১৩ বছরের কম বয়সী শিশুদের থেকে জেনেশুনা কোনো ব্যক্তিগত তথ্য সংগ্রহ করি না। যদি আপনি মনে করেন আপনার সন্তান আমাদের সাইটে এমন কোনো তথ্য দিয়েছে, তবে অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন। আমরা তা সাথে সাথে অপসারণ করব।</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-black mb-4">৫. নীতিমালায় পরিবর্তন</h2>
            <p>আমরা যেকোনো সময়ে এই গোপনীয়তা নীতিমালায় পরিবর্তন আনতে পারি। বড় কোনো পরিবর্তন করা হলে আমরা সাইটের নোটিশ বোর্ডে বা প্রোফাইল নোটিফিকেশনে জানাবো।</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-black mb-4">৬. যোগাযোগ</h2>
            <p>আমাদের গোপনীয়তা নীতি নিয়ে কোনো প্রশ্ন থাকলে সরাসরি আমাদের ইমেইল করতে পারেন।</p>
          </section>

          <p className="pt-10 border-t border-[var(--bg-border)] text-sm italic text-slate-500">সর্বশেষ আপডেট: ১৭ই এপ্রিল, ২০২৬</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

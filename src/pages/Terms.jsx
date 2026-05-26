import React from 'react';
import usePageSEO from '../hooks/usePageSEO';

const Terms = () => {
  usePageSEO({
    title: 'Terms & Conditions — Shaifly Library',
    description: 'শাইফলির ব্যবহারবিধি এবং শর্তাবলী।',
  });

  return (
    <div className="pt-24 pb-40 min-h-screen text-slate-800">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bn font-black mb-10 text-[#0F172A] italic">
          শর্তাবলী ও <span style={{ color: '#F97316' }}>ব্যবহারবিধি</span>
        </h1>
        
        <div className="space-y-12 font-bn text-[17px] leading-relaxed text-slate-600 text-justify">
          <section>
            <p>শাইফলি লাইব্রেরি (Shaifly Library) ওয়েবসাইটটি ব্যবহার করার মাধ্যমে আপনি নিচের শর্তাবলী মেনে নিতে সম্মত হচ্ছেন। যদি আপনি এই শর্তগুলোর কোনোটির সাথে একমত না হন, তবে দয়া করে সাইটটি ব্যবহার করা থেকে বিরত থাকুন।</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-black mb-4">১. সঠিক তথ্য প্রদান</h2>
            <p>রেজিস্ট্রেশনের সময় আপনাকে অবশ্যই বৈধ ইমেইল এবং সঠিক তথ্য প্রদান করতে হবে। একাধিক অ্যাকাউন্ট তৈরি করা বা অন্যের তথ্য ব্যবহার করা আইনত দণ্ডনীয় এবং এর ফলে আপনার প্রোফাইল স্থায়ীভাবে বাতিল হতে পারে।</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-black mb-4">২. মেধা সম্পদ ও কপিরাইট (Intellectual Property)</h2>
            <p>এই ওয়েবসাইটে থাকা সকল হ্যান্ডনোট, ডিজাইন, লোগো এবং টেক্সট শাইফলির নিজস্ব সম্পদ। অনুমতি ছাড়া কোনো কন্টেন্ট বাণিজ্যিক উদ্দেশ্যে উদ্দেশ্য অন্য কোথাও কপি, রি-আপলোড বা বিক্রি করা কঠোরভাবে নিষিদ্ধ। শুধুমাত্র ব্যক্তিগত পড়াশোনার জন্য আপনি আমাদের রিসোর্সগুলো ব্যবহার করতে পারেন।</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-black mb-4">৩. কুইজ ও ফেয়ার প্লে</h2>
            <p>কুইজ এবং লিডারবোর্ডে সুস্থ প্রতিযোগিতা বজায় রাখা আমাদের লক্ষ্য। যদি কোনো ইউজার স্ক্রিপ্টিং, হ্যাকিং বা অন্য কোনো অবৈধ উপায়ে কুইজে অংশ নেয়, তবে আমরা সাথে সাথে তার সাবস্ক্রিপশন বাতিল এবং আইপি ব্যান করার অধিকার রাখি।</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-black mb-4">৪. দায়বদ্ধতা (Disclaimer)</h2>
            <p>আমরা সবসময় সঠিক তথ্য দেওয়ার চেষ্টা করি, তবে কোনো অনাকাঙ্ক্ষিত ভুল বা তথ্যের বিচ্যুতি ঘটলে শাইফলি কর্তৃপক্ষ দায়ী থাকবে না। আমরা যেকোনো সময়ে সাইটের কন্টেন্ট পরিবর্তন বা পরিমার্জন করতে পারি।</p>
          </section>

          <section>
            <h2 className="text-2xl text-[#0F172A] font-black mb-4">৫. অ্যাকাউন্টের নিরাপত্তা</h2>
            <p>আপনার প্রোফাইলের পাসওয়ার্ড এবং লগইন তথ্যের গোপনীয়তা রক্ষা করা আপনার নিজের দায়িত্ব। আপনার অ্যাকাউন্ট থেকে কোনো অননুমোদিত কাজ সম্পন্ন হলে কর্তৃপক্ষ দায়ী থাকবে না।</p>
          </section>

          <p className="pt-10 border-t border-[var(--bg-border)] text-sm italic text-slate-500">সর্বশেষ আপডেট: ১৭ই এপ্রিল, ২০২৬</p>
        </div>
      </div>
    </div>
  );
};

export default Terms;

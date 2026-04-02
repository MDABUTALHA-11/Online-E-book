import React, { useEffect } from 'react';

/**
 * Reusable Google AdSense Component
 * @param {string} slot - The ad slot ID from Google AdSense dashboard
 * @param {string} format - The format of the ad (e.g., 'auto', 'fluid')
 * @param {boolean} responsive - Whether the ad should be responsive
 */
const GoogleAd = ({ slot, format = 'auto', responsive = 'true' }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className="w-full my-8 flex justify-center overflow-hidden min-h-[90px] bg-white/5 rounded-xl border border-white/10">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-9116809033361281"
        data-ad-slot={slot || "YOUR_AD_SLOT_ID"}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};

export default GoogleAd;

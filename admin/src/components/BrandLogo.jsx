import React from 'react';

function BrandLogo({ className = "w-8 h-8", textClassName = "text-xl", dark = false }) {
  return (
    <div className="flex items-center gap-2.5 select-none cursor-pointer">
      <svg
        className={`${className}`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
        </defs>
        <path
          d="M50 5C68 5 85 12 90 30C92 58 75 82 50 95C25 82 8 58 10 30C15 12 32 5 50 5Z"
          fill="url(#logo-grad)"
        />
        <path
          d="M50 12C64 12 76 17 80 30C82 52 68 72 50 82C32 72 18 52 20 30C24 17 36 12 50 12Z"
          fill="#ffffff"
          opacity="0.15"
        />
        <rect x="42" y="25" width="16" height="50" rx="5" fill="#ffffff" />
        <rect x="25" y="42" width="50" height="16" rx="5" fill="#ffffff" />
      </svg>

      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight ${textClassName} ${dark ? 'text-white' : 'text-[#0f172a]'}`}>
            Alaukik<span className="text-[#3b82f6]">HMS</span>
          </span>
          <span className="bg-[#eff6ff] text-[#1e40af] border border-[#dbeafe] text-[9px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
            Software
          </span>
        </div>
      </div>
    </div>
  );
}

export default BrandLogo;

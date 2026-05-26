import React from "react";
import { Link } from "react-router-dom";
import BrandLogo from "./BrandLogo";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 text-slate-500 mt-5">

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14 grid grid-cols-1 md:grid-cols-12 gap-10">

        {/* LEFT - Logo + About */}
        <div className="md:col-span-5 space-y-4">
          <BrandLogo className="w-8 h-8" textClassName="text-lg md:text-xl" />
          <p className="text-sm leading-6 max-w-sm">
            Alaukik HMS is a state-of-the-art hospital management suite designed to streamline healthcare workflows, digitize records, and connect patients with trusted clinical specialists instantly.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-3.5 pt-2">
            <a href="#" className="w-8 h-8 rounded-full bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-[#1e40af] flex items-center justify-center border border-slate-100 transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-50 hover:bg-sky-50 text-slate-400 hover:text-sky-500 flex items-center justify-center border border-slate-100 transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-50 hover:bg-pink-50 text-slate-400 hover:text-pink-500 flex items-center justify-center border border-slate-100 transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
          </div>
        </div>

        {/* MIDDLE - Company */}
        <div className="md:col-span-3">
          <h3 className="text-slate-900 font-bold text-sm tracking-wider uppercase mb-4">
            Company
          </h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-[#1e40af] transition-all">Home</Link></li>
            <li><Link to="/about" className="hover:text-[#1e40af] transition-all">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-[#1e40af] transition-all">Contact Us</Link></li>
            <li><Link to="#" className="hover:text-[#1e40af] transition-all">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* RIGHT - Contact */}
        <div className="md:col-span-4">
          <h3 className="text-slate-900 font-bold text-sm tracking-wider uppercase mb-4">
            Get in Touch
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#1e40af]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-4 h-4 text-[#1e40af]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              <span className="break-all">support@alaukikhms.com</span>
            </li>
            <li className="flex items-center gap-2 text-slate-500">
              <svg className="w-4 h-4 text-[#1e40af] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <span>12, Healthcare Boulevard, Tech City, India</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Divider */}
      <div className="border-t border-slate-100"></div>

      {/* Bottom */}
      <div className="text-center py-6 text-xs text-slate-400 font-medium">
        Copyright © 2026 Alaukik HMS - All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;
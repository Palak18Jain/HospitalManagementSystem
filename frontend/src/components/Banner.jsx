import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();

  const handleCTA = () => {
    navigate("/doctors");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="py-20 px-5 md:px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: Why Choose Us */}
        <div className="lg:col-span-4 flex flex-col justify-center bg-white border border-slate-100 p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300">
          <p className="text-xs md:text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">
            Why Choose Us
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            We Provide The Best Healthcare Services
          </h2>
          <p className="text-slate-500 mt-4 text-sm leading-relaxed font-medium">
            Our platform connects you with verified clinical experts and provides tools for an effortless healthcare experience.
          </p>

          {/* Features list */}
          <ul className="mt-6 space-y-3.5">
            {[
              "Highly Experienced Specialists",
              "Instant Real-Time Slots Booking",
              "Secured Medical Records & Privacy",
              "24/7 Online Support Availability"
            ].map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 text-slate-700 text-sm font-semibold">
                <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                {feature}
              </li>
            ))}
          </ul>

          <button
            onClick={handleCTA}
            className="mt-8 self-start bg-blue-600 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 inline-flex items-center gap-2 group"
          >
            Find Doctors
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* CENTER COLUMN: Promo Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 md:p-10 flex flex-col justify-between text-white shadow-xl relative overflow-hidden group">
          {/* Subtle light effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-12 translate-x-12 group-hover:bg-white/15 transition-colors duration-500" />
          
          <div>
            <span className="inline-block bg-white/10 border border-white/20 text-xs font-bold px-3 py-1 rounded-full mb-6 uppercase tracking-wider">
              Health Partner
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold leading-tight tracking-tight">
              Take Care Of Your <br className="hidden sm:inline" /> Health Today!
            </h2>
            <p className="text-blue-100/90 mt-4 text-sm md:text-base leading-relaxed font-medium max-w-sm">
              Connect with 100+ trusted clinical practitioners from the comfort of your home.
            </p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 relative z-10">
            <button
              onClick={() => {
                navigate("/register");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50 font-bold text-sm px-6 py-3.5 rounded-xl hover:shadow-lg transition-all duration-300 text-center"
            >
              Get Started Now
            </button>
            <div className="flex items-center gap-3">
              <img src={assets.group_profiles} alt="Users" className="h-9 object-contain" />
              <span className="text-xs font-bold text-blue-100">12k+ Active Users</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Testimonial & Rating */}
        <div className="lg:col-span-3 flex flex-col justify-between bg-slate-900 text-white p-8 md:p-10 rounded-3xl shadow-xl relative overflow-hidden group">
          {/* Background medical grid pattern */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          <div>
            <div className="flex items-center gap-1 text-amber-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            
            <p className="text-lg font-bold text-slate-100 tracking-tight leading-snug">
              "Highly Recommended!"
            </p>
            
            <p className="text-slate-400 mt-3 text-xs md:text-sm leading-relaxed font-medium italic">
              "The service is outstanding. Booking an appointment was extremely simple, and the doctor was highly professional. Best clinical portal I've ever used."
            </p>
          </div>

          <div className="mt-8 border-t border-slate-800 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-200">Patient Satisfaction</p>
                <p className="text-slate-400 text-xs mt-0.5">Based on 12k+ reviews</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-blue-400">4.8</span>
                <span className="text-slate-500 font-bold text-xs">/5.0</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Banner;
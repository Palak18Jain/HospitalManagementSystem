import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const specialitiesMeta = {
  "General physician": {
    bg: "bg-teal-50/60 border border-teal-100/40",
    iconBg: "bg-teal-100/80 text-teal-700",
    desc: "Comprehensive Primary & Preventive Care"
  },
  "Gynecologist": {
    bg: "bg-pink-50/60 border border-pink-100/40",
    iconBg: "bg-pink-100/80 text-pink-700",
    desc: "Women's Reproductive & Maternal Health"
  },
  "Dermatologist": {
    bg: "bg-orange-50/60 border border-orange-100/40",
    iconBg: "bg-orange-100/80 text-orange-700",
    desc: "Skin, Hair, Nail & Aesthetic Treatment"
  },
  "Pediatricians": {
    bg: "bg-cyan-50/60 border border-cyan-100/40",
    iconBg: "bg-cyan-100/80 text-cyan-700",
    desc: "Infant, Child & Adolescent Healthcare"
  },
  "Neurologist": {
    bg: "bg-purple-50/60 border border-purple-100/40",
    iconBg: "bg-purple-100/80 text-purple-700",
    desc: "Brain, Spine & Nervous System Care"
  },
  "Gastroenterologist": {
    bg: "bg-amber-50/60 border border-amber-100/40",
    iconBg: "bg-amber-100/80 text-amber-700",
    desc: "Digestive Tract & Hepatology Care"
  }
};

function SpecialityMenu() {
  return (
    <div id="speciality" className="py-16 px-5 md:px-10 max-w-7xl mx-auto">
      
      {/* Sub-label */}
      <p className="text-center text-xs md:text-sm font-bold text-[#1e40af] uppercase tracking-widest mb-2">
        Our Specialties
      </p>

      {/* Heading */}
      <h2 className="text-center text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
        Explore Top Specialties
      </h2>

      {/* Subtitle */}
      <p className="text-center text-slate-500 mt-3 max-w-xl mx-auto font-medium text-sm md:text-[15px]">
        Find the right specialist for your health concerns and get premium clinical advice instantly.
      </p>

      {/* Cards Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        
        {specialityData.map((item, index) => {
          const meta = specialitiesMeta[item.speciality] || {
            bg: "bg-slate-50 border border-slate-100",
            iconBg: "bg-slate-100 text-slate-700",
            desc: "Quality clinical care & consultations"
          };

          return (
            <Link
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              to={`/doctors/${item.speciality}`}
              key={index}
              className={`${meta.bg} p-6 rounded-2xl flex flex-col items-center hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer text-center`}
            >
              {/* Icon Container */}
              <div className={`${meta.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-105 shadow-inner`}>
                <img
                  src={item.image}
                  alt={item.speciality}
                  className="w-8 h-8 object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="font-bold text-slate-800 text-base mb-1 group-hover:text-[#1e40af] transition-colors leading-tight">
                {item.speciality === "General physician" ? "General Care" : item.speciality}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-[11px] leading-relaxed mb-4 grow font-medium">
                {meta.desc}
              </p>

              {/* Action Link */}
              <span className="text-xs font-bold text-[#1e40af] inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform duration-200">
                View Doctors
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>

            </Link>
          );
        })}

      </div>

    </div>
  );
}

export default SpecialityMenu;
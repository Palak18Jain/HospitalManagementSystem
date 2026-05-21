import React from "react";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Find Your Doctor",
      desc: "Search through our database of highly qualified and verified healthcare professionals by specialty, name, or location.",
      icon: (
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      badgeColor: "bg-blue-50 text-blue-600 border-blue-100",
      hoverShadow: "hover:shadow-blue-100"
    },
    {
      number: "02",
      title: "Choose Date & Time",
      desc: "Select a date and time slot that fits your busy schedule. View doctor availability in real-time instantly.",
      icon: (
        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      badgeColor: "bg-indigo-50 text-indigo-600 border-indigo-100",
      hoverShadow: "hover:shadow-indigo-100"
    },
    {
      number: "03",
      title: "Book Appointment",
      desc: "Confirm your appointment booking securely in a single click. Receive instant notifications and reminders.",
      icon: (
        <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      badgeColor: "bg-teal-50 text-teal-600 border-teal-100",
      hoverShadow: "hover:shadow-teal-100"
    }
  ];

  return (
    <section className="py-20 px-5 md:px-10 bg-slate-50/50 border-y border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs md:text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">
            Simple Process
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Book Appointment in 3 Easy Steps
          </h2>
          <p className="text-slate-500 mt-3 font-medium text-sm md:text-[15px]">
            We've simplified the medical consultation process. Get connected to top doctors in under two minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-blue-100 via-indigo-100 to-teal-100 -translate-y-12 -z-10" />

          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`bg-white border border-slate-100 p-8 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-xl transition-all duration-300 group ${step.hoverShadow} hover:-translate-y-1`}
            >
              {/* Step number badge */}
              <div className={`text-xs font-extrabold px-3 py-1 rounded-full border ${step.badgeColor} mb-6 tracking-wider`}>
                STEP {step.number}
              </div>

              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

export default HowItWorks;

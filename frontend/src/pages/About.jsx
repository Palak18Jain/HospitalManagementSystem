import React from "react";
import { assets } from "../assets/assets";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

function About() {
  return (
    <>  
      <Navbar />

      <div className="bg-slate-50/30 py-16 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">

          {/* TOP SECTION: Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs md:text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">
              Our Mission
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              About Alaukik HMS
            </h2>
            <p className="text-slate-500 mt-3 font-medium text-sm md:text-[15px]">
              Empowering clinics, doctors, and patients with an integrated, intelligent healthcare management suite.
            </p>
          </div>

          {/* MIDDLE SECTION: Story & Vision */}
          <div className="flex flex-col lg:flex-row gap-12 items-center bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm mb-16">

            {/* LEFT IMAGE */}
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute inset-0 bg-blue-100 rounded-2xl transform translate-x-3 translate-y-3 -z-10" />
              <img
                src={assets.about_image}
                alt="Doctors collaborating"
                className="rounded-2xl shadow-md w-full h-[320px] md:h-[420px] object-cover hover:scale-[1.01] transition-transform duration-500"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-5">
                Redefining the Clinical Consultation Experience
              </h3>
              
              <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium mb-6">
                Alaukik HMS Software is a comprehensive, state-of-the-art clinical management platform designed to connect patients with top-tier medical specialists seamlessly. We are committed to optimizing administrative workflows, lowering operational overheads, and enhancing the patient journey.
              </p>

              {/* Vision Card */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 p-5 rounded-r-2xl">
                <h4 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-2">
                  Our Vision
                </h4>
                <p className="text-slate-700 text-xs md:text-sm leading-relaxed font-semibold">
                  To build a fully integrated, accessible, and secure digital healthcare ecosystem where every patient receives timely, personalized, and expert clinical consultations without administrative friction.
                </p>
              </div>
            </div>

          </div>

          {/* WHY CHOOSE US SECTION */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs md:text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">
                Core Values
              </p>
              <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Why Choose Our Platform
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* CARD 1: Efficiency */}
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-bold text-slate-800 text-lg mb-3 group-hover:text-blue-600 transition-colors">
                  EFFICIENCY
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  We automate booking, slot configurations, and patient medical files to eliminate manual delays and optimize clinic workflow.
                </p>
              </div>

              {/* CARD 2: Convenience */}
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-slate-800 text-lg mb-3 group-hover:text-emerald-600 transition-colors">
                  CONVENIENCE
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Access certified healthcare providers from the comfort of your home, view real-time slot availability, and schedule instantly.
                </p>
              </div>

              {/* CARD 3: Personalization */}
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 border border-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h4 className="font-bold text-slate-800 text-lg mb-3 group-hover:text-purple-600 transition-colors">
                  PERSONALIZATION
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Receive tailored medical advice, comprehensive records access, and specialized clinical care matching your exact health needs.
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default About;
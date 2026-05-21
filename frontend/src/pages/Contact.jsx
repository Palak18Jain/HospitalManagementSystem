import React from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { assets } from "../assets/assets";

function Contact() {
  return (
    <>
      <Navbar />

      <div className="bg-slate-50/30 py-16 px-4 md:px-10">
        <div className="max-w-6xl mx-auto">

          {/* TOP SECTION: Header */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs md:text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">
              Get In Touch
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Contact Us
            </h2>
            <p className="text-slate-500 mt-3 font-medium text-sm md:text-[15px]">
              Have questions or need assistance? Our support team is here to help you 24/7.
            </p>
          </div>

          {/* MIDDLE SECTION: Info & Image */}
          <div className="flex flex-col lg:flex-row gap-12 items-stretch">

            {/* LEFT SIDE: Image */}
            <div className="w-full lg:w-1/2 relative">
              <div className="absolute inset-0 bg-blue-100 rounded-3xl transform translate-x-3 translate-y-3 -z-10" />
              <img
                src={assets.contact_image}
                alt="Contact representation"
                className="w-full h-full min-h-[350px] object-cover rounded-3xl shadow-md hover:scale-[1.01] transition-transform duration-500"
              />
            </div>

            {/* RIGHT SIDE: Contact Details */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between gap-8">
              
              {/* OFFICE INFO CARD */}
              <div className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm flex-1 flex flex-col justify-center">
                <h4 className="text-lg font-bold text-slate-900 tracking-tight mb-6 uppercase tracking-wider">
                  Our Office
                </h4>
                
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Address</p>
                      <p className="text-slate-700 text-sm font-semibold mt-1 leading-relaxed">
                        54709 Wilms Station <br />
                        Suite 350, Washington, USA
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phone</p>
                      <p className="text-slate-700 text-sm font-semibold mt-1 leading-relaxed">
                        +91 98765 43210
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email</p>
                      <p className="text-slate-700 text-sm font-semibold mt-1 leading-relaxed">
                        support@alaukikhms.com
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* CAREERS CALLOUT */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-6 translate-x-6" />
                
                <h4 className="text-base font-bold text-indigo-300 uppercase tracking-widest mb-2">
                  Careers at Alaukik HMS
                </h4>
                <p className="text-slate-300 text-sm font-medium leading-relaxed max-w-sm mb-6">
                  Join our mission to optimize healthcare administration. Learn more about our teams and current open positions.
                </p>

                <button className="bg-white text-slate-900 hover:bg-slate-50 font-bold text-xs px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300">
                  Explore Openings
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
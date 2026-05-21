import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";

function Header() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const { doctors } = useContext(AppContext);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);

  const SPECIALITIES = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const cleanQuery = searchQuery.trim().toLowerCase();
  const matchedDoctors = cleanQuery 
    ? doctors.filter(doc => doc.name.toLowerCase().includes(cleanQuery)).slice(0, 5)
    : [];
  const matchedSpecialties = cleanQuery
    ? SPECIALITIES.filter(spec => spec.toLowerCase().includes(cleanQuery)).slice(0, 3)
    : [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let url = "/doctors";
    if (searchQuery) {
      url += `?search=${encodeURIComponent(searchQuery)}`;
    }
    setShowSuggestions(false);
    navigate(url);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50/60 via-white to-blue-50/20 rounded-3xl mx-4 md:mx-10 mt-6 px-6 md:px-12 py-10 md:py-16 border border-slate-100 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* LEFT SIDE */}
        <div className="lg:col-span-7 flex flex-col items-start">
          
          {/* Trusted Badge */}
          <div className="inline-flex items-center gap-2.5 bg-[#eff6ff] text-[#1e40af] text-xs font-bold px-4 py-2 rounded-full mb-6 border border-[#dbeafe] shadow-sm">
            <img
              src={assets.group_profiles}
              alt="profiles"
              className="h-5 object-contain"
            />
            <span>Trusted By Thousands</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.12] mb-5 tracking-tight">
            Book Appointment <br />
            with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1e40af] to-[#3b82f6]">Trusted Doctors</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-500 text-sm md:text-base max-w-lg mb-8 leading-relaxed font-medium">
            Find experienced doctors across specialties and book your appointment in just a few clicks. Hassle-free scheduling with premium medical experts.
          </p>

          {/* Search Form Card */}
          <form 
            onSubmit={handleSearch}
            className="bg-white rounded-2xl border border-slate-100 shadow-xl p-2.5 flex flex-col sm:flex-row gap-2.5 items-center w-full max-w-xl"
          >
            {/* Search Input Container */}
            <div ref={containerRef} className="relative w-full sm:flex-1">
              <div className="flex items-center gap-3 bg-slate-50 px-4 py-3.5 rounded-xl border border-slate-100 w-full">
                <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search Doctor, Specialty or Keyword..."
                  className="bg-transparent border-none outline-none text-sm text-slate-800 placeholder-slate-400 w-full font-semibold"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                />
              </div>

              {/* Suggestions Dropdown */}
              {showSuggestions && (matchedDoctors.length > 0 || matchedSpecialties.length > 0) && (
                <div className="absolute top-full left-0 right-0 z-50 bg-white border border-slate-100 rounded-2xl shadow-xl mt-2 overflow-hidden max-h-72 overflow-y-auto">
                  
                  {/* Specialties Section */}
                  {matchedSpecialties.length > 0 && (
                    <div className="p-2 border-b border-slate-50 bg-slate-50/20">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-3 py-1.5 block">
                        Specialties
                      </span>
                      {matchedSpecialties.map((spec) => (
                        <div
                          key={spec}
                          onClick={() => {
                            navigate(`/doctors/${spec}`);
                            setShowSuggestions(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-[#eff6ff] text-slate-700 hover:text-[#1e40af] text-sm font-semibold cursor-pointer transition-colors"
                        >
                          <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          {spec}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Doctors Section */}
                  {matchedDoctors.length > 0 && (
                    <div className="p-2">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider px-3 py-1.5 block">
                        Doctors
                      </span>
                      {matchedDoctors.map((doc) => (
                        <div
                          key={doc.id || doc._id}
                          onClick={() => {
                            navigate(`/appointment/${doc.id || doc._id}`);
                            setShowSuggestions(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#eff6ff] text-slate-700 hover:text-[#1e40af] cursor-pointer transition-colors"
                        >
                          <img
                            src={doc.image}
                            alt={doc.name}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200"
                          />
                          <div className="min-w-0">
                            <p className="text-sm font-bold truncate leading-tight">{doc.name}</p>
                            <p className="text-slate-400 text-xs mt-0.5">{doc.speciality}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#1e40af] hover:bg-[#1d4ed8] text-white text-sm font-bold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition duration-200 active:scale-95 shrink-0 cursor-pointer text-center"
            >
              Search Doctors
            </button>
          </form>

        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative mt-10 lg:mt-0">
          {/* Blurry circular decoration */}
          <div className="absolute right-1/2 translate-x-1/2 bottom-0 w-[260px] h-[260px] md:w-[360px] md:h-[360px] bg-gradient-to-tr from-[#3b82f6]/10 to-[#1e40af]/20 rounded-full blur-2xl"></div>
          <div className="absolute right-1/2 translate-x-1/2 bottom-0 w-[220px] h-[220px] md:w-[300px] md:h-[300px] bg-gradient-to-b from-blue-50/50 to-blue-100/50 rounded-full border border-blue-50 shadow-inner"></div>

          <img
            src={assets.header_img}
            alt="Doctor Hero"
            className="w-full max-w-sm md:max-w-md object-contain z-10 hover:scale-[1.01] transition-transform duration-500"
          />
        </div>

      </div>

      {/* FEATURES ROW */}
      <div className="mt-16 border-t border-slate-100 pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Verified Doctors */}
        <div className="flex items-center gap-4 group">
          <div className="p-3 bg-blue-50/80 rounded-2xl text-[#1e40af] shrink-0 border border-blue-100 group-hover:bg-[#eff6ff] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm md:text-base leading-tight">Verified Doctors</h4>
            <p className="text-slate-500 text-xs mt-0.5 font-medium">100% verified health professionals</p>
          </div>
        </div>

        {/* Easy Booking */}
        <div className="flex items-center gap-4 group">
          <div className="p-3 bg-emerald-50/80 rounded-2xl text-emerald-600 shrink-0 border border-emerald-100 group-hover:bg-[#f0fdf4] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 00-2 2z"/>
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm md:text-base leading-tight">Easy Booking</h4>
            <p className="text-slate-500 text-xs mt-0.5 font-medium">Book appointments in seconds</p>
          </div>
        </div>

        {/* Secure & Safe */}
        <div className="flex items-center gap-4 group">
          <div className="p-3 bg-purple-50/80 rounded-2xl text-purple-600 shrink-0 border border-purple-100 group-hover:bg-[#faf5ff] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm md:text-base leading-tight">Secure & Safe</h4>
            <p className="text-slate-500 text-xs mt-0.5 font-medium">Your data is safe and protected</p>
          </div>
        </div>

        {/* 24/7 Support */}
        <div className="flex items-center gap-4 group">
          <div className="p-3 bg-orange-50/80 rounded-2xl text-orange-600 shrink-0 border border-orange-100 group-hover:bg-[#fff7ed] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm md:text-base leading-tight">24/7 Support</h4>
            <p className="text-slate-500 text-xs mt-0.5 font-medium">We are here for your support</p>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Header;
import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../../context/AdminContext';

function DoctorsList() {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken]);

  const filteredDoctors = (doctors || []).filter((item) => {
    const name = item.name || "";
    const specialty = item.speciality || "";
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      name.toLowerCase().includes(q) || 
      specialty.toLowerCase().includes(q);

    let matchesAvailability = true;
    const isAvailable = item.available === 1 || item.available === true;
    if (availabilityFilter === "available") {
      matchesAvailability = isAvailable;
    } else if (availabilityFilter === "unavailable") {
      matchesAvailability = !isAvailable;
    }

    return matchesSearch && matchesAvailability;
  });

  return (
    <div className="p-6 md:p-8 max-w-6xl w-full">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Our Doctors</h1>
        <p className="text-slate-500 text-sm font-medium mt-1">Manage doctor availability status and view medical profile baselines.</p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search input */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-2.5 w-full md:max-w-md">
          <svg className="w-4 h-4 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by name or specialty..."
            className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder-slate-400 w-full font-semibold focus:ring-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filter Badges */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Status:</span>
          {["all", "available", "unavailable"].map((status) => (
            <button
              key={status}
              onClick={() => setAvailabilityFilter(status)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer border ${
                availabilityFilter === status
                  ? "bg-[#1e40af] text-white border-[#1e40af] shadow-sm"
                  : "bg-white text-slate-600 border-slate-100 hover:bg-slate-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filteredDoctors && filteredDoctors.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredDoctors.map((item, index) => (
            <div 
              key={item.id || index} 
              className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1.5 transition-all duration-300 group flex flex-col justify-between"
            >
              {/* Image Section */}
              <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden shrink-0">
                <img 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                  src={item.image || item.photo || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400"} 
                  alt={item.name} 
                />
                
                {/* Availability Top Badge */}
                <div className="absolute top-3.5 right-3.5">
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm border ${
                    item.available === 1 || item.available === true
                      ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                      : "bg-slate-50 text-slate-400 border-slate-200"
                  }`}>
                    {item.available === 1 || item.available === true ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-slate-800 font-extrabold text-base tracking-tight leading-snug truncate">
                    {item.name}
                  </h3>
                  
                  {/* Specialty tag */}
                  <p className="text-[#1e40af] text-xs font-bold mt-1.5 inline-block bg-blue-50 border border-blue-100 rounded-md px-2 py-0.5 uppercase tracking-wide">
                    {item.speciality}
                  </p>
                </div>

                {/* Toggle Availability footer */}
                <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500">Availability</span>
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input  
                      onChange={() => changeAvailability(item.id)}
                      type="checkbox" 
                      checked={item.available === 1 || item.available === true} 
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-100 rounded-2xl shadow-sm">
          <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
          <p className="text-slate-500 text-base font-bold">No Doctors Found</p>
        </div>
      )}

    </div>
  )
}

export default DoctorsList

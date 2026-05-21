import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

function DoctorDashboard() {
  const { 
    dToken, 
    dashData, 
    getDashData, 
    completeAppointment, 
    cancelAppointment 
  } = useContext(DoctorContext);

  const { currency, calculateAge } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (
    <div className="p-6 md:p-8 max-w-6xl w-full">
      
      {/* Welcome Banner */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Doctor Dashboard</h1>
        <p className="text-slate-500 text-sm font-medium mt-1">Review your recent clinic earnings, patients, and schedule timeline.</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        
        {/* Earnings Card */}
        <div className="flex items-center gap-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl shrink-0">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-900 leading-tight">{currency}{dashData.earning}</p>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-0.5">Total Earnings</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="flex items-center gap-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl shrink-0">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-900 leading-tight">{dashData.appointments}</p>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-0.5">Appointments</p>
          </div>
        </div>

        {/* Patients Card */}
        <div className="flex items-center gap-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="bg-indigo-50 text-indigo-600 p-4 rounded-2xl shrink-0">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-900 leading-tight">{dashData.patients}</p>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-0.5">Total Patients</p>
          </div>
        </div>

      </div>

      {/* Latest Bookings Section */}
      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100 bg-slate-50/50">
          <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h3 className="font-bold text-slate-800 text-base">Latest Bookings</h3>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          {dashData.latestAppointments && dashData.latestAppointments.length > 0 ? (
            dashData.latestAppointments.map((item, index) => (
              <div 
                key={item.id || index} 
                className="bg-white border border-slate-100 rounded-xl p-4 sm:p-5 hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Patient Info Column */}
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <img 
                    className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0" 
                    src={item.userData?.image || assets.people_icon} 
                    alt={item.userData?.name || "Patient"} 
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Patient</span>
                    <p className="text-slate-800 font-bold text-sm truncate">{item.userData?.name || "N/A"}</p>
                    <p className="text-slate-500 text-xs mt-0.5">
                      Age: {item.userData?.dob ? calculateAge(item.userData.dob) : "N/A"}
                    </p>
                  </div>
                </div>

                {/* Schedule Pills & Fee Column */}
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  
                  {/* Date & Time Badges */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="flex items-center gap-2 text-slate-600 bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg text-xs font-semibold shrink-0">
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {item.slotDate}
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg text-xs font-semibold shrink-0">
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item.slotTime}
                    </div>
                  </div>

                  {/* Fee Indicator */}
                  <div className="flex items-center bg-slate-50 border border-slate-100 text-slate-800 px-3 py-1 rounded-lg text-xs font-extrabold shrink-0">
                    Fee: {currency}{item.amount}
                  </div>

                </div>

                {/* Actions Section */}
                <div className="flex items-center justify-end shrink-0 min-w-[140px] border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto">
                  {item.cancelled ? (
                    <span className="text-[11px] font-bold px-3 py-1.5 bg-rose-50 text-rose-600 rounded-full border border-rose-100 w-full text-center">
                      Cancelled
                    </span>
                  ) : item.isComplete ? (
                    <span className="text-[11px] font-bold px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 w-full text-center">
                      Completed
                    </span>
                  ) : (
                    <div className="flex items-center gap-2 w-full">
                      <button
                        onClick={() => cancelAppointment(item.id)}
                        className="flex-1 text-center text-xs font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-100 hover:border-transparent py-2 rounded-lg transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => completeAppointment(item.id)}
                        className="flex-1 text-center text-xs font-bold text-emerald-600 hover:text-white bg-emerald-50 hover:bg-emerald-600 border border-emerald-100 hover:border-transparent py-2 rounded-lg transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
                      >
                        Complete
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="text-slate-500 font-bold text-sm">No recent bookings</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

export default DoctorDashboard;
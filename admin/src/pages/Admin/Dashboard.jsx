import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from "../../assets/assets";
import { AppContext } from '../../context/AppContext';

function Dashboard() {
  const { aToken, dashData, cancelAppoinment, getDashData } = useContext(AdminContext);
  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return dashData && (
    <div className="p-6 md:p-8 max-w-6xl w-full">
      
      {/* Welcome Banner */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm font-medium mt-1">Welcome back, Administrator! Here is the latest clinical activity.</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        
        {/* Doctors Card */}
        <div className="flex items-center gap-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl shrink-0">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-slate-900 leading-tight">{dashData.doctors}</p>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-0.5">Total Doctors</p>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="flex items-center gap-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="bg-indigo-50 text-indigo-600 p-4 rounded-2xl shrink-0">
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
          <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl shrink-0">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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
                className="bg-white border border-slate-100 rounded-xl p-4 sm:p-5 hover:shadow-md hover:border-slate-200 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                {/* Patient & Doctor Pair */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6 flex-1 min-w-0">
                  
                  {/* Patient Info */}
                  <div className="flex items-center gap-3 bg-slate-50/50 p-2.5 rounded-xl border border-slate-100/50 w-full sm:w-auto sm:min-w-[180px]">
                    <img 
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0" 
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

                  {/* Visual Connection Arrow */}
                  <div className="hidden sm:flex items-center justify-center text-slate-300 shrink-0">
                    <svg className="w-5 h-5 text-[#1e40af]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>

                  {/* Doctor Info */}
                  <div className="flex items-center gap-3 bg-blue-50/20 p-2.5 rounded-xl border border-blue-50/50 w-full sm:w-auto sm:min-w-[200px]">
                    <img 
                      className="w-10 h-10 rounded-full bg-slate-100 object-cover border border-slate-200 shrink-0" 
                      src={item.docData?.image || assets.doctor_icon} 
                      alt={item.docData?.name || "Doctor"} 
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider block">Doctor</span>
                      <p className="text-slate-800 font-bold text-sm truncate">{item.docData?.name || "N/A"}</p>
                      <p className="text-[#1e40af] text-xs font-semibold mt-0.5">{item.docData?.speciality || "Specialist"}</p>
                    </div>
                  </div>

                </div>

                {/* Date/Time and Action Controls */}
                <div className="flex flex-wrap items-center gap-3 lg:justify-end shrink-0 w-full lg:w-auto border-t lg:border-t-0 pt-3 lg:pt-0">
                  
                  {/* Schedule Pills */}
                  <div className="flex sm:flex-col gap-1.5 flex-1 sm:flex-initial">
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

                  {/* Fee Pill */}
                  <div className="flex items-center justify-center bg-slate-50 border border-slate-100 text-slate-800 px-3 py-2 rounded-lg text-xs font-extrabold">
                    Fee: {currency}{item.amount}
                  </div>

                  {/* Action or Status */}
                  <div className="min-w-[100px] flex justify-end ml-auto sm:ml-0">
                    {item.cancelled ? (
                      <span className="text-[11px] font-bold px-3 py-1.5 bg-rose-50 text-rose-600 rounded-full border border-rose-100 w-full text-center">
                        Cancelled
                      </span>
                    ) : (
                      <button
                        onClick={() => cancelAppoinment(item.id)}
                        className="w-full text-center text-xs font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-100 hover:border-transparent px-4 py-2 rounded-lg transition-all duration-200 shadow-xs cursor-pointer active:scale-95"
                      >
                        Cancel
                      </button>
                    )}
                  </div>

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
  )
}

export default Dashboard;

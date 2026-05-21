import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

function DoctorAppoinment() {
  const { 
    dToken, 
    appoinment, 
    getAppointment, 
    completeAppointment, 
    cancelAppointment 
  } = useContext(DoctorContext);

  const { calculateAge, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointment();
    }
  }, [dToken]);

  return (
    <div className="p-6 md:p-8 max-w-6xl w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Appointments Schedule</h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Review patient listings, complete consultation slots, or cancel bookings.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
        <div className="max-h-[75vh] overflow-y-auto">
          
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[0.5fr_2fr_1.5fr_1fr_2.5fr_1fr_2fr] py-4 px-6 border-b border-slate-100 bg-slate-50/50 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <p>#</p>
            <p>Patient</p>
            <p>Payment Mode</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p className="text-right">Actions</p>
          </div>

          {/* Appointment Rows */}
          {appoinment && appoinment.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {appoinment.map((item, index) => (
                <div
                  key={item.id || index}
                  className="flex flex-col md:grid md:grid-cols-[0.5fr_2fr_1.5fr_1fr_2.5fr_1fr_2fr] items-start md:items-center text-slate-600 py-4 px-6 hover:bg-slate-50/30 transition-colors gap-3 md:gap-0"
                >
                  {/* Row index */}
                  <p className="hidden md:block font-bold text-slate-400 text-sm">{index + 1}</p>

                  {/* Patient Info */}
                  <div className="flex items-center gap-3">
                    <img
                      className="w-9 h-9 rounded-full object-cover border border-slate-200"
                      src={item.userData?.image || assets.people_icon}
                      alt={item.userData?.name || "Patient"}
                    />
                    <div>
                      <p className="text-slate-800 font-bold text-sm">{item.userData?.name || "N/A"}</p>
                      <span className="md:hidden text-xs text-slate-400 font-semibold">Age: {item.userData?.dob ? calculateAge(item.userData.dob) : "N/A"}</span>
                    </div>
                  </div>

                  {/* Payment Mode */}
                  <div>
                    <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider border ${
                      item.payment
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : "bg-amber-50 text-amber-600 border-amber-100"
                    }`}>
                      {item.payment ? "ONLINE" : "CASH"}
                    </span>
                  </div>

                  {/* Age */}
                  <p className="hidden md:block text-slate-600 font-semibold text-sm">
                    {item.userData?.dob ? calculateAge(item.userData.dob) : "N/A"}
                  </p>

                  {/* Date & Time */}
                  <div>
                    <p className="text-slate-700 font-bold text-sm">{item.slotDate}</p>
                    <p className="text-slate-400 text-xs mt-0.5 font-semibold">{item.slotTime}</p>
                  </div>

                  {/* Fees */}
                  <p className="font-extrabold text-slate-900 text-sm">{currency}{item.amount}</p>

                  {/* Action Buttons */}
                  <div className="w-full md:w-auto flex md:justify-end gap-2">
                    {item.cancelled ? (
                      <span className="text-[11px] font-bold px-2.5 py-1 bg-rose-50 text-rose-600 rounded-full border border-rose-100">
                        Cancelled
                      </span>
                    ) : item.isComplete ? (
                      <span className="text-[11px] font-bold px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                        Completed
                      </span>
                    ) : (
                      <div className="flex items-center gap-2 w-full md:w-auto">
                        <button
                          onClick={() => cancelAppointment(item.id)}
                          className="text-xs font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-100 hover:border-transparent px-3 py-1.5 rounded-lg transition-all duration-200 flex-1 md:flex-none text-center"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => completeAppointment(item.id)}
                          className="text-xs font-bold text-emerald-600 hover:text-white bg-emerald-50 hover:bg-emerald-600 border border-emerald-100 hover:border-transparent px-3 py-1.5 rounded-lg transition-all duration-200 flex-1 md:flex-none text-center"
                        >
                          Complete
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50/20">
              <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
              </svg>
              <p className="text-slate-500 text-base font-bold">No Appointments Found</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default DoctorAppoinment;
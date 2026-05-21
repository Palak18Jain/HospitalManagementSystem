import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";
import { AppContext } from "../context/AppContext";

function Sidebar() {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const { sideMenuOpen, setSideMenuOpen } = useContext(AppContext);

  // Styling rule for active and regular sidebar link items
  const navStyle = ({ isActive }) =>
    `flex items-center gap-3.5 py-3.5 px-6 cursor-pointer border-r-4 transition-all duration-200 ${
      isActive
        ? "bg-[#eff6ff] border-[#1e40af] text-[#1e40af] font-bold shadow-xs"
        : "border-transparent text-slate-600 hover:bg-slate-50/70 hover:text-[#1e40af] font-medium"
    }`;

  // Shared Sidebar links list
  const sidebarLinks = () => (
    <ul className="mt-5 space-y-1.5">
      {/* Admin Menu */}
      {aToken && (
        <>
          <NavLink to="/admin-dashboard" className={navStyle}>
            <img className="w-5 h-5 shrink-0 opacity-75" src={assets.home_icon} alt="" />
            <span className="text-[14px]">Dashboard</span>
          </NavLink>
          <NavLink to="/all-appoinments" className={navStyle}>
            <img className="w-5 h-5 shrink-0 opacity-75" src={assets.appointment_icon} alt="" />
            <span className="text-[14px]">Appointments</span>
          </NavLink>
          <NavLink to="/add-doctor" className={navStyle}>
            <img className="w-5 h-5 shrink-0 opacity-75" src={assets.add_icon} alt="" />
            <span className="text-[14px]">Add Doctor</span>
          </NavLink>
          <NavLink to="/doctor-list" className={navStyle}>
            <img className="w-5 h-5 shrink-0 opacity-75" src={assets.people_icon} alt="" />
            <span className="text-[14px]">Doctors List</span>
          </NavLink>
        </>
      )}

      {/* Doctor Menu */}
      {dToken && (
        <>
          <NavLink to="/doctor-dashboard" className={navStyle}>
            <img className="w-5 h-5 shrink-0 opacity-75" src={assets.home_icon} alt="" />
            <span className="text-[14px]">Dashboard</span>
          </NavLink>
          <NavLink to="/doctor-appoinments" className={navStyle}>
            <img className="w-5 h-5 shrink-0 opacity-75" src={assets.appointment_icon} alt="" />
            <span className="text-[14px]">Appointments</span>
          </NavLink>
          <NavLink to="/doctor-profile" className={navStyle}>
            <img className="w-5 h-5 shrink-0 opacity-75" src={assets.people_icon} alt="" />
            <span className="text-[14px]">Profile</span>
          </NavLink>
        </>
      )}
    </ul>
  );

  return (
    <>
      {/* Desktop Sidebar (hidden on mobile) */}
      <div className="hidden md:block w-64 min-h-[calc(100vh-68px)] bg-white border-r shrink-0">
        {sidebarLinks()}
      </div>

      {/* Mobile Drawer (visible on mobile when sideMenuOpen is true) */}
      {sideMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setSideMenuOpen(false)}
          />

          {/* Drawer menu content */}
          <div className="relative flex flex-col w-64 max-w-xs bg-white h-full shadow-2xl z-50 border-r border-slate-100 transition-transform duration-300">
            {/* Header / Brand */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
              <span className="font-extrabold text-slate-800 text-xs tracking-wider uppercase">Navigation</span>
              <button
                onClick={() => setSideMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Links container */}
            <div className="flex-1 overflow-y-auto" onClick={() => setSideMenuOpen(false)}>
              {sidebarLinks()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
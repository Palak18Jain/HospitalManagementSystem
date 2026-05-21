import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import BrandLogo from "./BrandLogo";
import { DoctorContext } from "../context/DoctorContext";
import { AppContext } from "../context/AppContext";

function Navbar() {

  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const { sideMenuOpen, setSideMenuOpen } = useContext(AppContext);

  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    if (aToken) {
      setAToken("");
      localStorage.removeItem("aToken");
    }
    if (dToken) {
      setDToken("");
      localStorage.removeItem("dToken");
    }
  };

  return (
    <div className="flex items-center justify-between px-4 sm:px-10 py-3 border-b bg-white sticky top-0 z-30 shadow-sm">

      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Hamburger Toggle Button (mobile only) */}
        {(aToken || dToken) && (
          <button
            onClick={() => setSideMenuOpen(!sideMenuOpen)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-[#1e40af] md:hidden transition-all duration-200 cursor-pointer mr-1.5 active:scale-90 bg-slate-50 border border-slate-100"
            aria-label="Toggle Menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        <div onClick={() => navigate("/")}>
          <BrandLogo className="w-8 h-8" textClassName="text-base sm:text-lg" />
        </div>

        <p className="border px-2.5 py-0.5 rounded-full border-slate-300 text-slate-500 text-[10px] font-semibold uppercase tracking-wider bg-slate-50">
          {aToken ? "Admin Panel" : "Doctor Panel"}
        </p>

      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="bg-[#1e40af] text-white px-6 py-2 rounded-full text-sm hover:bg-[#1d4ed8] transition-all duration-300 cursor-pointer shadow-sm hover:shadow active:scale-95"
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;
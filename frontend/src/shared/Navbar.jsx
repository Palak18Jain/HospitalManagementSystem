import React, { useEffect, useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";
import BrandLogo from "./BrandLogo";

function Navbar() {
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);
  const [open, setOpen] = useState(false); // profile dropdown
  const [menuOpen, setMenuOpen] = useState(false); // mobile menu

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setOpen(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [setToken]);

  const navStyle = ({ isActive }) =>
    isActive
      ? "text-[#1e40af] font-semibold border-b-2 border-[#1e40af] pb-1.5 transition-all duration-200"
      : "text-slate-600 hover:text-[#1e40af] font-medium pb-1.5 border-b-2 border-transparent hover:border-slate-200 transition-all duration-200";

  return (
    <header className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-5 md:px-8 py-4">

        {/* LOGO */}
        <div onClick={() => navigate("/")}>
          <BrandLogo className="w-9 h-9" textClassName="text-xl md:text-2xl" />
        </div>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 text-sm lg:text-[15px]">
          <NavLink to="/" end className={navStyle}>Home</NavLink>
          <NavLink to="/doctors" className={navStyle}>Find Doctors</NavLink>
          <NavLink to="/about" className={navStyle}>About Us</NavLink>
          <NavLink to="/chatbot" className={navStyle}>Health Tips</NavLink>
          <NavLink to="/contact" className={navStyle}>Contact Us</NavLink>
        </nav>

        {/* RIGHT SECTION: CTA & PROFILE */}
        <div className="hidden md:flex items-center gap-4">
          {token ? (
            <div className="relative">
              <div
                className="flex items-center gap-2 cursor-pointer bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-full border border-slate-100 transition-all"
                onClick={() => setOpen(!open)}
              >
                <img
                  src={userData && userData.image ? userData.image : assets.profile_pic}
                  alt="profile"
                  className="h-8 w-8 rounded-full border object-cover shadow-inner"
                />
                <span className="text-sm font-medium text-slate-700 max-w-[80px] truncate">
                  {userData ? userData.name : "My Account"}
                </span>
                <img src={assets.dropdown_icon} className="w-2.5 opacity-60" alt="" />
              </div>

              {open && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-48 bg-white text-slate-700 rounded-xl border border-slate-100 shadow-xl z-20 py-1 overflow-hidden transition-all duration-200">
                    <p 
                      onClick={() => { navigate("/my-profile"); setOpen(false); }} 
                      className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer text-sm font-medium transition-all"
                    >
                      My Profile
                    </p>
                    <p 
                      onClick={() => { navigate("/my-appointments"); setOpen(false); }} 
                      className="px-4 py-2.5 hover:bg-slate-50 cursor-pointer text-sm font-medium transition-all"
                    >
                      My Appointments
                    </p>
                    <hr className="border-slate-100" />
                    <p 
                      onClick={handleLogout} 
                      className="px-4 py-2.5 hover:bg-red-50 text-red-600 cursor-pointer text-sm font-semibold transition-all"
                    >
                      Logout
                    </p>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <NavLink to="/login" className="text-slate-600 hover:text-[#1e40af] font-medium text-sm transition-all">
                Sign In
              </NavLink>
              <button
                onClick={() => navigate("/register")}
                className="bg-[#1e40af] hover:bg-[#1d4ed8] text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all duration-200"
              >
                Book Appointment
              </button>
            </div>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="flex md:hidden items-center gap-4">
          {!token && (
            <button
              onClick={() => navigate("/login")}
              className="bg-[#1e40af] text-white text-xs font-bold px-3.5 py-2 rounded-full shadow"
            >
              Book
            </button>
          )}
          <img
            src={assets.menu_icon}
            alt="menu"
            className="w-6 cursor-pointer opacity-80 hover:opacity-100 transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>

      </div>

      {/* MOBILE MENU DROPDOWN */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-30 bg-slate-900/15" onClick={() => setMenuOpen(false)}></div>
          <div className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 shadow-xl z-40 p-6 space-y-4 md:hidden">
            <NavLink to="/" onClick={() => setMenuOpen(false)} className="block text-slate-700 font-medium hover:text-[#1e40af] transition-all">Home</NavLink>
            <NavLink to="/doctors" onClick={() => setMenuOpen(false)} className="block text-slate-700 font-medium hover:text-[#1e40af] transition-all">Find Doctors</NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)} className="block text-slate-700 font-medium hover:text-[#1e40af] transition-all">About Us</NavLink>
            <NavLink to="/chatbot" onClick={() => setMenuOpen(false)} className="block text-slate-700 font-medium hover:text-[#1e40af] transition-all">Health Tips</NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="block text-slate-700 font-medium hover:text-[#1e40af] transition-all">Contact Us</NavLink>
            
            <hr className="border-slate-100" />

            {token ? (
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <img
                    src={userData && userData.image ? userData.image : assets.profile_pic}
                    alt="profile"
                    className="h-10 w-10 rounded-full border object-cover"
                  />
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">{userData ? userData.name : "My Account"}</p>
                    <p className="text-xs text-slate-500">{userData ? userData.email : ""}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button 
                    onClick={() => { navigate("/my-profile"); setMenuOpen(false); }} 
                    className="bg-slate-50 text-slate-700 text-xs font-semibold py-2.5 rounded-lg border text-center"
                  >
                    My Profile
                  </button>
                  <button 
                    onClick={() => { navigate("/my-appointments"); setMenuOpen(false); }} 
                    className="bg-slate-50 text-slate-700 text-xs font-semibold py-2.5 rounded-lg border text-center"
                  >
                    Appointments
                  </button>
                </div>
                <button 
                  onClick={handleLogout} 
                  className="w-full bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold py-2.5 rounded-lg text-center"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-4 pt-2">
                <button 
                  onClick={() => { navigate("/login"); setMenuOpen(false); }} 
                  className="flex-1 bg-slate-50 text-slate-700 text-sm font-semibold py-2.5 rounded-full border text-center"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => { navigate("/register"); setMenuOpen(false); }} 
                  className="flex-1 bg-[#1e40af] text-white text-sm font-bold py-2.5 rounded-full shadow text-center"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
}

export default Navbar;
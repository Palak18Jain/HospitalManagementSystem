import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";

function DoctorProfile() {
  const { dToken, profileData, getProfileData, updateProfileData } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [fees, setFees] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [available, setAvailable] = useState(false);
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  useEffect(() => {
    if (profileData) {
      setFees(profileData.fees);
      setAddress1(profileData.address1 || "");
      setAddress2(profileData.address2 || "");
      setAvailable(profileData.available === 1 || profileData.available === true);
      setAbout(profileData.about || "");
    }
  }, [profileData]);

  const handleSave = async () => {
    const updatedData = {
      fees: Number(fees),
      address1,
      address2,
      address: {
        line1: address1,
        line2: address2,
      },
      available,
      about,
    };
    await updateProfileData(updatedData);
    setIsEdit(false);
  };

  const labelStyle = "text-slate-700 text-xs font-bold uppercase tracking-wider mb-2 block";
  const inputStyle = "w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:border-[#1e40af] focus:ring-1 focus:ring-[#1e40af] focus:outline-none transition-all bg-slate-50/30";

  return profileData && (
    <div className="p-6 md:p-8 max-w-4xl w-full">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">My Profile</h1>
        <p className="text-slate-500 text-sm font-medium mt-1">Manage your clinic schedule availability, consultation fees, and public biography.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Side: Avatar Image */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-sm aspect-square max-w-xs bg-slate-100 group">
            <img 
              className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500" 
              src={profileData.image || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400"} 
              alt={profileData.name} 
            />
            {/* Status indicator overlay */}
            <div className="absolute bottom-4 left-4">
              <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-md border ${
                available ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-200"
              }`}>
                {available ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Profile Details form */}
        <div className="flex-1 w-full bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
          
          {/* Main Info */}
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">{profileData.name}</h2>
            <div className="flex items-center gap-2 mt-2 text-slate-500 text-sm">
              <p className="font-bold text-[#1e40af] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded text-xs uppercase tracking-wide">
                {profileData.degree} - {profileData.speciality}
              </p>
              <span className="py-0.5 px-2.5 border border-slate-200 text-xs rounded-full font-semibold text-slate-500 bg-slate-50">
                {profileData.experience} Experience
              </span>
            </div>
          </div>

          <hr className="border-slate-100 my-6" />

          {/* Form Fields */}
          <div className="space-y-5">
            
            {/* About */}
            <div>
              <label className={labelStyle}>Professional Bio</label>
              {isEdit ? (
                <textarea
                  className={`${inputStyle} h-28 resize-none pt-3`}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Write a brief professional summary about yourself..."
                />
              ) : (
                <p className="text-sm text-slate-600 leading-relaxed font-medium bg-slate-50/50 p-4 rounded-xl border border-slate-50">
                  {about || "No bio details provided yet."}
                </p>
              )}
            </div>

            {/* Appointment Fee & Availability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Fee */}
              <div>
                <label className={labelStyle}>Consultation Fee</label>
                {isEdit ? (
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold">{currency}</span>
                    <input
                      type="number"
                      className={`${inputStyle} pl-8`}
                      value={fees}
                      onChange={(e) => setFees(e.target.value)}
                    />
                  </div>
                ) : (
                  <p className="text-sm font-extrabold text-slate-800 bg-slate-50/50 p-3 rounded-xl border border-slate-50">
                    {currency}{fees}
                  </p>
                )}
              </div>

              {/* Availability Switch */}
              <div className="flex flex-col justify-end">
                <label className={labelStyle}>Availability Status</label>
                <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-50 flex items-center justify-between h-[45px]">
                  <span className="text-xs font-bold text-slate-500">Open to Bookings</span>
                  <label className="relative inline-flex items-center cursor-pointer select-none">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={available}
                      onChange={(e) => setAvailable(e.target.checked)}
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>
              </div>

            </div>

            {/* Address */}
            <div>
              <label className={labelStyle}>Clinic Address</label>
              {isEdit ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    className={inputStyle}
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    placeholder="Address Line 1"
                  />
                  <input
                    type="text"
                    className={inputStyle}
                    value={address2}
                    onChange={(e) => setAddress2(e.target.value)}
                    placeholder="Address Line 2"
                  />
                </div>
              ) : (
                <div className="text-sm text-slate-600 leading-relaxed font-semibold bg-slate-50/50 p-4 rounded-xl border border-slate-50 space-y-0.5">
                  <p>{address1 || "No primary street address registered."}</p>
                  {address2 && <p>{address2}</p>}
                </div>
              )}
            </div>

          </div>

          {/* Action buttons */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            {isEdit ? (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  className="bg-[#1e40af] hover:bg-[#1d4ed8] text-white text-xs font-bold px-6 py-3 rounded-full hover:shadow-lg hover:shadow-blue-500/10 active:scale-95 transition-all duration-200 cursor-pointer"
                >
                  Save Profile
                </button>
                <button
                  onClick={() => setIsEdit(false)}
                  className="border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold px-6 py-3 rounded-full transition-all duration-200 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-3 rounded-full hover:shadow-lg transition-all duration-200 cursor-pointer"
              >
                Edit Profile Settings
              </button>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

export default DoctorProfile;
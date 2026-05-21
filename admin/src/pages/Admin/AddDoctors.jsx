import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from 'react-toastify'
import axios from "axios"

function AddDoctors() {
  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [education, setEducation] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('password', password);
      formData.append('email', email);
      formData.append('experience', experience);
      formData.append('fees', Number(fees));
      formData.append('speciality', speciality);
      formData.append('degree', education);
      formData.append('about', about);
      formData.append('address_line1', address1);
      formData.append('address_line2', address2);

      const { data } = await axios.post(backendUrl + '/api/admin/add-doctor', formData, { headers: { aToken } });
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setSpeciality("General physician");
        setAddress1("");
        setAddress2("");
        setEducation("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const labelStyle = "text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5 block";
  const inputStyle = "w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:border-[#1e40af] focus:ring-1 focus:ring-[#1e40af] focus:outline-none transition-all duration-200 bg-slate-50/30";

  return (
    <div className="p-6 md:p-8 max-w-4xl w-full">
      
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Add Doctor</h1>
        <p className="text-slate-500 text-sm font-medium mt-1">Register a new medical expert into the hospital database.</p>
      </div>

      <form onSubmit={onSubmitHandler} className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">

        {/* Upload Section */}
        <div className="flex items-center gap-5 mb-8">
          <label htmlFor="doc-img" className="cursor-pointer relative group">
            <div className="w-20 h-20 bg-slate-50 rounded-full border border-slate-200 border-dashed flex items-center justify-center overflow-hidden hover:border-[#1e40af] transition-colors duration-200">
              <img
                className="w-full h-full object-cover"
                src={docImg ? URL.createObjectURL(docImg) : assets.upload_area || "https://img.icons8.com/ios/50/add-image.png"}
                alt="Upload Area"
              />
            </div>
            <div className="absolute inset-0 bg-slate-950/20 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
          </label>

          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            id="doc-img"
            hidden
          />

          <div>
            <p className="text-slate-800 font-bold text-sm">Upload Profile Picture</p>
            <p className="text-slate-400 text-xs mt-0.5">Format: JPG, PNG. Max: 2MB.</p>
          </div>
        </div>

        {/* Inputs Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Doctor Name */}
          <div>
            <label className={labelStyle}>Doctor Name</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className={inputStyle}
              type="text"
              placeholder="Dr. John Doe"
              required
            />
          </div>

          {/* Doctor Email */}
          <div>
            <label className={labelStyle}>Doctor Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className={inputStyle}
              type="email"
              placeholder="johndoe@alaukikhms.com"
              required
            />
          </div>

          {/* Doctor Password */}
          <div>
            <label className={labelStyle}>Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className={inputStyle}
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className={labelStyle}>Experience</label>
            <select
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              className={inputStyle}
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} Year${i > 0 ? 's' : ''}`}>{i + 1} Year{i > 0 ? 's' : ''}</option>
              ))}
            </select>
          </div>

          {/* Fees */}
          <div>
            <label className={labelStyle}>Fees</label>
            <input
              onChange={(e) => setFees(e.target.value)}
              value={fees}
              className={inputStyle}
              type="number"
              placeholder="Consultation fee in USD"
              required
            />
          </div>

          {/* Speciality */}
          <div>
            <label className={labelStyle}>Speciality</label>
            <select
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
              className={inputStyle}
            >
              <option>General physician</option>
              <option>Gynecologist</option>
              <option>Dermatologist</option>
              <option>Pediatricians</option>
              <option>Neurologist</option>
              <option>Gastroenterologist</option>
            </select>
          </div>

          {/* Education */}
          <div className="md:col-span-2">
            <label className={labelStyle}>Education & Degrees</label>
            <input
              onChange={(e) => setEducation(e.target.value)}
              value={education}
              className={inputStyle}
              type="text"
              placeholder="MBBS, MD - Cardiology"
              required
            />
          </div>

          {/* Address Line 1 */}
          <div>
            <label className={labelStyle}>Address Line 1</label>
            <input
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
              className={inputStyle}
              type="text"
              placeholder="Clinic street address 1"
              required
            />
          </div>

          {/* Address Line 2 */}
          <div>
            <label className={labelStyle}>Address Line 2</label>
            <input
              onChange={(e) => setAddress2(e.target.value)}
              value={address2}
              className={inputStyle}
              type="text"
              placeholder="Clinic floor/suite address 2"
              required
            />
          </div>

          {/* About Doctor */}
          <div className="md:col-span-2">
            <label className={labelStyle}>About Doctor</label>
            <textarea
              onChange={(e) => setAbout(e.target.value)}
              value={about}
              className={`${inputStyle} h-32 resize-none pt-3`}
              placeholder="Write a brief professional overview about the practitioner..."
              required
            />
          </div>

        </div>

        {/* Submit */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <button
            type="submit"
            className="w-full md:w-auto bg-[#1e40af] hover:bg-[#1d4ed8] text-white text-sm font-bold px-8 py-3.5 rounded-full hover:shadow-lg hover:shadow-blue-500/10 active:scale-95 transition-all duration-200 cursor-pointer text-center"
          >
            Add Doctor
          </button>
        </div>

      </form>

    </div>
  );
}

export default AddDoctors;
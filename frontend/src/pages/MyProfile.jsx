import React, { useState, useContext } from "react";
import Navbar from "../shared/Navbar";

import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

function MyProfile() {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const navigate = useNavigate();

  const [isEdit, setIsEdit] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image file size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // If there's no token, redirect to login
  if (!token) {
    navigate('/login');
    return null;
  }

  const updateUserProfileData = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/update-profile',
        {
          name: userData.name,
          phone: userData.phone, 
          dob: userData.dob,         
          gender: userData.gender,
          address: JSON.stringify(userData.address),
          image: userData.image
        },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  if (!userData) {
    return (
      <>
        <Navbar />
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
          Loading...
        </div>
      </>
    );
  }

  return (
   <>
   <Navbar/>
    <div className="bg-gray-100 min-h-screen flex justify-center py-10 px-4">

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-md p-8">

        {/* PROFILE TOP */}
        <div className="flex items-center gap-6">

          {isEdit ? (
            <label className="relative cursor-pointer group block w-24 h-24 rounded-xl overflow-hidden border border-dashed border-gray-300 hover:border-[var(--primary)] transition bg-gray-50">
              <img
                src={userData.image || assets.profile_pic}
                alt="profile"
                className="w-full h-full object-cover group-hover:opacity-75 transition"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition text-[10px] font-medium">
                <img src={assets.upload_icon} className="w-5 mb-1 invert" alt="upload" />
                <span>Change Photo</span>
              </div>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          ) : (
            <img
              src={userData.image || assets.profile_pic}
              alt="profile"
              className="w-24 h-24 rounded-xl object-cover border"
            />
          )}

          <div>
            {isEdit ? (
              <input
                className="text-2xl font-semibold border-b outline-none"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
              />
            ) : (
              <h2 className="text-2xl font-semibold text-gray-800">
                {userData.name}
              </h2>
            )}
          </div>
        </div>

        <hr className="my-6" />

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-sm text-gray-500 font-semibold mb-3">
            CONTACT INFORMATION
          </h3>

          <div className="space-y-3 text-sm">

            <p>
              <span className="font-medium text-gray-700">Email:</span>{" "}
              <span className="text-blue-600">{userData.email}</span>
            </p>

            <p>
              <span className="font-medium text-gray-700">Phone:</span>{" "}
              {isEdit ? (
                <input
                  className="border px-2 py-1 rounded"
                  value={userData.phone}
                  onChange={(e) =>
                    setUserData({ ...userData, phone: e.target.value })
                  }
                />
              ) : (
                userData.phone
              )}
            </p>

            <p>
              <span className="font-medium text-gray-700">Address:</span>{" "}
              {isEdit ? (
                <div className="flex flex-col gap-2 mt-1">
                  <input
                    className="border px-2 py-1 rounded"
                    value={userData.address.line1}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        address: {
                          ...userData.address,
                          line1: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="border px-2 py-1 rounded"
                    value={userData.address.line2}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        address: {
                          ...userData.address,
                          line2: e.target.value,
                        },
                      })
                    }
                  />
                  <input
                    className="border px-2 py-1 rounded"
                    value={userData.address.city}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        address: {
                          ...userData.address,
                          city: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              ) : (
                `${userData.address.line1}, ${userData.address.line2}, ${userData.address.city}`
              )}
            </p>

          </div>
        </div>

        <hr className="my-6" />

        {/* BASIC INFO */}
        <div>
          <h3 className="text-sm text-gray-500 font-semibold mb-3">
            BASIC INFORMATION
          </h3>

          <div className="space-y-3 text-sm">

            <p>
              <span className="font-medium text-gray-700">Gender:</span>{" "}
              {isEdit ? (
                <select
                  className="border px-2 py-1 rounded"
                  value={userData.gender}
                  onChange={(e) =>
                    setUserData({ ...userData, gender: e.target.value })
                  }
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              ) : (
                userData.gender
              )}
            </p>

            <p>
              <span className="font-medium text-gray-700">Birthday:</span>{" "}
              {isEdit ? (
                <input
                  type="date"
                  className="border px-2 py-1 rounded"
                  value={userData.dob}
                  onChange={(e) =>
                    setUserData({ ...userData, dob: e.target.value })
                  }
                />
              ) : (
                userData.dob
              )}
            </p>

          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex gap-4">

          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="px-6 py-2 rounded-full border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition"
            >
              Save Information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-6 py-2 rounded-full border border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition"
            >
              Edit
            </button>
          )}

        </div>

      </div>
     
    </div>
 
   </>
  );
}

export default MyProfile;
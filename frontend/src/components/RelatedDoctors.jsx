import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";

function RelatedDoctors({ speciality, docId }) {
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);
  const navigate = useNavigate();

  // ✅ Filter related doctors
  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const filtered = doctors.filter(
        (doc) => doc.speciality === speciality && String(doc._id || doc.id) !== String(docId)
      );
      setRelDoc(filtered);
    }
  }, [docId, speciality, doctors]);

  return (
    <div className="mt-16 px-4 md:px-10 max-w-6xl mx-auto text-center">

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Related Doctors
      </h2>

      <p className="text-gray-500 mt-2">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">

        {relDoc.slice(0, 5).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id || item.id}`);
              window.scrollTo(0, 0);
            }}
            className="bg-[#f5f7ff] rounded-xl p-3 hover:shadow-md transition cursor-pointer"
          >

            {/* Image */}
            <div className="bg-[#eaefff] rounded-lg flex items-center justify-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-40 object-contain"
              />
            </div>

            {/* Content */}
            <div className="mt-3 text-left">

              {item.available === 1 || item.available === true ? (
                <p className="text-green-500 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Available
                </p>
              ) : (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Unavailable
                </p>
              )}

              <h3 className="text-sm font-semibold text-gray-800 mt-1">
                {item.name}
              </h3>

              <p className="text-gray-500 text-xs">
                {item.speciality}
              </p>

            </div>
          </div>
        ))}

      </div>

      {/* Button */}
      <button
        onClick={() => {
          navigate("/doctors");
          window.scrollTo(0, 0);
        }}
        className="mt-8 bg-[var(--primary)] text-white px-6 py-2 rounded-full hover:scale-105 transition"
      >
        More
      </button>

    </div>
  );
}

export default RelatedDoctors;
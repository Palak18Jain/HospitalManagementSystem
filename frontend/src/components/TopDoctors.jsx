import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

function TopDoctors() {
  const navigate = useNavigate();
   const {doctors} = useContext(AppContext)

  return (
    <div className="py-10 px-4 md:px-10 text-center">

      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
        Top Doctors to Book
      </h1>

      <p className="text-gray-500 mt-2">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">

        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id || item.id}`)}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition cursor-pointer overflow-hidden"
          >

            {/* Image */}
            <div className="bg-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4 text-left">

              {/* Available */}
              {item.available === 1 || item.available === true ? (
                <p className="text-green-500 text-sm mb-1">
                  ● Available
                </p>
              ) : (
                <p className="text-red-500 text-sm mb-1">
                  ● Unavailable
                </p>
              )}

              {/* Name */}
              <h2 className="font-semibold text-gray-800">
                {item.name}
              </h2>

              {/* Speciality */}
              <p className="text-gray-500 text-sm">
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
          scrollTo(0, 0);
        }}
        className="mt-8 bg-[var(--primary)] text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
      >
        More
      </button>

    </div>
  );
}

export default TopDoctors;
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { AppContext } from "../Context/AppContext";

function Doctors() {
  const { speciality } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const { doctors } = useContext(AppContext);

  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  useEffect(() => {
    let list = doctors;
    if (speciality) {
      list = list.filter((doc) => doc.speciality === speciality);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (doc) =>
          doc.name.toLowerCase().includes(q) ||
          doc.speciality.toLowerCase().includes(q) ||
          (doc.degree && doc.degree.toLowerCase().includes(q))
      );
    }
    setFilteredDoctors(list);
  }, [speciality, searchQuery, doctors]);

  return (
    <>
      <Navbar />

      <div className="px-4 md:px-10 py-6 bg-gray-50 min-h-screen">

        {/* Heading */}
        <p className="text-gray-600 mb-4 text-sm md:text-base">
          Browse through the doctors specialist.
        </p>

        {/* 🔥 MOBILE FILTER (Horizontal Scroll) */}
        <div className="flex gap-2 overflow-x-auto pb-3 md:hidden">

          <button
            onClick={() => navigate("/doctors")}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              !speciality
                ? "bg-[var(--primary)] text-white"
                : "bg-white border text-gray-600"
            }`}
          >
            All
          </button>

          {specialities.map((spec, index) => (
            <button
              key={index}
              onClick={() => navigate(`/doctors/${spec}`)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                speciality === spec
                  ? "bg-[var(--primary)] text-white"
                  : "bg-white border text-gray-600"
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-6">

          {/* 🔥 DESKTOP SIDEBAR */}
          <div className="hidden md:flex flex-col gap-3 w-64">

            <button
              onClick={() => navigate("/doctors")}
              className={`border px-4 py-2 rounded text-sm ${
                !speciality
                  ? "bg-[var(--primary)] text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              All Doctors
            </button>

            {specialities.map((spec, index) => (
              <button
                key={index}
                onClick={() => navigate(`/doctors/${spec}`)}
                className={`border px-4 py-2 rounded text-sm ${
                  speciality === spec
                    ? "bg-[var(--primary)] text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                {spec}
              </button>
            ))}
          </div>

          {/* 🔥 DOCTOR GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 flex-1">

            {filteredDoctors.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointment/${item._id || item.id}`)}
                className="bg-white rounded-xl border hover:shadow-md transition cursor-pointer overflow-hidden"
              >

                {/* Image */}
                <div className="bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-36 sm:h-44 object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-3 md:p-4">

                  {item.available === 1 || item.available === true ? (
                    <p className="text-green-500 text-xs md:text-sm mb-1">
                      ● Available
                    </p>
                  ) : (
                    <p className="text-red-500 text-xs md:text-sm mb-1">
                      ● Unavailable
                    </p>
                  )}

                  <h2 className="font-semibold text-gray-800 text-sm md:text-base">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 text-xs md:text-sm">
                    {item.speciality}
                  </p>

                </div>
              </div>
            ))}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Doctors;
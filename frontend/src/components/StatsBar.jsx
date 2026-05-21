import React from "react";

function StatsBar() {
  const stats = [
    {
      value: "10,000+",
      label: "Verified Doctors",
      desc: "Across multiple clinical domains",
      bgGradient: "from-blue-500/10 to-indigo-500/10",
      textColor: "text-blue-600"
    },
    {
      value: "50,000+",
      label: "Appointments Booked",
      desc: "Successful online reservations",
      bgGradient: "from-indigo-500/10 to-purple-500/10",
      textColor: "text-indigo-600"
    },
    {
      value: "500+",
      label: "Hospitals & Clinics",
      desc: "Partnered medical facilities",
      bgGradient: "from-teal-500/10 to-emerald-500/10",
      textColor: "text-teal-600"
    },
    {
      value: "98%",
      label: "Patient Satisfaction",
      desc: "Rating from clinical feedback",
      bgGradient: "from-sky-500/10 to-blue-500/10",
      textColor: "text-sky-600"
    }
  ];

  return (
    <section className="py-12 px-5 md:px-10 max-w-7xl mx-auto border-t border-slate-100">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-100 p-6 rounded-2xl flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
          >
            <div>
              <p className={`text-2xl md:text-3xl font-extrabold tracking-tight ${stat.textColor} group-hover:scale-105 transition-transform duration-300 origin-left`}>
                {stat.value}
              </p>
              <p className="text-sm font-bold text-slate-800 mt-2 leading-tight">
                {stat.label}
              </p>
            </div>
            <p className="text-xs text-slate-500 mt-2 font-medium">
              {stat.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default StatsBar;

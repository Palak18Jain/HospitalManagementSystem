import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

function Chatbot() {
  const [activeTab, setActiveTab] = useState("helpdesk");
  const [messages, setMessages] = useState([]);
  const [chatStarted, setChatStarted] = useState(false);

  // ✅ QUESTIONS WITH REAL ANSWERS
  const questionGroups = [
    {
      category: "📅 Appointment",
      data: [
        {
          q: "How do I book an appointment?",
          a: "Go to Doctors page → select a doctor → choose time slot → click Book Appointment.",
        },
        {
          q: "Cancel my appointment",
          a: "Go to My Appointments → select booking → click Cancel.",
        },
        {
          q: "Reschedule my booking",
          a: "Open My Appointments → select appointment → choose new time slot.",
        },
        {
          q: "Consultation fee?",
          a: "Fees vary by doctor. You can see it on doctor profile before booking.",
        },
      ],
    },
    {
      category: "👨‍⚕️ Find Doctors",
      data: [
        {
          q: "I need a skin doctor",
          a: "You should consult a Dermatologist. Showing available doctors...",
        },
        {
          q: "Heart specialist",
          a: "You should consult a Cardiologist.",
        },
        {
          q: "Doctors under ₹500",
          a: "You can filter doctors by price on the Doctors page.",
        },
        {
          q: "Female doctors",
          a: "Use filters in Doctors page to select gender preference.",
        },
      ],
    },
    {
      category: "🤒 Symptoms",
      data: [
        {
          q: "I have fever and headache",
          a: "You should consult a General Physician. If symptoms are severe, seek urgent care.",
        },
        {
          q: "Skin rash",
          a: "A Dermatologist is best suited for skin problems.",
        },
        {
          q: "Child has cough",
          a: "You should consult a Pediatrician.",
        },
      ],
    },
    {
      category: "💳 Payments",
      data: [
        {
          q: "How do I pay?",
          a: "You can pay using UPI, card, or net banking during booking.",
        },
        {
          q: "Refund status",
          a: "Refunds are processed within 3-5 business days.",
        },
      ],
    },
    {
      category: "🚨 Emergency",
      data: [
        {
          q: "Chest pain",
          a: "⚠️ This may be serious. Please contact emergency services immediately.",
        },
        {
          q: "Trouble breathing",
          a: "⚠️ Seek urgent medical attention immediately.",
        },
      ],
    },
  ];

  // ✅ HANDLE CLICK
  const handleQuestionClick = (q, a) => {
    setChatStarted(true);

    setMessages((prev) => [
      ...prev,
      { text: q, sender: "user" },
      { text: a, sender: "bot" },
    ]);

    setActiveTab("chat");
  };

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen flex justify-center py-6 px-4">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* HEADER */}
          <div className="bg-[var(--primary)] text-white p-4">

            <div className="flex gap-2 justify-center mb-4">
              <button
                onClick={() => setActiveTab("chat")}
                className={`px-4 py-1 rounded-full text-sm ${
                  activeTab === "chat"
                    ? "bg-white text-[var(--primary)]"
                    : "bg-white/20"
                }`}
              >
                💬 Chat
              </button>

              <button
                onClick={() => setActiveTab("helpdesk")}
                className={`px-4 py-1 rounded-full text-sm ${
                  activeTab === "helpdesk"
                    ? "bg-white text-[var(--primary)]"
                    : "bg-white/20"
                }`}
              >
                🔍 Helpdesk
              </button>
            </div>

            <h2 className="text-center font-semibold text-lg">
              {activeTab === "helpdesk"
                ? "Popular Questions"
                : "Health Assistant"}
            </h2>
          </div>

          {/* CONTENT */}
          <div className="h-[480px] overflow-y-auto p-4">

            {/* HELP DESK */}
            {activeTab === "helpdesk" && (
              <div className="space-y-6">

                {questionGroups.map((group, i) => (
                  <div key={i}>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2">
                      {group.category}
                    </h3>

                    <div className="space-y-2">
                      {group.data.map((item, index) => (
                        <div
                          key={index}
                          onClick={() =>
                            handleQuestionClick(item.q, item.a)
                          }
                          className="bg-gray-50 hover:bg-blue-50 cursor-pointer p-3 rounded-xl transition border text-sm"
                        >
                          {item.q}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

              </div>
            )}

            {/* CHAT */}
            {activeTab === "chat" && (
              <div className="space-y-4">

                {!chatStarted && (
                  <p className="text-center text-gray-400 text-sm">
                    Select a question 👆
                  </p>
                )}

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-2xl text-sm max-w-xs ${
                        msg.sender === "user"
                          ? "bg-[var(--primary)] text-white rounded-br-none"
                          : "bg-gray-100 text-gray-700 rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {/* Back Button */}
                <button
                  onClick={() => setActiveTab("helpdesk")}
                  className="mt-4 w-full bg-gray-800 text-white py-2 rounded-full text-sm"
                >
                  🔍 Back to Helpdesk
                </button>

              </div>
            )}

          </div>

          {/* FOOTER */}
          <div className="border-t p-3 text-xs text-gray-400 text-center">
            Select questions instead of typing 👆
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}

export default Chatbot;
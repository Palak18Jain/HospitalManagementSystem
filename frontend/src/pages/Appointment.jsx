import React, { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import { assets } from "../assets/assets";
import Footer from "../shared/Footer";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";
import { toast } from "react-toastify";

function Appointment() {
    const { docId } = useParams();
    const navigate = useNavigate();
    const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);

    const [docInfo, setDocInfo] = useState(null);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState("");

    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    // ✅ Fetch doctor
    useEffect(() => {
        if (doctors.length > 0) {
            const doc = doctors.find((doc) => String(doc._id || doc.id) === String(docId));
            setDocInfo(doc);
        }
    }, [docId, doctors]);

    // ✅ Generate slots
    const getAvailableSlots = () => {
        let today = new Date();
        let slots = [];

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date();
            currentDate.setDate(today.getDate() + i);

            let timeSlots = [];
            let startTime = new Date(currentDate);
            let endTime = new Date(currentDate);
            endTime.setHours(21, 0, 0, 0); // till 9 PM

            // ✅ Today → start from current time
            if (i === 0) {
                let now = new Date();

                let minutes = now.getMinutes();
                let nextMinutes = minutes < 30 ? 30 : 60;

                startTime.setHours(
                    nextMinutes === 60 ? now.getHours() + 1 : now.getHours(),
                    nextMinutes === 60 ? 0 : 30,
                    0,
                    0
                );
            } else {
                startTime.setHours(10, 0, 0, 0);
            }

            while (startTime < endTime) {
                let time = startTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                });

                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();
                const slotDate = `${year}-${month}-${day}`;

                let slots_booked = docInfo?.slots_booked || {};
                if (typeof slots_booked === 'string') {
                    try {
                        slots_booked = JSON.parse(slots_booked);
                    } catch (e) {
                        slots_booked = {};
                    }
                }

                const isSlotAvailable = !(slots_booked[slotDate] && slots_booked[slotDate].includes(time));

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(startTime),
                        time,
                    });
                }

                startTime.setMinutes(startTime.getMinutes() + 30);
            }

            slots.push({
                date: new Date(currentDate),
                slots: timeSlots,
            });
        }

        setDocSlots(slots);
    };

    const bookAppointment = async () => {
        try {
            if (!token) {
                toast.error("Please login to book an appointment");
                return navigate('/login');
            }

            const date = docSlots[slotIndex].date;

            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            const slotDate = `${year}-${month}-${day}`;
            
            let slots_booked = docInfo.slots_booked || {};
            if (typeof slots_booked === 'string') {
                try {
                    slots_booked = JSON.parse(slots_booked);
                } catch (e) {
                    slots_booked = {};
                }
            }

            if (slots_booked[slotDate] && slots_booked[slotDate].includes(slotTime)) {
                toast.error("Slot already booked");
                return;
            }

            const response = await axios.post(`${backendUrl}/api/user/book-appointment`, {
                doctorId: docId,
                slotDate: slotDate,
                slotTime: slotTime
            }, {
                headers: {
                    token: token
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/my-appointments");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while booking the appointment");
        }
    }
    useEffect(() => {
        if (docInfo) getAvailableSlots();
    }, [docInfo]);

    useEffect(() => {
        if (docSlots.length > 0) {
            // Find the first available day with slots
            for (let i = 0; i < docSlots.length; i++) {
                if (docSlots[i].slots && docSlots[i].slots.length > 0) {
                    setSlotIndex(i);
                    setSlotTime(docSlots[i].slots[0].time);
                    break;
                }
            }
        }
    }, [docSlots]);

    if (!docInfo) return <p className="text-center mt-10">Loading...</p>;

    return (
        <div className="px-4 md:px-10 mt-10 max-w-6xl mx-auto">

            {/* 🔹 DOCTOR CARD */}
            <div className="flex flex-col md:flex-row gap-6 mb-10">

                {/* Image */}
                <div className="bg-[var(--primary)] rounded-xl p-4 flex items-center justify-center">
                    <img
                        src={docInfo.image}
                        alt=""
                        className="h-40 w-40 object-cover rounded-lg"
                    />
                </div>

                {/* Info */}
                <div className="flex-1 border rounded-xl p-6 bg-white shadow-sm">

                    <h2 className="text-2xl font-semibold flex items-center gap-2 text-gray-800">
                        {docInfo.name}
                        <img src={assets.verified_icon} className="h-5" />
                    </h2>

                    <p className="text-gray-600 mt-1">
                        {docInfo.degree} - {docInfo.speciality}
                    </p>

                    <p className="mt-2 text-sm border inline-block px-3 py-1 rounded-full text-gray-600">
                        {docInfo.experience}
                    </p>

                    <p className="mt-4 font-medium flex items-center gap-1 text-gray-700">
                        About
                        <img src={assets.info_icon} className="h-4" />
                    </p>

                    <p className="text-gray-600 text-sm mt-2 leading-6">
                        {docInfo.about}
                    </p>

                    <p className="mt-4 font-medium text-gray-800">
                        Appointment fee:{" "}
                        <span className="text-[var(--primary)] font-semibold">
                            {currencySymbol}{docInfo.fees}
                        </span>
                    </p>

                </div>
            </div>

            {/* 🔹 BOOKING SLOTS */}
            <div className="mt-6">

                <h3 className="text-lg font-semibold mb-4 text-gray-700">
                    Booking slots
                </h3>

                {/* DAYS */}
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {docSlots.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => setSlotIndex(index)}
                            className={`flex flex-col items-center justify-center min-w-[70px] h-20 rounded-full cursor-pointer border transition ${slotIndex === index
                                ? "bg-[var(--primary)] text-white shadow-md"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <p className="text-sm font-medium">
                                {daysOfWeek[item.date.getDay()]}
                            </p>
                            <p className="text-sm">{item.date.getDate()}</p>
                        </div>
                    ))}
                </div>

                {/* TIME */}
                <div className="flex flex-wrap gap-3 mt-6">
                    {docSlots[slotIndex]?.slots.map((slot, i) => (
                        <button
                            key={i}
                            onClick={() => setSlotTime(slot.time)}
                            className={`px-4 py-2 rounded-full border text-sm transition ${slot.time === slotTime
                                ? "bg-[var(--primary)] text-white shadow"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {slot.time}
                        </button>
                    ))}
                </div>

                {/* BUTTON */}
                <button onClick={bookAppointment} className="mt-8 bg-[var(--primary)] text-white px-8 py-3 rounded-full shadow-md hover:scale-105 transition">
                    Book an appointment
                </button>

            </div>
            <RelatedDoctors docId={docInfo._id || docInfo.id} speciality={docInfo.speciality} />

            <Footer />
        </div>
    );
}

export default Appointment;
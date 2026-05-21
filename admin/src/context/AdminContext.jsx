import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const getDoctorImage = (docId) => {
    if (!docId) return assets.doc1;
    const idStr = String(docId);
    const numMatch = idStr.match(/\d+/);
    const num = numMatch ? parseInt(numMatch[0]) : 1;
    const index = ((num - 1) % 15) + 1;
    return assets[`doc${index}`] || assets.doc1;
};

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {

    const [aToken, setAToken] = useState(
        localStorage.getItem("aToken") || ""
    );

    const [doctors, setDoctors] = useState([]);
    const [appoinments, setAppoinments] = useState([]);
    const [dashData, setDashData] = useState(false)

    const backendUrl = "http://localhost:4000";

    // =========================
    // Get All Doctors
    // =========================
    const getAllDoctors = async () => {

        try {

            const { data } = await axios.get(
                `${backendUrl}/api/admin/all-doctors`,
                {
                    headers: { atoken: aToken }
                }
            );

            if (data.success) {

                const mapped = data.doctors.map(doc => {
                    if (!doc.image || doc.image === "" || doc.image === "null" || doc.image === "undefined") {
                        doc.image = getDoctorImage(doc.id || doc._id);
                    }
                    return doc;
                });
                setDoctors(mapped);
                console.log(mapped);

            } else {

                toast.error(data.message);

            }

        } catch (err) {

            toast.error(err.message);

        }
    };

    // =========================
    // Change Availability
    // =========================
    const changeAvailability = async (doctor_id) => {

        try {

            const { data } = await axios.post(
                `${backendUrl}/api/admin/change-availability`,
                { doctor_id },
                {
                    headers: { atoken: aToken }
                }
            );

            if (data.success) {

                toast.success(data.message);
                getAllDoctors();

            } else {

                toast.error(data.message);

            }

        } catch (err) {

            toast.error(err.message);

        }
    };

    // =========================
    // Get All Appointments
    // =========================
    const getAllAppoinments = async () => {

        try {

            const { data } = await axios.get(
                `${backendUrl}/api/admin/appoinments`,
                {
                    headers: { atoken: aToken }
                }
            );

            if (data.success) {

                setAppoinments(data.appoinments);
                console.log(data.appoinments);

            } else {

                toast.error(data.message);

            }

        } catch (err) {

            toast.error(err.message);

        }
    };

    // =========================
    // Cancel Appointment
    // =========================
    const cancelAppoinment = async (appointmentId) => {

        try {

            const { data } = await axios.post(
                `${backendUrl}/api/admin/cancel-appoinment`,
                { appointmentId },
                {
                    headers: { atoken: aToken }
                }
            );

            if (data.success) {

                toast.success(data.message);

                // Refresh Appointments
                getAllAppoinments();
                getDashData();

            } else {

                toast.error(data.message);

            }

        } catch (err) {

            toast.error(err.message);

        }
    };

    const getDashData = async () => {

        try {

            const { data } = await axios.get(
                `${backendUrl}/api/admin/dashboard`,
                {
                    headers: { atoken: aToken }
                }
            );

            if (data.success) {

                setDashData(data.dashData);
                console.log(data.dashData);

            } else {

                toast.error(data.message);

            }

        } catch (err) {

            toast.error(err.message);

        }
    }

    // =========================
    // Context Value
    // =========================
    const value = {

        aToken,
        setAToken,

        backendUrl,

        doctors,
        setDoctors,

        appoinments,
        setAppoinments,

        getAllDoctors,
        changeAvailability,

        getAllAppoinments,

        cancelAppoinment,
        getDashData,
        dashData,
        setDashData

    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
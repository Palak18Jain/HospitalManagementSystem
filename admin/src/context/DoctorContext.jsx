import { createContext, useState, useEffect } from "react";
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

export const DoctorContext = createContext();

const DoctorContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : "");
    const [appoinment, setAppoinment] = useState([]);
     const [dashData,setDashData]=useState(false)

    const getAppointment = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/doctor/appoinmentDoctor", {
                headers: {
                    token: dToken
                }
            });

            if (data.success) {
                setAppoinment(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Something went wrong");
        }
    };

    const completeAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/doctor/complete-appointment",
                { appointmentId },
                { headers: { token: dToken } }
            );
            if (data.success) {
                toast.success(data.message);
                getAppointment();
                getDashData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/doctor/cancel-appointment",
                { appointmentId },
                { headers: { token: dToken } }
            );
            if (data.success) {
                toast.success(data.message);
                getAppointment();
                getDashData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

const getDashData=async()=>{
    try {
        const {data}=await axios.get(backendUrl+"/api/doctor/dashboard",{
            headers:{
                token:dToken
            }
        })
        if(data.success){
            setDashData(data.dashData);
        }else{
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}

    const [profileData, setProfileData] = useState(false);

    const getProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
                headers: {
                    token: dToken
                }
            });
             if (data.success) {
                const doc = data.profileData;
                if (doc && (!doc.image || doc.image === "" || doc.image === "null" || doc.image === "undefined")) {
                    doc.image = getDoctorImage(doc.id || doc._id);
                }
                setProfileData(doc);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Something went wrong");
        }
    };

    const updateProfileData = async (updatedData) => {
        try {
            const { data } = await axios.post(
                backendUrl + "/api/doctor/update-profile",
                updatedData,
                {
                    headers: {
                        token: dToken
                    }
                }
            );
            if (data.success) {
                toast.success(data.message);
                getProfileData();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || "Something went wrong");
        }
    };

    useEffect(() => {
        if (dToken) {
            getAppointment();
            getProfileData();
        } else {
            setAppoinment([]);
        }
    }, [dToken]);

    const value = {
        dToken,
        setDToken,
        backendUrl,
        appoinment,
        getAppointment,
        setAppoinment,
        completeAppointment,
        cancelAppointment,
        setDashData,
        dashData,
        getDashData,
        profileData,
        setProfileData,
        getProfileData,
        updateProfileData
    };

    return (
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;


import jwt from "jsonwebtoken"
import { findDoctors, findById as findDoctorById, updateDoctorSlotsBooked } from "../models/doctorModel.js";
import { findAllAppointments } from "../models/appoinmentModel.js";
import { getAppointmentById, cancelAppointmentById, findUsers } from "../models/userModel.js";






const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })

        } else (

            res.json({ success: false, message: "Invalid Credintials" })
        )

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });

    }


}

// API to get all doctor list for admin pannel

const allDoctors = async (req, res) => {
    try {
        const doctors = await findDoctors()
        res.json({ success: true, doctors })

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });

    }
}

//Api to get all appoinment list 


const appoinmentsAdmin = async (req, res) => {
    try {
        const appoinments = await findAllAppointments();
        const parsedAppointments = appoinments.map(appt => {
            let parsedDocData = {};
            let parsedUserData = {};

            if (typeof appt.docData === 'string') {
                try { parsedDocData = JSON.parse(appt.docData); } catch (e) { }
            } else if (appt.docData) {
                parsedDocData = appt.docData;
            }

            if (typeof appt.userData === 'string') {
                try { parsedUserData = JSON.parse(appt.userData); } catch (e) { }
            } else if (appt.userData) {
                parsedUserData = appt.userData;
            }

            return {
                ...appt,
                docData: parsedDocData,
                userData: parsedUserData
            };
        });
        res.json({ success: true, appoinments: parsedAppointments });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}

//api to cancel appoinments
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const appointment = await getAppointmentById(appointmentId);



        await cancelAppointmentById(appointmentId);

        //releasing doctor slot
        const { docId, slotDate, slotTime } = appointment;
        const doctorData = await findDoctorById(docId);
        let slots_booked = doctorData.slots_booked;

        if (typeof slots_booked === 'string') {
            try { slots_booked = JSON.parse(slots_booked); }
            catch (e) { }
        }

        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(time => time !== slotTime);
        }

        await updateDoctorSlotsBooked(docId, JSON.stringify(slots_booked));
        res.json({ success: true, message: "Appointment cancelled successfully" });

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}

//API  to get dashboard data for admin pannel


const adminDashboard = async (req, res) => {
    try {
        const doctors = await findDoctors();
        const appointments = await findAllAppointments();
        const users = await findUsers();

        const parsedAppointments = appointments.map(appt => {
            let parsedDocData = {};
            let parsedUserData = {};

            if (typeof appt.docData === 'string') {
                try { parsedDocData = JSON.parse(appt.docData); } catch (e) { }
            } else if (appt.docData) {
                parsedDocData = appt.docData;
            }

            if (typeof appt.userData === 'string') {
                try { parsedUserData = JSON.parse(appt.userData); } catch (e) { }
            } else if (appt.userData) {
                parsedUserData = appt.userData;
            }

            return {
                ...appt,
                docData: parsedDocData,
                userData: parsedUserData
            };
        });

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: parsedAppointments.slice().reverse().slice(0, 5)
        }
        res.json({ success: true, dashData })
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}


export { loginAdmin, allDoctors, appoinmentsAdmin, appointmentCancel, adminDashboard };
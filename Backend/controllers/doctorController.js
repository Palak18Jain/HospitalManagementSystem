import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import { createDoctor,findDoctors, findByEmail, findById, findByIdAndUpdate, updateDoctorSlotsBooked, updateDoctorProfileById } from "../models/doctorModel.js";
import * as appointmentModel from "../models/appoinmentModel.js";

const addDoctors = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address_line1,
      address_line2,
      phone
    } = req.body;




    // const imagefile = req.file;

    // ✅ validation
    if (
      !name || !email || !password || !speciality ||
      !degree || !experience || !about || !fees 
    ) {
      return res.json({ success: false, message: "Missing Details or Image" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Weak Password" });
    }

    const exists = await findByEmail(email)
    console.log(exists)

    if(exists){
      return res.json({ success: false, message: "Email already exists, Please Login" });
    }

    // ✅ hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // // ✅ upload image
    // // const imageUploaded = await cloudinary.uploader.upload(
    // //   imagefile.path,
    // //   { resource_type: "image" }
    // // );

    // // const imageUrl = imageUploaded.secure_url;

    // ✅ prepare data
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      available: true,
      fees,
      address1: address_line1 ?? null,
      address2: address_line2 ?? null,
      phone: phone ?? null,
      image: null
    };

    // ✅ save to DB
    const result = await createDoctor(doctorData);

    return res.json({
      success: true,
      message: "Doctor Added Successfully",
      id: result.insertId
    });

  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};



const changeAvailability = async (req, res) => {
  try {
    const { doctor_id } = req.body;
    const docData= await findById(doctor_id);
    await findByIdAndUpdate (doctor_id,{
      available:!docData.available
    })
    return res.json({
      success: true,
      message: "Availability Changed Successfully"
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
}

const doctorList = async(req,res) => {
  try {
    const doctors = await findDoctors();
    return res.json({
      success: true,
      doctors
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
}

//api to doctor login
const loginDoctor = async(req,res) => {
  try {
    const {email,password} = req.body;
    const doctorData = await findByEmail(email);
    if(!doctorData){
      return res.json({ success: false, message: "Doctor Not Found" });
    }
    const isMatch = await bcrypt.compare(password,doctorData.password);
    if(!isMatch){
      return res.json({ success: false, message: "Incorrect Password" });
    }
    const token = jwt.sign({id:doctorData.id},process.env.JWT_SECRET);
    return res.json({
      success: true,
      token,
      doctorData
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
}

//API to get doctor appoinment for doctor panel
const appoinmentDoctor = async (req, res) => {
  try {
    const doctor_id = req.body.docId;

    // fetch appointments
    const appointments = await appointmentModel.getAppointmentsForDoctor(doctor_id);

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

    return res.json({
      success: true,
      appointments: parsedAppointments
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
}

// API to mark appointment as completed
const appointmentComplete = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointment = await appointmentModel.getAppointmentById(appointmentId);

    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }
    if (String(appointment.docId) !== String(docId)) {
      return res.json({ success: false, message: "Unauthorized Action" });
    }

    await appointmentModel.completeAppointmentById(appointmentId);
    return res.json({ success: true, message: "Appointment Completed" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
}

// API to cancel appointment
const appointmentCancel = async (req, res) => {
  try {
    const { docId, appointmentId } = req.body;
    const appointment = await appointmentModel.getAppointmentById(appointmentId);

    if (!appointment) {
      return res.json({ success: false, message: "Appointment not found" });
    }
    if (String(appointment.docId) !== String(docId)) {
      return res.json({ success: false, message: "Unauthorized Action" });
    }

    await appointmentModel.cancelAppointmentById(appointmentId);

    // release doctor slot
    const { slotDate, slotTime } = appointment;
    const doctorData = await findById(docId);
    let slots_booked = doctorData.slots_booked;

    if (typeof slots_booked === 'string') {
      try { slots_booked = JSON.parse(slots_booked); }
      catch (e) { }
    } else if (!slots_booked) {
      slots_booked = {};
    }

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(time => time !== slotTime);
    }

    await updateDoctorSlotsBooked(docId, JSON.stringify(slots_booked));
    return res.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
}

//API to get dashboard data for doctor panel
 

const doctorDashboardData = async (req, res) => {
  try {
    const { docId } = req.body;
    const appointments = await appointmentModel.getAppointmentsForDoctor(docId);

    let earnings = 0;
    appointments.forEach((item) => {
      if (item.isComplete) {
        earnings += Number(item.amount);
      }
    });

    let patientIds = [];
    appointments.forEach((item) => {
      if (!patientIds.includes(item.userId)) {
        patientIds.push(item.userId);
      }
    });

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
      earning: earnings,
      appointments: appointments.length,
      patients: patientIds.length,
      latestAppointments: parsedAppointments.reverse().slice(0, 5)
    };

    return res.json({
      success: true,
      dashData
    });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
}


//API to get  doctor profile for doctor pannel
const doctorProfile = async (req, res) => {
  try {
    const { docId } = req.body;
    const profileData = await findById(docId);
    if (!profileData) {
      return res.json({ success: false, message: "Doctor not found" });
    }
    delete profileData.password;
    return res.json({ success: true, profileData });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
}

//API to update doctor profile data from doctor panel
const updateDoctorProfile = async (req, res) => {
  try {
    const { docId, fees, address, available, about, phone } = req.body;

    if (!docId) {
      return res.json({ success: false, message: "Doctor Id is required" });
    }

    const doctorData = await findById(docId);
    if (!doctorData) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // Handle address flexibility: either line1/line2 or address1/address2 directly or via address object/string
    let address1 = req.body.address1;
    let address2 = req.body.address2;
    if (address) {
      let parsedAddress = address;
      if (typeof address === 'string') {
        try {
          parsedAddress = JSON.parse(address);
        } catch (e) {
          address1 = address;
        }
      }
      if (typeof parsedAddress === 'object' && parsedAddress !== null) {
        address1 = parsedAddress.line1 || parsedAddress.address1 || address1;
        address2 = parsedAddress.line2 || parsedAddress.address2 || address2;
      }
    }

    const updatedFees = fees !== undefined ? fees : doctorData.fees;
    const updatedAddress1 = address1 !== undefined ? address1 : doctorData.address1;
    const updatedAddress2 = address2 !== undefined ? address2 : doctorData.address2;
    const updatedAvailable = available !== undefined ? (available === true || available === 'true' || available === 1 || available === '1' ? 1 : 0) : doctorData.available;
    const updatedAbout = about !== undefined ? about : doctorData.about;
    const updatedPhone = phone !== undefined ? phone : doctorData.phone;
    const updatedImage = doctorData.image;

    await updateDoctorProfileById(docId, {
      fees: updatedFees,
      address1: updatedAddress1,
      address2: updatedAddress2,
      available: updatedAvailable,
      about: updatedAbout,
      phone: updatedPhone,
      image: updatedImage
    });

    return res.json({ success: true, message: "Profile Updated Successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
}

export { addDoctors, changeAvailability, doctorList, loginDoctor, appoinmentDoctor, appointmentComplete, appointmentCancel, doctorDashboardData, doctorProfile, updateDoctorProfile };
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findByEmail, findById, updateUserProfile, createAppoinment, getAppointmentByUserId, getAppointmentById, cancelAppointmentById, updateAppointmentPaymentStatus } from "../models/userModel.js";
import { findById as findDoctorById, updateDoctorSlotsBooked } from "../models/doctorModel.js";
import razorpay from "razorpay";

//Api for user register 

const registerUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;

        if (!name || !password || !email) {
            return res.status(400).json({ success: false, message: "Please provide all the details" });
        }

        //validate email

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid Email" });
        }

        //validate password

        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }


        //hashed password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const userdata = {
            name,
            password: hashedPassword,
            email
        }

        const result = await createUser(userdata);
        //token
        const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({
            success: true,
            message: "User registered successfully",
            id: result.insertId,
            token
        })



    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await findByEmail(email)


        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }
        else {
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET)
                res.json({ success: true, token })
            } else {
                return res.json({ success: false, message: "invalid Credentials" });

            }

        }
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });

    }
}


//api to get user Profile Data

const getProfileData = async (req, res) => {
    try {
        const { userId } = req.body
        const userdata = await findById(userId)
        if (!userdata) {
            return res.json({ success: false, message: "User does not exist" });
        }
        else {
            delete userdata.password;
            res.json({ success: true, userdata })
        }
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}


const updateProfile = async (req, res) => {
    try {
        const { userId, name, dob, gender, phone, address, image } = req.body;
        // const imageFile = req.file

        if (!userId) {
            return res.json({ success: false, message: "User Id is required" });
        }

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "Data Missing" })
        }

        const userdata = await findById(userId);
        if (!userdata) {
            return res.json({ success: false, message: "User does not exist" });
        }

        let parsedAddress = address;
        if (typeof address === 'string') {
            try {
                parsedAddress = JSON.parse(address);
            } catch (e) {
                // It might not be a JSON string, just save it as is
            }
        }

        await updateUserProfile(userId, { name, phone, address: parsedAddress, dob, gender, image });

        // if(imageFile){
        //     //upload image to cloudinary
        // }

        res.json({ success: true, message: "Profile updated successfully" });

    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}



//api to book appoinment 

const bookAppointment = async (req, res) => {
    try {
        const { userId, doctorId, slotDate, slotTime } = req.body;

        const docData = await findDoctorById(doctorId);
        if (!docData) {
            return res.json({ success: false, message: "Doctor not found" });
        }
        if (!docData.available) {
            return res.json({ success: false, message: "Doctor is not available" });
        }

        let slots_booked = docData.slots_booked;
        if (typeof slots_booked === 'string') {
            try {
                slots_booked = JSON.parse(slots_booked);
            } catch (e) {
                slots_booked = {};
            }
        } else if (!slots_booked) {
            slots_booked = {};
        }

        // checking for slot available
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot is not available" });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await findById(userId); // Use userModel's findById
        const appointmentData = {
            userId: userId,
            docId: doctorId,
            slotDate: slotDate,
            slotTime: slotTime,
            userData: JSON.stringify(userData),
            docData: JSON.stringify(docData),
            amount: docData.fees,
            date: Date.now()
        };
        const newAppointment = await createAppoinment(appointmentData);

        await updateDoctorSlotsBooked(doctorId, JSON.stringify(slots_booked));
        res.json({ success: true, message: "Appointment booked successfully" });


    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }

    //api to get user appointments


}

const getUserAppointments = async (req, res) => {
    try {
        const { userId } = req.body;
        const appointments = await getAppointmentByUserId(userId);
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
        res.json({ success: true, appointments: parsedAppointments });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}


const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;
        const appointment = await getAppointmentById(appointmentId);

        if (!appointment) {
            return res.json({ success: false, message: "Appointment not found" });
        }
        if (String(appointment.userId) !== String(userId)) {
            return res.json({ success: false, message: "Unauthorized Action" });
        }

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






//razorpay whole logic 
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
}); 


//api for payment appoinment using razorpay
const razorpayPayment = async(req,res)=>{
    try{

        const {appointmentId} = req.body;
        const appointmentData = await getAppointmentById(appointmentId);

        if (!appointmentData || appointmentData.cancelled){
            return res.json({success:false,message:"Appointment not found or cancelled"});
        }
        
//creating options for razorpay payment
    const options ={
        amount:appointmentData.amount *100,
        currency:process.env.RAZORPAY_CURRENCY,
        receipt:String(appointmentData.id),
        payment_capture:1
    }

    const order = await razorpayInstance.orders.create(options);
    return res.json({success:true,message:"Payment created successfully",order});
    

    }catch(error){
        console.error(error);
        return res.json({success:false,message:error.message});
    }
}

//api for verify razorpay payment
const verifyRazorpayPayment = async(req,res)=>{
    try{
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        if (orderInfo.status === 'paid') {
            await updateAppointmentPaymentStatus(orderInfo.receipt, true);
            return res.json({ success: true, message: "Payment successful" });
        } else {
            return res.json({ success: false, message: "Payment failed" });
        }
    }catch(error){
        console.error(error);
        return res.json({success:false,message:error.message});
    }
}


export { registerUser, loginUser, getProfileData, updateProfile, bookAppointment, getUserAppointments, cancelAppointment,razorpayPayment ,verifyRazorpayPayment};
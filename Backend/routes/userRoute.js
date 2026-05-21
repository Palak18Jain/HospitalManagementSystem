import express from "express";
import {loginUser, registerUser,getProfileData, updateProfile, bookAppointment, getUserAppointments, cancelAppointment,razorpayPayment, verifyRazorpayPayment}  from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";



const userrouter = express.Router();

userrouter.post("/register",registerUser);
userrouter.post("/login",loginUser);
userrouter.get("/profile",authUser,getProfileData);
userrouter.post("/update-profile",authUser,updateProfile);
userrouter.post("/book-appointment",authUser,bookAppointment);
userrouter.get("/appointments",authUser,getUserAppointments);
userrouter.post("/cancel-appointment",authUser,cancelAppointment);
userrouter.post("/razorpay-payment",authUser,razorpayPayment);
userrouter.post("/verify-payment",authUser,verifyRazorpayPayment);




export default userrouter;
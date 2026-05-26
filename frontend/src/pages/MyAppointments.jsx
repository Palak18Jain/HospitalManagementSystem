import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";
import Navbar from "../shared/Navbar";
import { assets } from "../assets/assets";

const getDoctorImage = (docId) => {
    if (!docId) return assets.doc1;
    const idStr = String(docId);
    const numMatch = idStr.match(/\d+/);
    const num = numMatch ? parseInt(numMatch[0]) : 1;
    const index = ((num - 1) % 15) + 1;
    return assets[`doc${index}`] || assets.doc1;
};

function MyAppointments() {
  const { backendUrl,token,getDoctorsData } = useContext(AppContext);
 const [appoinments,setAppoinments]=useState([]);


  const getuserAppointment = async () => {
    try{
      const {data}=await axios.get(`${backendUrl}/api/user/appointments`,{
        headers:{
          token
        }
      })
      if(data.success){
        const mapped = data.appointments.reverse().map(appt => {
          if (appt.docData && (!appt.docData.image || appt.docData.image === "" || appt.docData.image === "null" || appt.docData.image === "undefined")) {
            appt.docData.image = getDoctorImage(appt.docData.id || appt.docId);
          }
          return appt;
        });
        setAppoinments(mapped);
      }
    }
    catch(error){
      console.log(error);
      toast.error("Error fetching appointments"); 
    }
  }


  const cancelAppointment = async (appointmentId) => {
    const isConfirmed = window.confirm("Are you sure you want to cancel this appointment?");
    if (!isConfirmed) {
      return;
    }
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/cancel-appointment`, { appointmentId }, {
        headers: { token }
      });
      if (data.success) {
        toast.success(data.message);
        getuserAppointment(); // Refresh list to show updated status
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }


  const initPay = (order)=>{
    const options = {
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name: "Appointment Payment",
      description:"Payment for appointment",
      order_id:order.id,
      receipt:order.receipt,
      handler: async function(response){
        try {
          const { data } = await axios.post(`${backendUrl}/api/user/verify-payment`, {
            razorpay_order_id: response.razorpay_order_id
          }, { headers: { token } });
          
          if (data.success) {
            toast.success(data.message);
            getuserAppointment(); // Refresh list to show updated status
            if (getDoctorsData) getDoctorsData();
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    }
    const rzp = new window.Razorpay(options);
    rzp.open();

  }
  const appoinmentRazorpay = async(appointmentId)=>{
    try{
      const {data}=await axios.post(`${backendUrl}/api/user/razorpay-payment`,{appointmentId},{
        headers:{
          token
        }
      })
      if(data.success){
      initPay(data.order)
      }else{
        toast.error(data.message);
      }
    }
    catch(error){
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (token) {
      getuserAppointment();
    }
  }, [token]);
  return (

   <>
   <Navbar/>
    <div className="px-4 md:px-10 py-10 bg-gray-50 min-h-screen">

      {/* Heading */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        My Appointments
      </h2>

      {/* Appointment List */}
      <div className="space-y-6">

        {appoinments.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row gap-6 bg-white p-5 rounded-xl shadow-sm border"
          >

            {/* Doctor Image */}
            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={item.docData?.image}
                alt={item.docData?.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Doctor Info */}
            <div className="flex-1">

              <h3 className="text-lg font-semibold text-gray-800">
                {item.docData?.name}
              </h3>

              <p className="text-gray-500 text-sm">
                {item.docData?.speciality}
              </p>

              <p className="text-sm mt-3 text-gray-600">
                <span className="font-medium">Address:</span><br />
                {item.docData?.address1}, {item.docData?.address2}
              </p>

              <p className="text-sm mt-2 text-gray-600">
                <span className="font-medium">Date & Time:</span> {item.slotDate} | {item.slotTime}
              </p>

            </div>

              {/* Buttons */}
            <div className="flex flex-col justify-between gap-3 md:items-end">

              {/* Payment Button */}
              {!item.cancelled && item.payment == 0 && (
                <button onClick={() => appoinmentRazorpay(item.id)} className="bg-[var(--primary)] text-white px-6 py-2 rounded-md hover:opacity-90 transition">
                  Pay here
                </button>
              )}
              
              {!item.cancelled && item.payment == 1 && (
                <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:opacity-90 transition cursor-default">
                  Paid
                </button>
              )}

              {/* Cancel Button */}
              {!item.cancelled && (
                <button onClick={() => cancelAppointment(item.id)} className="border px-6 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition">
                  Cancel appointment
                </button>
              )}
              
              {item.cancelled ? (
                <button className="border border-red-500 text-red-500 px-6 py-2 rounded-md cursor-not-allowed" disabled>
                  Appointment Cancelled
                </button>
              ) : null}

            </div>

          </div>
        ))}

      </div>

    </div>
   </>
  );
}

export default MyAppointments;
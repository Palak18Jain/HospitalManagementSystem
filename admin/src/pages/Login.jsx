import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext";


function Login() {
    const [state, setState] = useState("Admin");
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


     const {setDToken}=useContext(DoctorContext)
    //distucture admincontext things
    const { setAToken, backendUrl } = useContext(AdminContext)
   



    const onSubmitHandler = async (event) => {
        event.preventDefault()

        try {
            if (state === 'Admin') {


                const{data} = await axios.post(backendUrl + '/api/admin/login',{email,password})

                if(data.success){
                    localStorage.setItem('aToken',data.token)
                    setAToken(data.token)

                }else{
                    toast.error(data.message);
                }






            } else {

                const{data} = await axios.post(backendUrl + '/api/doctor/login',{email,password})

                if(data.success){
                    localStorage.setItem('dToken',data.token)
                    setDToken(data.token)

                }else{
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form onSubmit={onSubmitHandler} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">

                {/* Heading */}
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-bold text-indigo-600">
                        {state} Login
                    </h2>
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Email
                    </label>
                    <input onChange={(e) => {
                        setEmail(e.target.value)

                    }} value={email}
                        type="email"
                        required
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                </div>

                {/* Password */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Password
                    </label>
                    <input onChange={(e) => {
                        setPassword(e.target.value)

                    }} value={password}
                        type="password"
                        required
                        placeholder="Enter your password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition duration-300"
                >
                    Login
                </button>

                {/* Toggle Login */}
                <p className="text-sm text-gray-600 mt-4 text-center">
                    {state === "Admin" ? (
                        <>
                            Doctor Login?{" "}
                            <span
                                onClick={() => setState("Doctor")}
                                className="text-indigo-600 cursor-pointer font-medium hover:underline"
                            >
                                Click here
                            </span>
                        </>
                    ) : (
                        <>
                            Admin Login?{" "}
                            <span
                                onClick={() => setState("Admin")}
                                className="text-indigo-600 cursor-pointer font-medium hover:underline"
                            >
                                Click here
                            </span>
                        </>
                    )}
                </p>
            </form>
        </div>
    );
}

export default Login;
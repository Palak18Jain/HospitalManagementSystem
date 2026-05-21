import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const { token, setToken, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const { data } = await axios.post(backendUrl + "/api/user/register", {
        name,
        email,
        password,
      });

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Account created successfully");
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <> 
      <Navbar/>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={onSubmitHandler}
          className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md"
        >
          {/* Heading */}
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Create Account
          </h2>

          <p className="text-sm text-gray-500 text-center mt-2">
            Sign up to book appointment
          </p>

          {/* Inputs */}
          <div className="mt-6 space-y-4">
            <div>
              <label className="text-sm text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--primary)] outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Button */}
          <button 
            type="submit"
            className="w-full mt-6 bg-[var(--primary)] text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            Create Account
            

          </button>

          {/* Redirect */}
          <p className="text-sm text-gray-500 text-center mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-[var(--primary)] cursor-pointer font-medium"
            >
              Login here
            </span>
          </p>
        </form>
      </div>
    </>
  );
}

export default Register;
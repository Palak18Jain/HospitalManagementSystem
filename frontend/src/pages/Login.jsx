import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const { token, setToken, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === "Sign up") {
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
      } else {
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Logged in successfully");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <form
          onSubmit={onSubmitHandler}
          className="bg-white w-full max-w-md p-8 rounded-2xl shadow-md"
        >
          {/* Heading */}
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            {state === "Sign up" ? "Create Account" : "Login"}
          </h2>

          <p className="text-sm text-gray-500 text-center mt-2">
            {state === "Sign up"
              ? "Please sign up to book an appointment"
              : "Login to your account"}
          </p>

          {/* Inputs */}
          <div className="mt-6 space-y-4">
            {state === "Sign up" && (
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
            )}

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
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full mt-6 bg-[var(--primary)] text-white py-2 rounded-lg hover:opacity-90 transition"
          >
            {state === "Sign up" ? "Create Account" : "Login"}
          </button>

          {/* Redirect */}
          {state === "Sign up" ? (
            <p className="text-sm text-gray-500 text-center mt-4">
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-[var(--primary)] cursor-pointer font-medium"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-500 text-center mt-4">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-[var(--primary)] cursor-pointer font-medium"
              >
                Sign up
              </span>
            </p>
          )}
        </form>
      </div>
    </>
  );
}

export default Login;
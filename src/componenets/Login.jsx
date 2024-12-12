import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      // Store the token in localStorage
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("email", email);
      alert("LoggedIn successfully");
      // Redirect to the dashboard or home page after successful login
      navigate("/employee-dashboard"); // Replace with your desired path
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <motion.div
        className="w-full max-w-md p-8  rounded-xl shadow-lg bg-black mx-4 border-2 border-slate-600"
        initial={{ opacity: 0, scale: 0.95, y: -400 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, duration: 0.8 }}
      >
        <div className="text-center mb-6">
          <motion.h1
            className="text-4xl font-extrabold text-slate-200"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            Login
          </motion.h1>
        </div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-md font-medium text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-4 mt-2 bg-gray-100 rounded-md text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-600  transition-all"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-ms font-medium text-gray-200"
            >
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              required
              className="w-full p-4 mt-2 bg-gray-100 rounded-md text-gray-900 focus:outline-none focus:ring-4 focus:ring-indigo-600  transition-all"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-900"
            >
              {passwordVisible ? (
                <FaEyeSlash size={30} className="mt-6" />
              ) : (
                <FaEye size={30} className="mt-6" />
              )}
            </button>
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 mt-2  text-md rounded-md  hover:ring-white hover:bg-transparent hover:text-white  border-2 bg-white text-slate-900"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            Login
          </motion.button>
        </form>
        <div className="text-center mt-7">
          <p className="text-md text-gray-200">
            Are you Admin?&nbsp;
            <Link
              to="/admin-login"
              className="text-indigo-500 text-md hover:text-white"
            >
              admin login
            </Link>
          </p>
        </div>

        <div className="text-center mt-2">
          <p className="text-md text-gray-200">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-500 text-md hover:text-white"
            >
              register
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

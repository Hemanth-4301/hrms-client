import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    position: "",
    department: "",
    hireDate: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (formData.password.length < 6) {
        alert("Password length should be atleast 6");
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/register",
          formData
        );
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center bg-black py-20">
      <motion.div
        className="w-full max-w-md p-8 rounded-xl shadow-lg bg-black mx-4 border-2 border-slate-600"
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
            Register
          </motion.h1>
        </div>

        <form className="space-y-6" onSubmit={handleRegister}>
          {["name", "email", "dob", "position", "department", "hireDate"].map(
            (field) => (
              <div className="mb-4" key={field}>
                <label className="block mb-2 text-md font-medium text-gray-200 capitalize">
                  {field}
                </label>
                <input
                  required
                  type={
                    field === "dob" || field === "hireDate" ? "date" : "text"
                  }
                  className="w-full p-4 mt-2 bg-gray-100 rounded-md text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-600  transition-all"
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                />
              </div>
            )
          )}

          {/* Gender Radio Buttons */}
          <div className="mb-4">
            <label className="block mb-2 text-md font-medium text-gray-200">
              Gender
            </label>
            <div className="flex items-center space-x-6">
              <div>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleInputChange}
                  className="text-indigo-500 "
                />
                <label htmlFor="male" className="ml-2 text-gray-200">
                  Male
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleInputChange}
                  className="text-indigo-500 focus:ring-indigo-500"
                />
                <label htmlFor="female" className="ml-2 text-gray-200">
                  Female
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleInputChange}
                  className="text-indigo-500 focus:ring-indigo-500"
                />
                <label htmlFor="other" className="ml-2 text-gray-200">
                  Other
                </label>
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div className="relative mb-4">
            <label
              htmlFor="password"
              className="block text-md font-medium text-gray-200"
            >
              Password
            </label>
            <input
              required
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full p-4 mt-2 bg-gray-100 rounded-md text-gray-800 focus:outline-none focus:ring-4 focus:ring-indigo-600  transition-all"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-900"
            >
              {showPassword ? (
                <FaEyeSlash size={30} className="mt-6" />
              ) : (
                <FaEye size={30} className="mt-6" />
              )}
            </button>
          </div>

          {/* Register Button */}
          <motion.button
            type="submit"
            className="w-full py-3 mt-2 text-md rounded-md hover:ring-white hover:bg-transparent hover:text-white border-2 bg-white text-slate-900"
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            Register
          </motion.button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4">
          <p className="text-md text-gray-200">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-500 text-md hover:text-white"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

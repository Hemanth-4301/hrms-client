import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import hero from "../assets/hbg7.jpg";
import ParticlesComponent from "./Particles";
import { FaRocket } from "react-icons/fa";

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("authToken");
    const adminToken = localStorage.getItem("adminToken");
    if (token) {
      navigate("/employee-dashboard");
    } else if (adminToken) {
      navigate("/admin-dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="relative bg-black overflow-x-hidden">
      <ParticlesComponent id="particles" />

      <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:flex md:items-center text-left">
        {/* Left Side Image */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={hero} // Sample image, replace with your own image URL
            alt="Human Resource"
            className="w-full h-auto rounded-3xl shadow-lg transform transition duration-500 hover:scale-105"
          />
        </motion.div>

        {/* Right Side Content */}
        <motion.div
          className="md:w-1/2 mt-8 md:mt-0 md:ml-16 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-4xl px-3 text-left font-bold text-gray-200 mb-4"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            HUMAN RESOURCE MANAGEMENT SYSTEM
          </motion.h1>
          <motion.p
            className="text-lg text-left px-3 text-gray-300 mb-6"
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            A comprehensive solution to manage employee records, track
            attendance, handle leave requests, and optimize workforce
            management. Manage your HR tasks efficiently with our user-friendly
            system designed to save time and streamline operations.
          </motion.p>
          <motion.button
            onClick={handleGetStarted}
            className=" text-black bg-white px-6 ms-2 py-3 border-2 border-white  rounded-xl hover:bg-transparent hover:text-white text-lg font-semibold shadow-lg "
            initial={{ opacity: 0, y: 7 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="flex gap-2">
              <FaRocket size={20} className="mt-1 hover:animate-spin" />
              Get Started
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;

import React from "react";
import { motion } from "framer-motion";
import Hero from "./Hero";

const features = [
  {
    title: "Employee Dashboard",
    description:
      "Centralized dashboard for employees to view and manage tasks.",
  },
  {
    title: "Employee Leave Application",
    description:
      "Streamlined leave application process for employees to request leaves hassle-free.",
  },
  {
    title: "Employee CRUD Operations by Admin",
    description:
      "Admins can create, read, update, and delete employee records with ease.",
  },
  {
    title: "Admin Leave Approval/Reject",
    description:
      "Quick and seamless leave approval or rejection process for administrators.",
  },
  {
    title: "User-Friendly UI",
    description:
      "Designed with an intuitive and visually appealing interface for smooth usage.",
  },
  {
    title: "Employee Tracking",
    description: "Monitor and maintain employees records accurately.",
  },
];

const Features = () => {
  return (
    <div>
      <Hero />
      <div className=" bg-black pb-16 px-6 md:pt-5">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 relative">
          Advantages of the System
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mx-2 lg:mx-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transform transition-all text-white"
              initial={{ opacity: 0, rotateY: -15 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Card Design */}
              <div className="absolute -top-4 -right-4 w-10 h-10 bg-gray-700 rounded-full border border-gray-500 flex items-center justify-center">
                <span className="text-sm text-gray-300 font-bold">
                  {index + 1}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;

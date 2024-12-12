import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import profile from "../assets/profile.jpg";

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});

  const email = localStorage.getItem("email");

  const getDetails = async () => {
    if (email) {
      try {
        const response = await axios.get(
          `https://hrms-api-nph3.onrender.com/api/employeeDashboard/${email}`
        );
        const filteredDetails = Object.entries(response.data).reduce(
          (acc, [key, value]) => {
            if (key !== "__v" && key !== "_id") {
              acc[key] = value;
            }
            return acc;
          },
          {}
        );
        setUserDetails(filteredDetails);
      } catch (error) {
        console.error("Error fetching employee details:", error);
      }
    }
  };

  getDetails();

  const handleDeleteAccount = () => {
    const confirmDelete = window.confirm(
      "Are you sure? This will delete all your data."
    );
    if (confirmDelete && email) {
      axios
        .delete(
          `https://hrms-api-nph3.onrender.com/api/employeeDashboard/delete`,
          {
            data: { email },
          }
        )
        .then(() => {
          localStorage.removeItem("email");
          localStorage.removeItem("authToken");
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
        });
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-black text-white p-4 sm:p-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6 py-6">
        {/* User Details */}
        <div className="flex-grow text-center ">
          {/* Profile Image */}
          <motion.div
            className="flex justify-center my-5"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={profile}
              alt="Profile"
              className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-cover rounded-full border-4 border-gray-700 shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105"
            />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-100 text-center">
            Employee Profile
          </h2>
          <motion.div
            className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md transform transition-all duration-300 "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-300 mb-3">
              {userDetails?.name || "John Doe"}
            </h3>
            <div className="grid gap-3 text-sm sm:text-base">
              {Object.entries(userDetails).map(
                ([key, value]) =>
                  key !== "name" && (
                    <div
                      key={key}
                      className="flex justify-between items-center"
                    >
                      <span className="font-medium text-gray-400 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}:
                      </span>
                      <span className="text-gray-200">{value || "N/A"}</span>
                    </div>
                  )
              )}
            </div>
          </motion.div>

          {/* Delete Account Button */}
          <motion.button
            onClick={handleDeleteAccount}
            className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-full shadow-lg transform transition-all duration-300 hover:scale-105  "
            whileTap={{ scale: 0.95 }}
          >
            Delete Account
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default EmployeeDashboard;

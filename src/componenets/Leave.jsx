import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Leave = () => {
  const [leaveData, setLeaveData] = useState([]);
  const [form, setForm] = useState({
    employeeName: "",
    email: "",
    reason: "",
    date: "",
  });

  const fetchLeaves = async () => {
    try {
      const email = localStorage.getItem("email"); // Assume email is stored after login
      const response = await axios.get(
        `http://localhost:5000/api/leave/employee/${email}`
      );
      setLeaveData(response.data);
    } catch (error) {
      console.error("Error fetching leaves", error);
    }
  };

  fetchLeaves();

  const applyLeave = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/leave/apply", form);
      alert("Leave applied successfully");
      setForm({ employeeName: "", email: "", reason: "", date: "" });
      fetchLeaves();
    } catch (error) {
      console.error("Error applying for leave", error);
    }
  };

 

  return (
    <div className="px-5  overflow-hidden bg-black">
      <motion.div
        className="max-w-3xl   p-6  bg-black text-slate-200 rounded-lg shadow-lg my-16 mx-auto  border-2 border-slate-700"
        initial={{ opacity: 0, y: 200 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.5, stiffness: 100 }}
      >
        <div className="mb-8 ">
          <h2 className="text-2xl font-bold mb-4 text-center ">
            Apply for Leave
          </h2>
          <form onSubmit={applyLeave} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={form.employeeName}
              onChange={(e) =>
                setForm({ ...form, employeeName: e.target.value })
              }
              className="w-full p-2 bg-slate-200 text-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2 bg-slate-200 text-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              required
            />
            <textarea
              placeholder="Reason"
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className="w-full p-2 bg-slate-200 text-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              required
            ></textarea>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full p-2 bg-slate-200 text-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500"
              required
            />
            <button
              type="submit"
              className="w-full py-2 bg-black border-2 text-slate-200 rounded-md hover:bg-slate-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-slate-500"
            >
              Apply
            </button>
          </form>
        </div>
        <hr></hr>
        <div className="mb-8 ">
          <h3 className="text-xl font-bold my-6 text-center">
            Your Leave Requests
          </h3>
          {leaveData.length === 0 && (
            <h1 className="text-center font-bold text-lg ">No history</h1>
          )}
          <ul className="space-y-4 max-h-[500px] overflow-y-auto">
            {leaveData.map((leave) => (
              <li
                key={leave._id}
                className="p-4 bg-slate-200 rounded-md  text-slate-900 flex justify-between  items-center flex-wrap gap-3"
              >
                <span>{leave.date}</span>
                <span>{leave.reason}</span>
                <span
                  className={`px-2 py-1 rounded-md text-sm font-semibold ${
                    leave.status === "Pending"
                      ? "bg-black text-white"
                      : leave.status === "Accepted"
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {leave.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        
      </motion.div>
    </div>
  );
};

export default Leave;

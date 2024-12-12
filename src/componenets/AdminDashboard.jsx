import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmployeeTable from "./EmployeeTable";

const AdminDashboard = () => {
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const [admins, setAdmins] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [leaves, setLeaves] = useState([]);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(
        "https://hrms-api-nph3.onrender.com/api/leave/admin"
      );
      setLeaves(response.data);
    } catch (error) {
      console.error("Error fetching leaves", error);
    }
  };
  fetchLeaves();

  const updateLeaveStatus = async (id, status) => {
    try {
      await axios.put(
        `https://hrms-api-nph3.onrender.com/api/leave/update/${id}`,
        {
          status,
        }
      );
      fetchLeaves();
    } catch (error) {
      console.error("Error updating leave status", error);
    }
  };

  const apiBaseURL = "https://hrms-api-nph3.onrender.com/api/admin"; // Update to match your backend

  useEffect(() => {
    axios
      .get("https://hrms-api-nph3.onrender.com/api/leave/admin")
      .then((res) => setLeaves(res.data))
      .catch((err) => console.error(err));
  }, []);

  const updateStatus = (leaveId, status) => {
    const adminComment = prompt("Enter admin comment:");
    axios
      .patch(`/api/leave/update/${leaveId}`, { status, adminComment })
      .then(() => {
        alert("Status updated");
        setLeaves((prev) =>
          prev.map((leave) =>
            leave._id === leaveId ? { ...leave, status, adminComment } : leave
          )
        );
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch all admins
  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${apiBaseURL}/list`);
      setAdmins(response.data);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  fetchAdmins();

  // Add a new admin
  const handleAddAdmin = async () => {
    if (formData.name && formData.email && formData.password) {
      try {
        const response = await axios.post(`${apiBaseURL}/add`, formData);
        setAdmins([...admins, response.data.admin]);
        setFormData({ name: "", email: "", password: "" });
        setShowModal(false);
      } catch (error) {
        console.error("Error adding admin:", error);
        alert(error.response?.data?.message || "Failed to add admin.");
      }
    } else {
      alert("All fields are required!");
    }
  };

  // Delete an admin
  const handleDelete = async (email) => {
    try {
      await axios.delete(`${apiBaseURL}/delete/${email}`);
      setAdmins(admins.filter((admin) => admin.email !== email));
    } catch (error) {
      console.error("Error deleting admin:", error);
      alert(error.response.data.message);
    }
  };

  const handleDeleteLeaves = async () => {
    try {
      const response = await axios.delete(
        "https://hrms-api-nph3.onrender.com/api/leave/deleteAll"
      );
      alert(response.data.message);
      fetchLeaves();
    } catch (err) {
      alert("Error while deleting history");
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-5 h=[100vp]">
        <h1 className="text-3xl font-bold text-center mb-6">
          Welcome to Admin Dashboard
        </h1>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-5 border-2 border-slate-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">List of Admins</h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-black text-white px-4 py-2 rounded-lg border-2 border-black hover:bg-transparent hover:text-black transition"
            >
              Add Admin
            </button>
          </div>

          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border border-gray-300 text-center">
                  <b>Name</b>
                </th>
                <th className="p-2 border border-gray-300 text-center">
                  <b>Email</b>
                </th>
                <th className="p-2 border border-gray-300 text-center">
                  <b>Action</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {admins.length > 0 ? (
                admins.map((admin, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-2 border border-gray-300 text-center">
                      {admin.name}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {admin.email}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      <button
                        onClick={() => handleDelete(admin.email)}
                        className="bg-black text-white px-3 py-1 border-2 border-black rounded-lg hover:bg-transparent hover:text-black transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center p-4">
                    No admins found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-[90%] max-w-lg p-5 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Add New Admin
              </h2>
              <div className="mb-3">
                <label className="block text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  placeholder="Enter name"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  placeholder="Enter password"
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-black border-2 border-black hover:bg-transparent hover:text-black text-white px-4 py-2 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAdmin}
                  className="bg-black border-2 border-black hover:bg-transparent hover:text-black text-white px-4 py-2 rounded-lg mr-2"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Employee table */}
        <EmployeeTable />
      </div>
      {/* Leaves management */}
      <div className="bg-slate-100">
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-5 border-2 border-slate-300 mx-6  my-4 lg:my-10">
          <div className="flex justify-between items-center gap-4 ">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Employees Leave Requests
            </h2>

            <button
              type="button"
              onClick={handleDeleteLeaves}
              className=" py-2 px-5 bg-black border-2 border-black text-slate-200 rounded-md hover:bg-transparent hover:text-black focus:outline-none focus:ring-2 focus:ring-slate-500 mb-4"
            >
              Clear History
            </button>
          </div>
          <table className="w-full bg-white border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border border-gray-300 text-center">
                  <b>Employee Name</b>
                </th>
                <th className="p-2 border border-gray-300 text-center">
                  <b>Email</b>
                </th>
                <th className="p-2 border border-gray-300 text-center">
                  <b>Reason</b>
                </th>
                <th className="p-2 border border-gray-300 text-center">
                  <b>Date</b>
                </th>
                <th className="p-2 border border-gray-300 text-center">
                  <b>Status</b>
                </th>
                <th className="p-2 border border-gray-300 text-center">
                  <b>Actions</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {leaves.length > 0 ? (
                leaves.map((leave) => (
                  <tr key={leave._id} className="hover:bg-gray-100">
                    <td className="p-2 border border-gray-300 text-center">
                      {leave.employeeName}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {leave.email}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {leave.reason}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {leave.date}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {leave.status}
                    </td>
                    <td className="p-2 border border-gray-300 text-center">
                      {leave.status === "Pending" && (
                        <>
                          <button
                            onClick={() =>
                              updateLeaveStatus(leave._id, "Accepted")
                            }
                            className="bg-black text-white px-3 py-1 border-2 border-black rounded-lg hover:bg-transparent hover:text-black transition mr-2"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              updateLeaveStatus(leave._id, "Rejected")
                            }
                            className="bg-black text-white px-3 py-1 border-2 border-black rounded-lg hover:bg-transparent hover:text-black transition"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    dob: "",
    gender: "Male",
    position: "",
    department: "",
    hireDate: "",
  });

  const fetchEmployees = async () => {
    try {
      const { data } = await axios.get(
        "https://hrms-api-nph3.onrender.com/api/employees"
      );
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  const handleAddOrEditEmployee = async () => {
    try {
      if (editMode) {
        await axios.put(
          `https://hrms-api-nph3.onrender.com/api/employees/${editingEmployeeId}`,
          newEmployee
        );
      } else {
        await axios.post(
          "https://hrms-api-nph3.onrender.com/api/employees",
          newEmployee
        );
      }
      fetchEmployees();
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error adding/editing employee", error);
    }
  };

  fetchEmployees();

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://hrms-api-nph3.onrender.com/api/employees/${id}`
      );
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  const handleEdit = (employee) => {
    setEditMode(true);
    setEditingEmployeeId(employee._id);
    setNewEmployee({ ...employee });
    setShowModal(true);
  };

  const resetForm = () => {
    setNewEmployee({
      name: "",
      email: "",
      dob: "",
      gender: "Male",
      position: "",
      department: "",
      hireDate: "",
    });
    setEditMode(false);
    setEditingEmployeeId(null);
  };

  return (
    <div className="container mx-auto p-4 mt-20 border-2 bg-white border-slate-300 rounded-lg shadow-lg">
      <div className="flex flex-wrap justify-between gap-2 items-center mb-4 ">
        <h1 className=" text-lg mb-2">
          <b>List of Employees</b>
        </h1>
        <input
          type="text"
          placeholder="Search by name"
          className="border  border-slate-900 p-2 rounded w-full sm:w-1/3 mb-2 sm:mb-0"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          className="bg-black mb-2 text-white px-4 py-2 rounded-lg w-full sm:w-auto border-2 border-black hover:bg-transparent hover:text-black  transition-all"
          onClick={() => {
            setEditMode(false);
            resetForm();
            setShowModal(true);
          }}
        >
          Add Employee
        </button>
      </div>
      <div className="overflow-x-auto ">
        <table className="min-w-full  border-gray-300 shadow-md rounded">
          <thead className="bg-gray-200">
            <tr>
              {[
                "Name",
                "Email",
                "DOB",
                "Gender",
                "Position",
                "Department",
                "Hire Date",
                "Actions",
              ].map((header, index) => (
                <th
                  key={index}
                  className=" px-4 py-2 border whitespace-nowrap text-center"
                >
                  <b>{header}</b>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees
              .filter((emp) =>
                emp.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((emp) => (
                <tr key={emp._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2 border text-center  ">{emp.name}</td>
                  <td className="px-4 py-2 border text-center ">{emp.email}</td>
                  <td className="px-4 py-2 border text-center ">
                    {new Date(emp.dob).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border text-center ">
                    {emp.gender}
                  </td>
                  <td className="px-4 py-2 border text-center ">
                    {emp.position}
                  </td>
                  <td className="px-4 py-2 border text-center ">
                    {emp.department}
                  </td>
                  <td className="px-4 py-2 border text-center ">
                    {new Date(emp.hireDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border text-center  flex space-x-2">
                    <button
                      className="bg-black  px-2 py-1  rounded-lg text-white border-2 border-black hover:bg-transparent hover:text-black transition"
                      onClick={() => handleEdit(emp)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-black  px-2 py-1  rounded-lg text-white border-2 border-black hover:bg-transparent hover:text-black transition"
                      onClick={() => handleDelete(emp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl h-full max-h-[90%] overflow-auto">
            <h2 className="text-lg font-bold mb-4 text-center">
              {editMode ? "Edit Employee" : "Add Employee"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddOrEditEmployee();
              }}
            >
              <div className="mb-4">
                <label className="block mb-1 font-bold">Name</label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={newEmployee.name}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, name: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-bold">Email</label>
                <input
                  type="email"
                  className="border p-2 rounded w-full"
                  value={newEmployee.email}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-bold">Date of Birth</label>
                <input
                  type="date"
                  className="border p-2 rounded w-full"
                  value={newEmployee.dob}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, dob: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-bold">Gender</label>
                <div className="flex space-x-4">
                  {["Male", "Female", "Others"].map((gender) => (
                    <label key={gender} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value={gender}
                        checked={newEmployee.gender === gender}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            gender: e.target.value,
                          })
                        }
                      />
                      <span>{gender}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-bold">Position</label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={newEmployee.position}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, position: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-bold">Department</label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={newEmployee.department}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      department: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-bold">Hire Date</label>
                <input
                  type="date"
                  className="border p-2 rounded w-full"
                  value={newEmployee.hireDate}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      hireDate: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-black border-2 border-black hover:bg-transparent hover:text-black text-white px-4 py-2 rounded-lg mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black border-2 border-black hover:bg-transparent hover:text-black text-white px-4 py-2 rounded-lg mr-2"
                >
                  {editMode ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeTable;

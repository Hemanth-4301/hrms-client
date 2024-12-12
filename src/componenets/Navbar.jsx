import "../styles/Navbar.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logo from "../assets/logo.jpg";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false); // Track navbar visibility
  const token = localStorage.getItem("authToken");
  const adminToken = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("email");
    navigate("/login", { replace: true });
  };

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  const hideNavbar = () => {
    setIsNavbarVisible(false);
  };

  return (
    <div>
      <nav className="relative z-10">
        <input
          type="checkbox"
          id="sidebar-active"
          checked={isNavbarVisible}
          readOnly
        />
        <h1 className="text-3xl  text-left ms-5 text-slate-300">HRMS</h1>{" "}
        {/* Logo and Title */}
        <label
          htmlFor="sidebar-active"
          className="open-sidebar"
          onClick={toggleNavbar}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="35px"
            viewBox="0 -960 960 960"
            width="35px"
            fill="#e8eaed"
          >
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
          </svg>
        </label>
        <div
          className={`link-container ${isNavbarVisible ? "visible" : "hidden"}`}
        >
          <label
            htmlFor="sidebar-active"
            className="close-sidebar"
            onClick={hideNavbar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="35px"
              viewBox="0 -960 960 960"
              width="35px"
              fill="#e8eaed"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </label>
          <HashLink to="/" onClick={hideNavbar} className="home-link">
            Home
          </HashLink>
          <HashLink to="/aboutus" onClick={hideNavbar}>
            About us
          </HashLink>
          <HashLink
            onClick={() => {
              openModal();
              hideNavbar();
            }}
          >
            Contact us
          </HashLink>
          {!adminToken && token && (
            <HashLink to="/apply-leave" onClick={hideNavbar}>
              Apply Leave
            </HashLink>
          )}
          {token ? (
            <HashLink to="/employee-dashboard" onClick={hideNavbar}>
              Dashboard
            </HashLink>
          ) : (
            ""
          )}
          {adminToken ? (
            <HashLink to="/admin-dashboard" onClick={hideNavbar}>
              Dashboard
            </HashLink>
          ) : (
            ""
          )}
          {token || adminToken ? (
            <HashLink
              onClick={() => {
                handleLogout();
                hideNavbar();
              }}
            >
              Logout
            </HashLink>
          ) : (
            <HashLink to="/login" onClick={hideNavbar}>
              Login
            </HashLink>
          )}
        </div>
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-11/12 md:w-1/3 border-2 border-slate-300 ">
              <h2 className="text-center text-2xl font-semibold mb-4">
                Contact us
              </h2>
              <div className="mb-2 flex flex-col gap-1">
                <p className="text-center">
                  <b>Phone:</b> +91 8296288556{" "}
                </p>
                <p className="text-center">
                  <b>Email:</b> thejas@gamil.com
                </p>
              </div>
              <button
                className="w-full bg-black text-white py-2 px-4 rounded-md border-2 border-black hover:text-black hover:bg-transparent mt-4"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Navbar;

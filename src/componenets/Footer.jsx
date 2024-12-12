import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 pb-6  relative z-10">
      <hr className="border border-slate-800"></hr>
      <div className="container mx-auto px-4 mt-3">
        <div className="">
          {/* Heading */}
          <h1 className="text-lg font-bold text-gray-100 text-center">
            Human Resource Management System
          </h1>

          {/* Links */}
          <div className="flex justify-center gap-5 my-2">
            <h2 className="hover:text-gray-100">Privacy and Policy</h2>
            <Link to="/aboutus" className="hover:text-gray-100">
              About Us
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center">
          <p className="text-sm">&copy; HRMS 2024</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

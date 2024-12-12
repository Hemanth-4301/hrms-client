import React from "react";
import { FaInstagram } from "react-icons/fa"; // Importing Instagram icon from react-icons
import { motion } from "framer-motion"; // Importing framer-motion
import thejas from "../assets/thejas.jpg";
import mamatha from "../assets/mamatha.jpg";
import rakesh from "../assets/rakesh.jpg";
import rakshitha from "../assets/rakshitha.jpg";

const Aboutus = () => {
  return (
    <div className="bg-black text-white py-12 px-6 h-[100vp]">
      {/* About Us Section */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.8 } }}
      >
        <h2 className="text-4xl font-bold mb-4">About Us</h2>
        <p className="text-md md:text-lg max-w-6xl mx-auto text-left px-2">
          We are students from the CSE branch, Thejas M N, Mamatha S R,
          Raskshitha M R and Rakesh R. We have developed this as our minor
          project, the HRM System. It focuses on employee management, including
          features like Admin management, Employee leave applications, and other
          essential functionalities, under the mentorship of Devika Madam.
        </p>
      </motion.div>

      {/* Team Members Section */}
      <motion.div
        className="text-center mb-12 mx-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { duration: 0.8 } }}
      >
        <h3 className="text-3xl font-bold mb-6">Team Members</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-6 gap-8">
          {/* Team Member Card 1*/}
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileHover={{ scale: 1.1 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          >
            <img
              src={thejas}
              alt="Team Member 1"
              className="rounded-full w-[200px] h-[200px] mx-auto mb-4"
            />
            <h4 className="text-xl font-semibold mb-2">Thejas M N</h4>
            <a
              href="https://www.instagram.com/thej_as_chaplin/profilecard/?igsh=MXY0cW1mMzQ5dHExMw=="
              className="text-gray-400 hover:text-white flex justify-center"
            >
              <FaInstagram size={24} />
            </a>
          </motion.div>

          {/* Team Member Card 2*/}
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileHover={{ scale: 1.1 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          >
            <img
              src={mamatha}
              alt="Team Member 2"
              className="rounded-full w-[200px] h-[200px] mx-auto mb-4"
            />
            <h4 className="text-xl font-semibold mb-2">Mamatha S R</h4>
            <a
              href="https://www.instagram.com/_mamtha_125_?igsh=NTc4MTIwNjQ2YQ=="
              className="text-gray-400 hover:text-white  flex justify-center"
            >
              <FaInstagram size={24} />
            </a>
          </motion.div>

          {/* Team Member Card 3*/}
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileHover={{ scale: 1.1 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          >
            <img
              src={rakesh}
              alt="Team Member 3"
              className="rounded-full w-[200px] h-[200px] mx-auto mb-4"
            />
            <h4 className="text-xl font-semibold mb-2">Rakesh R</h4>
            <a
              href="https://www.instagram.com/its_me__yadav_12/profilecard/?igsh=eXJ1bTUxMGRha3dw"
              className="text-gray-400 hover:text-white  flex justify-center"
            >
              <FaInstagram size={24} />
            </a>
          </motion.div>

          {/* Team Member Card 4*/}
          <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            whileHover={{ scale: 1.1 }}
            whileInView={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          >
            <img
              src={rakshitha}
              alt="Team Member 4"
              className="rounded-full w-[200px] h-[200px] mx-auto mb-4"
            />
            <h4 className="text-xl font-semibold mb-2">Rakshitha M R</h4>
            <a
              href="https://www.instagram.com/apricus_liora/profilecard/?igsh=M3dobzZmNWFnejEx"
              className="text-gray-400 hover:text-white  flex justify-center"
            >
              <FaInstagram size={24} />
            </a>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Aboutus;

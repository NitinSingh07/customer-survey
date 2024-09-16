import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa"; // Check icon

const ThankYouScreen = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-teal-300 via-blue-300 to-purple-300">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white p-8 rounded-xl shadow-lg text-center"
      >
        <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-pulse" />
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          Thank You!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We appreciate your feedback. The survey will restart shortly...
        </p>
        <p className="text-sm text-gray-500">
          If you are not redirected automatically,{" "}
          <a href="/" className="text-teal-600 underline">
            click here
          </a>
          .
        </p>
      </motion.div>
    </div>
  );
};

export default ThankYouScreen;

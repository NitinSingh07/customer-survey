import React from "react";
import { motion } from "framer-motion"; // For animations
import { FaRegSmile } from "react-icons/fa"; // For an icon
import { MdArrowForward } from "react-icons/md"; // For a forward arrow icon

const WelcomeScreen = ({ startSurvey }) => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-300 overflow-hidden">
      {/* Background Animation with Video */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(0, 204, 255, 0.2))",
          backgroundSize: "400% 400%",
          animation: "backgroundAnimation 10s ease infinite",
        }}
      >
        <style>
          {`
            @keyframes backgroundAnimation {
              0% { background-position: 0% 0%; }
              50% { background-position: 100% 100%; }
              100% { background-position: 0% 0%; }
            }
          `}
        </style>
        {/* Background Video (uncomment if needed) */}
        {/* <video
          autoPlay
          muted
          loop
          className="absolute inset-0 object-cover w-full h-full"
          src="https://your-video-url.mp4"
        /> */}
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-xl max-w-lg mx-auto text-center">
        {/* Animated Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-6"
        >
          <FaRegSmile className="text-8xl text-yellow-400 animate-pulse" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-5xl font-extrabold text-gray-800 mb-4"
        >
          Welcome to Our Survey
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="text-gray-600 mb-6 text-lg"
        >
          Your feedback is invaluable to us. Please take a moment to share your
          thoughts and help us enhance our services!
        </motion.p>

        <motion.button
          onClick={startSurvey}
          initial={{ scale: 1 }}
          whileHover={{
            scale: 1.1,
            rotate: 6,
            backgroundColor: "rgb(34, 193, 195)",
            boxShadow: "0 4px 15px rgba(34, 193, 195, 0.4)",
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center px-8 py-4 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300"
        >
          <span className="text-lg font-medium">Start Survey</span>
          <MdArrowForward className="ml-3 text-xl" />
        </motion.button>
      </div>

      {/* Footer */}
      <div className="absolute bottom-5 w-full text-center text-gray-500">
        <p>© 2024 Survey Company. All rights reserved.</p>
      </div>
    </div>
  );
};

export default WelcomeScreen;

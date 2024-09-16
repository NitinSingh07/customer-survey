import React, { useState } from "react";

const Question = ({ question, questionNumber, totalQuestions, onAnswer }) => {
  const [answer, setAnswer] = useState("");

  const handleNext = () => {
    onAnswer(answer); // Pass the answer to the parent component
    setAnswer(""); // Clear the answer after submission
  };

  return (
    <div className="w-full max-w-lg mx-auto p-4 bg-white">
      {/* Question Heading */}
      <div className="mb-6">
        <p className="text-2xl font-bold text-gray-800">
          Question {questionNumber} of {totalQuestions}
        </p>
      </div>

      {/* Question Text */}
      <p className="text-lg text-gray-700 mb-8">{question.text}</p>

      {/* Rating Buttons */}
      {question.type === "rating" && (
        <div className="flex justify-center gap-4 mb-6">
          {[...Array(question.scale)].map((_, index) => (
            <button
              key={index}
              className={`w-16 h-16 flex items-center justify-center rounded-full text-xl font-bold transition-transform transform ${
                answer === index + 1
                  ? "bg-teal-600 text-white scale-110 shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-teal-400"
              }`}
              onClick={() => setAnswer(index + 1)} // Set the selected rating
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Text Area */}
      {question.type === "text" && (
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full h-40 p-4 border border-gray-300 rounded-lg shadow-md resize-none placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
          placeholder="Type your feedback here..."
        />
      )}

      {/* Next Button */}
      <div className="flex justify-end mb-[-78px]">
        <button
          onClick={handleNext} // Call handleNext to submit the answer
          className="px-9 py-3 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition mt-4"
        >
          {questionNumber < totalQuestions ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Question;

import React, { useState } from "react";
import Question from "./Question";
import ThankYouScreen from "./ThankYouScreen";
import axios from "axios";

const questions = [
  {
    id: 1,
    text: "How satisfied are you with our products?",
    type: "rating",
    scale: 5,
  },
  {
    id: 2,
    text: "How fair are the prices compared to similar retailers?",
    type: "rating",
    scale: 5,
  },
  {
    id: 3,
    text: "How satisfied are you with the value for money of your purchase?",
    type: "rating",
    scale: 5,
  },
  {
    id: 4,
    text: "On a scale of 1-10, how would you recommend us to your friends and family?",
    type: "rating",
    scale: 10,
  },
  {
    id: 5,
    text: "What could we do to improve our service?",
    type: "text",
  },
];

const SurveyQuestions = ({ endSurvey }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sessionId] = useState(() => Date.now().toString()); // Generate session ID
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (answer) => {
    const updatedAnswers = {
      ...answers,
      [questions[currentQuestionIndex].id]: answer,
    };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitSurvey(updatedAnswers); // Call to backend when all questions are answered
    }
  };

  const submitSurvey = async (finalAnswers) => {
    try {
      await axios.post("http://localhost:5000/submit-survey", {
        sessionId,
        answers: Object.entries(finalAnswers).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
        status: "COMPLETED",
      });
      setIsCompleted(true); // Survey complete
    } catch (err) {
      console.error("Error submitting survey", err);
    }
  };

  if (isCompleted) {
    return <ThankYouScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-200 to-blue-300 p-4">
      <div className="w-full max-w-3xl p-8 bg-white rounded-xl shadow-xl border border-gray-300">
        <div className="flex items-center justify-between mb-6">
          {/* <p className="text-3xl font-bold text-gray-800">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p> */}
        </div>
        <div className="  ">
          <Question
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
          />
        </div>
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 bg-gray-400 text-white rounded-lg shadow-md hover:bg-gray-500 transition duration-300"
          >
            Previous
          </button>
          <button
            onClick={() => handleAnswer(null)} // Placeholder action for demonstration
            className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition duration-300"
          >
            {currentQuestionIndex < questions.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyQuestions;

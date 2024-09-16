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
  const [sessionId] = useState(() => Date.now().toString());
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (answer) => {
    const updatedAnswers = {
      ...answers,
      [questions[currentQuestionIndex].id]: answer, // Store the answer with the correct question ID
    };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitSurvey(updatedAnswers);
    }
  };

  const submitSurvey = async (finalAnswers) => {
    console.log("Submitting survey with answers:", finalAnswers);
    try {
      const response = await axios.post("http://localhost:5000/submit-survey", {
        sessionId,
        answers: Object.entries(finalAnswers).map(([questionId, answer]) => ({
          questionId: parseInt(questionId, 10),
          answer,
        })),
        status: "COMPLETED",
      });
      console.log("Survey submitted successfully:", response.data);
      setIsCompleted(true);
    } catch (err) {
      console.error("Error submitting survey", err);
    }
  };

  if (isCompleted) {
    return <ThankYouScreen />;
  }

  // Handle the "Previous" button click and move to the previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-teal-200 to-blue-300 p-4">
      <div className="w-full max-w-3xl p-8 bg-white rounded-xl shadow-xl border border-gray-300">
        <div className="">
          <Question
            question={questions[currentQuestionIndex]}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onPrevious={handlePrevious}
            onAnswer={handleAnswer}
          />
        </div>
        <div className="ml-24">
          <button
            onClick={handlePrevious}
            className=" mr-12 px-6 py-3 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-700 transition mt-4"
          >
            Previous
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyQuestions;

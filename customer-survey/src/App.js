import React, { useState } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import SurveyQuestions from "./components/SurveyQuestions";

function App() {
  const [isSurveyStarted, setIsSurveyStarted] = useState(false);

  const startSurvey = () => {
    setIsSurveyStarted(true);
  };

  return (
    <div className="h-screen  ">
      {!isSurveyStarted ? (
        <WelcomeScreen startSurvey={startSurvey} />
      ) : (
        <SurveyQuestions />
      )}
    </div>
  );
}

export default App;

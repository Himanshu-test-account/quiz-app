import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Quiz from './Components/Quiz';
import Result from './Components/Result';

function App() {
  const [score, setScore] = useState(0);

  const handleFinishQuiz = (finalScore) => {
    setScore(finalScore);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz onFinish={handleFinishQuiz} />} />
        <Route path="/results" element={<Result score={score} />} />
      </Routes>
    </Router>
  );
}

export default App;

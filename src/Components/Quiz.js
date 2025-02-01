import React, { useState, useEffect, useCallback } from "react";
import { fetchQuizData } from "../api";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Quiz = ({ onFinish }) => {
  const [quizData, setQuizData] = useState([]); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(30); // ⏳ Timer starts at 30 sec
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const data = await fetchQuizData();
      if (data.length > 0) {
        setQuizData(data);
      }
    };
    getData();
  }, []);

  // ✅ Wrap handleNextQuestion in useCallback to avoid re-renders
  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex + 1 < quizData.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer("");
      setIsCorrect(null);
      setTimer(30); // Reset timer
    } else {
      onFinish(score);
      playSound("win"); // Play "win" sound when quiz is finished
      navigate("/results", { state: { score } });
    }
  }, [currentQuestionIndex, quizData.length, navigate, onFinish, score]);

  // ✅ Add handleNextQuestion as a dependency to useEffect
  useEffect(() => {
    if (timer > 0) {
      const count = setTimeout(() => setTimer(timer - 1), 1000);

      // Play count sound when timer is less than 5 seconds
      if (timer <= 5) {
        playSound("count");
      }

      return () => clearTimeout(count);
    } else {
      handleNextQuestion(); // Auto move to next if time runs out
    }
  }, [timer, handleNextQuestion]);

  if (!quizData.length) return <div className="loading-spinner">Loading...</div>;

  const currentQuestion = quizData[currentQuestionIndex];
  const correctAnswer = currentQuestion.options.find(option => option.is_correct);

  const handleAnswerSelection = (answer) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer);
      const isAnswerCorrect = answer === correctAnswer?.description;
      setIsCorrect(isAnswerCorrect);

      if (isAnswerCorrect) {
        setScore(prev => prev + 10);
        playSound("correct"); // Play correct sound when the answer is correct
      } else {
        playSound("wrong"); // Play wrong sound when the answer is incorrect
      }

      setTimeout(() => handleNextQuestion(), 1500);
    }
  };

  const playSound = (type) => {
    const soundMap = {
      correct: "/sounds/correct.mp3",
      wrong: "/sounds/wrong.mp3",
      count: "/sounds/count.mp3",
      win: "/sounds/win.mp3",
      gameover: "/sounds/gameover.mp3",
    };

    const audio = new Audio(soundMap[type]);
    audio.play().catch(err => console.warn("Audio playback blocked:", err));
  };

  return (
    <div className="quiz-container">
      <h2 className="question-title">
        Question {currentQuestionIndex + 1} / {quizData.length}
      </h2>

      <p className="question-text">{currentQuestion?.description}</p>

      {/* ⏳ Timer Display */}
      <div className="timer">
        <p>⏳ Time Left: <span className={timer <= 5 ? "red-timer" : ""}>{timer}s</span></p>
      </div>

      <div className="answer-options">
        {currentQuestion?.options?.map((option, index) => (
          <button
            key={index}
            className={`answer-button ${selectedAnswer ? (option.description === correctAnswer.description ? "correct" : "incorrect") : ""}`}
            onClick={() => handleAnswerSelection(option.description)}
            disabled={selectedAnswer}
          >
            {option.description}
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <div className="answer-feedback">
          <p className={`feedback ${isCorrect ? "correct-text" : "incorrect-text"}`}>
            {isCorrect ? "✅ Correct!" : "❌ Incorrect!"}
          </p>
          <p className="correct-answer-explanation">
            ✅ The correct answer is: <strong>{correctAnswer.description}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Quiz;

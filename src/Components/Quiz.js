import React, { useState, useEffect } from 'react';
import { fetchQuizData } from '../api'; // Fetch quiz data from API
import { useNavigate } from 'react-router-dom';
import '../styles.css'; // Import styles

const Quiz = ({ onFinish }) => {
  const [quizData, setQuizData] = useState([]); // Stores fetched quiz questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Tracks current question
  const [selectedAnswer, setSelectedAnswer] = useState(''); // Tracks selected answer
  const [isCorrect, setIsCorrect] = useState(null); // Tracks if the answer is correct
  const [score, setScore] = useState(0); // Tracks user's score
  const [loading, setLoading] = useState(true); // Manages loading state
  const navigate = useNavigate(); // Enables navigation

  useEffect(() => {
    const getData = async () => {
      const data = await fetchQuizData();
      if (data.length > 0) {
        setQuizData(data);
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <div className="loading-spinner">Loading...</div>;

  const currentQuestion = quizData[currentQuestionIndex];
  const correctAnswer = currentQuestion.options.find(option => option.is_correct); // Find correct option

  const handleAnswerSelection = (answer) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer);
      const isAnswerCorrect = answer === correctAnswer?.description;
      setIsCorrect(isAnswerCorrect);

      if (isAnswerCorrect) {
        setScore(prevScore => prevScore + 1);
      }

      setTimeout(() => {
        if (currentQuestionIndex + 1 < quizData.length) {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
          onFinish(score + (isAnswerCorrect ? 1 : 0)); // Pass final score
          navigate('/results');
        }
        setSelectedAnswer('');
        setIsCorrect(null);
      }, 1500);
    }
  };

  return (
    <div className="quiz-container">
      <h2 className="question-title">
        Question {currentQuestionIndex + 1} / {quizData.length}
      </h2>
      <p className="question-text">{currentQuestion?.description}</p>

      <div className="answer-options">
        {currentQuestion?.options?.map((option, index) => (
          <button
            key={index}
            className={`answer-button 
              ${selectedAnswer ? (option.description === correctAnswer.description ? 'correct' : 'incorrect') : ''}`}
            onClick={() => handleAnswerSelection(option.description)}
            disabled={selectedAnswer}
          >
            {option.description}
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <div className="answer-feedback">
          <p className={`feedback ${isCorrect ? 'correct-text' : 'incorrect-text'}`}>
            {isCorrect ? '✅ Correct!' : '❌ Incorrect!'}
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

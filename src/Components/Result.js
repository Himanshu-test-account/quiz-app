import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css'; // Import styles

const Results = ({ score }) => {
  return (
    <div className="results-container">
      <h1 className="results-title">Quiz Completed! 🎉</h1>
      <p className="results-score">Your Score: <span>{score}</span></p>

      {/* Animated Trophy & Encouragement Message */}
      {score > 7 ? (
        <p className="results-message success">🏆 Amazing! You're a Quiz Master! 🏆</p>
      ) : score > 4 ? (
        <p className="results-message average">👍 Good Job! Try Again for a Higher Score!</p>
      ) : (
        <p className="results-message fail">😢 Don't Give Up! Keep Practicing!</p>
      )}

      <div className="results-buttons">
        <Link to="/">
          <button className="restart-button">🏠 Home</button>
        </Link>
        <Link to="/quiz">
          <button className="retry-button">🔄 Retry Quiz</button>
        </Link>
      </div>
    </div>
  );
};

export default Results;

import React from 'react'; // Import React library
import { Link } from 'react-router-dom'; // Import Link component to navigate
import '../styles.css'; // Import global styles

const Home = () => { // Home component function
  return (
    <div className="home-container"> {/* Full-screen container */}
      <h1 className="home-title">🚀 Welcome to the Ultimate Quiz Challenge! 🎉</h1> 
      {/* Heading/title of the page */}

      <p className="home-description">
        Test your knowledge, challenge yourself, and have fun!
      </p> 
      {/* Description text below the title */}

      <div className="quiz-icon">❓</div> 
      {/* Animated quiz icon that bounces */}

      <Link to="/quiz"> 
        {/* Button redirects to Quiz page when clicked */}
        <button className="start-button">🎯 Start Quiz</button>
      </Link>
    </div>
  );
};

export default Home; // Export component for use in App.js

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/quiz'; // Local proxy server

export const fetchQuizData = async () => {
  try {
    const response = await axios.get(API_URL);

    if (!response.data || !response.data.questions || response.data.questions.length === 0) {
      throw new Error('No quiz data available');
    }

    return response.data.questions; // Extracting the questions array
  } catch (error) {
    console.error('Error fetching quiz data:', error.message);
    return [];
  }
};

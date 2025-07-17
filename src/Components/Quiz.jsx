import React, { useState, useEffect } from 'react';
import Questions from '../Data/Questions';
import './Quiz.css';

function Quiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(10);

  const currentQuestion = Questions[currentIndex];

  useEffect(() => {
    if (selectedOption || isFinished) return;

    if (timer === 0) {
      setSelectedOption("timeout"); // disable options
      setTimeout(() => handleNext(false), 1000);
      return;
    }

    const countdown = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer, selectedOption, isFinished]);

  useEffect(() => {
    setTimer(10);
  }, [currentIndex]);

  const handleAnswer = (option) => {
    const isCorrect = option === currentQuestion.answer;
    setSelectedOption(option);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setTimeout(() => handleNext(false), 1000);
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < Questions.length) {
      setCurrentIndex(nextIndex);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setSelectedOption(null);
    setTimer(10);
  };

  if (isFinished) {
    return (
      <div className='quiz-container'>
        <h2>Quiz Finished!</h2>
        <h3>Your Score: {score} out of {Questions.length}</h3>
        <button onClick={restartQuiz}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className='quiz-container'>
      <p>{currentQuestion.question}</p>

      {currentQuestion.image && (
        <img
          src={currentQuestion.image}
          alt="question"
          style={{ width: '300px', marginBottom: '20px' }}
        />
      )}

      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
        Time left: {timer} seconds
      </p>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {currentQuestion.options.map((option) => (
          <li key={option}>
            <button
              onClick={() => handleAnswer(option)}
              disabled={selectedOption !== null}
              style={{
                backgroundColor: selectedOption === option
                  ? option === currentQuestion.answer
                    ? 'green'
                    : 'red'
                  : 'white',
                color: selectedOption === option ? 'white' : 'black',
                padding: '10px',
                margin: '5px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Quiz;

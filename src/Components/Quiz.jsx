import React, {useState} from 'react'
import Questions from '../Data/Questions';
import './Quiz.css'; // Assuming you have a CSS file for styling

function Quiz ()  {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const currentQuestion = Questions[currentIndex];

    const handleAnswer = (option) =>{
        setSelectedOption(option);
        if(option === currentQuestion.answer) {
            setScore(score + 1);
        }
    }

    const restartQuiz = ()=>{
        setCurrentIndex(0);
        setScore(0);
        setIsFinished(false);
        setSelectedOption(null);
    }

    if(isFinished){
        return(
            <div class='quiz-container'>
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
                }}>Restart Quiz</button>
            </div>
        );
    }
        
    setTimeout(()=>{
        const nextIndex = currentIndex + 1;
        if (nextIndex < Questions.length){
            setCurrentIndex(nextIndex);
            setSelectedOption(null);
        }else{
            setIsFinished(true);
        }
    
    }, 5000);
    
    

  return (
    <div class='quiz-container'>
        <p>
            {currentQuestion.question}
        </p>
        <ul style={{
            listStyleType: 'none',
            padding: 0,
            margin: 0
        }}>
            {currentQuestion.options.map((option)=>(
                <li key={option}>
                <button 
                    onClick={()=>handleAnswer(option)}
                    disabled={selectedOption !== null}
                    style={{
                        backgroundColor: selectedOption === option ? option === currentQuestion.answer ? 'green' : 'red' : 'white',
                        color: selectedOption === option ? 'white' : 'black',
                        padding: '10px',
                        margin: '5px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                    >{option}</button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Quiz;
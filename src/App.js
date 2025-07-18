import './App.css';
import Quiz from './Components/Quiz';

function App() {
  return (
    <div className="App">
      <h2 style={{
        color: '#fff',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      }}>Are You Smarter Than A 5th Grader?</h2>
      <Quiz />
    </div>
  );
}

export default App;

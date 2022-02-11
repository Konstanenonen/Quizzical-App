/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';

function App() {
  const [start, setStart] = React.useState(false);
  const [filmQuestions, setFilmQuestions] = React.useState([]);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=27&type=multiple')
      .then((response) => response.json())
      .then((data) => {
        setFilmQuestions(data.results);
        console.log(data);
      });
  }, []);

  return (
    <div className="App">
      { !start
        ? <StartPage start={() => setStart(true)} />
        : <QuizPage questions={filmQuestions} /> }
    </div>
  );
}

export default App;

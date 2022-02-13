/* eslint-disable react/jsx-no-bind */
import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';

function App() {
  const [start, setStart] = React.useState(false);
  const [showResults, setShowResults] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [startNewGame, setStartNewGame] = React.useState([]);

  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=27&type=multiple')
      .then((response) => response.json())
      .then((data) => {
        // Filtering the fetched data for easier form manipulation
        // eslint-disable-next-line arrow-body-style
        const getQuestions = data.results.map((question) => {
          const answers = question.incorrect_answers.map((answer) => (
            {
              chosen: false,
              correct: false,
              answer,
              id: nanoid(),
            }
          ));
          // Adding the correct asnwer together with the wrong ones to make the shuffling easier
          answers.push({
            chosen: false,
            correct: true,
            answer: question.correct_answer,
            id: nanoid(),
          });
          // This makes the answer order random, so correct answer isn't in known place
          answers.sort(() => Math.random() - 0.5);
          // Fixing quotes
          const doubleQuote = /&quot;/g;
          const singleQuote = /&#039;/g;
          const questionFixedQuotes = question.question.replace(doubleQuote, '"').replace(singleQuote, "'");
          answers.unshift({ question: questionFixedQuotes });
          return answers;
        });
        setQuestions(getQuestions);
      });
  }, [startNewGame]);

  function chooseAnswer(id) {
    setQuestions((prevState) => prevState.map((questionsArray) => (
      questionsArray.map((answer) => (
        answer.id === id ? { ...answer, chosen: !answer.chosen } : answer
      ))
    )));
  }

  function playAgain() {
    setStartNewGame((prevState) => !prevState);
    setQuestions([]);
    setShowResults(false);
  }

  function checkAnswers() {
    setShowResults(true);
  }

  const correctAnswers = questions.filter((answerArray) => {
    let boolean = false;
    for (let i = 0; i < answerArray.length; i += 1) {
      if (answerArray[i].correct && answerArray[i].chosen) {
        boolean = true;
      }
    }
    return boolean;
  }).length;

  return (
    <div className="app--container">
      {showResults && correctAnswers === 5 && <Confetti height="750px" />}
      {!start ? (
        <StartPage start={() => setStart(true)} />
      ) : (
        <QuizPage
          questions={questions}
          showResults={showResults}
          correctAnswers={correctAnswers}
          checkAnswers={checkAnswers}
          playAgain={playAgain}
          chooseAnswer={chooseAnswer}
        />
      )}
    </div>
  );
}

export default App;

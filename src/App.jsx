/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import StartPage from './components/StartPage';
import QuizArea from './components/QuizArea';

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
          // Adding the correct asnwer together wit the wrong ones to make the shuffling easier
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

  const quizAreas = questions.map((item) => (
    <QuizArea
      key={item[0].question}
      question={item[0].question}
      answers={item.slice(1)}
      chooseAnswer={chooseAnswer}
      showResults={showResults}
    />
  ));

  function chooseAnswer(id) {
    setQuestions((prevState) => prevState.map((questionsArray) => (
      questionsArray.map((answer) => (
        answer.id === id ? { ...answer, chosen: !answer.chosen } : answer
      ))
    )));
  }

  function playAgain() {
    setShowResults(false);
    setStartNewGame((prevState) => !prevState);
  }

  function checkAnswers() {
    setShowResults(true);
  }

  const correctAnswers = questions.filter((answerArray) => {
    let boolean = false;
    for (let i = 0; i < answerArray.length; i++) {
      if (answerArray[i].correct && answerArray[i].chosen) {
        boolean = true;
      }
    }
    return boolean;
  }).length;

  return (
    <div className="app--container">
      { !start
        ? <StartPage start={() => setStart(true)} />
        : (
          <div>
            {quizAreas}
            {showResults ? (
              <div className="flex-box">
                <p>{`You scored ${correctAnswers}/5 correct answers`}</p>
                <button onClick={playAgain} type="button">Play Again</button>
              </div>
            ) : <div className="flex-box"><button className="check-answers" onClick={checkAnswers} type="button">Check answers</button></div>}
          </div>
        ) }
    </div>
  );
}

export default App;

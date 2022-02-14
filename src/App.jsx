/* eslint-disable react/jsx-no-bind */
import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';

export default function App() {
  const [start, setStart] = React.useState(false);
  const [questionCategory, setQuestionCategory] = React.useState({ url: 'jiit', roundCount: 0 });
  const [questions, setQuestions] = React.useState([]);
  const [showResults, setShowResults] = React.useState(false);

  useEffect(() => {
    fetch(questionCategory.url)
      .then((response) => response.json())
      .then((data) => {
        // Filtering the fetched data for easier form manipulation
        // eslint-disable-next-line arrow-body-style
        const doubleQuote = /&quot;/g;
        const singleQuote = /&#039;/g;
        const amp = /&amp;/g;
        const ldquo = /&ldquo;/g;
        const rqduo = /&rdquo;/g;
        const getQuestions = data.results.map((question) => {
          const answers = question.incorrect_answers.map((answer) => {
            const filteredAnswer = answer.replace(doubleQuote, '"')
              .replace(singleQuote, "'")
              .replace(amp, '&')
              .replace(ldquo, '"')
              .replace(rqduo, '"');
            return ({
              chosen: false,
              correct: false,
              answer: filteredAnswer,
              id: nanoid(),
            });
          });
          // Adding the correct asnwer together with the wrong ones to make the shuffling easier
          const filteredAnswer = question.correct_answer.replace(doubleQuote, '"')
            .replace(singleQuote, "'")
            .replace(amp, '&')
            .replace(ldquo, '"')
            .replace(rqduo, '"');
          answers.push({
            chosen: false,
            correct: true,
            answer: filteredAnswer,
            id: nanoid(),
          });
          // This makes the answer order random, so correct answer isn't in known place
          answers.sort(() => Math.random() - 0.5);
          // Fixing quotes
          const questionFixedQuotes = question.question.replace(doubleQuote, '"')
            .replace(singleQuote, "'")
            .replace(amp, '&')
            .replace(ldquo, '"')
            .replace(rqduo, '"');
          answers.unshift({ question: questionFixedQuotes });
          return answers;
        });
        setQuestions(getQuestions);
      });
  }, [questionCategory]);

  function chooseAnswer(id) {
    setQuestions((prevState) => prevState.map((questionsArray) => (
      questionsArray.map((answer) => (
        answer.id === id ? { ...answer, chosen: !answer.chosen } : answer
      ))
    )));
  }

  function playAgain() {
    setQuestions([
      [
        {
          question: 'Loading...',
        },
      ],
    ]);
    setShowResults(false);
    setQuestionCategory((prevState) => ({
      ...prevState,
      count: prevState.count + 1,
    }));
    setShowResults(false);
    setQuestionCategory((prevState) => ({ ...prevState, roundCount: prevState.roundCount + 1 }));
  }

  function checkAnswers() {
    setShowResults((prevState) => !prevState);
  }

  // Counting correct answers to display for user after the quizz
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
      {showResults && correctAnswers === 5 && <Confetti height="2000px" />}
      {!start ? (
        <StartPage start={() => setStart(true)} setQuestionCategory={setQuestionCategory} />
      ) : (
        <QuizPage
          questions={questions}
          setQuestions={setQuestions}
          showResults={showResults}
          correctAnswers={correctAnswers}
          checkAnswers={checkAnswers}
          playAgain={playAgain}
          chooseAnswer={chooseAnswer}
          backToCategories={() => setStart(false)}
        />
      )}
      <div className="rounds-container">
        <p>Rounds played:</p>
        <p>{questionCategory.roundCount}</p>
      </div>
    </div>
  );
}

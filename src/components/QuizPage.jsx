/* eslint-disable react/prop-types */
import React from 'react';
import QuizArea from './QuizArea';

export default function QuizPage(props) {
  const {
    questions,
    chooseAnswer,
    showResults,
    correctAnswers,
    playAgain,
    checkAnswers,
    backToCategories,
    setQuestions,
  } = props;

  const quizAreas = questions.map((item) => (
    <QuizArea
      key={item[0].question}
      question={item[0].question}
      answers={item.slice(1)}
      chooseAnswer={chooseAnswer}
      showResults={showResults}
    />
  ));

  return (
    <div>
      {quizAreas}
      {showResults ? (
        <div className="flex-box">
          <p>{`You scored ${correctAnswers}/5 correct answers`}</p>
          <button onClick={playAgain} type="button">
            Play Again
          </button>
          <button
            onClick={() => {
              backToCategories();
              checkAnswers();
              setQuestions([
                [
                  {
                    question: 'Loading...',
                  },
                ],
              ]);
            }}
            type="button"
          >
            Back to Menu
          </button>
        </div>
      ) : (
        <div className="flex-box">
          <button
            className="check-answers"
            onClick={checkAnswers}
            type="button"
          >
            Check answers
          </button>
        </div>
      )}
    </div>
  );
}

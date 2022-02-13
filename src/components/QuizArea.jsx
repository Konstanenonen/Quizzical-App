/* eslint-disable react/prop-types */
import React from 'react';
import Answer from './Answer';

export default function QuizArea(props) {
  const {
    question, answers, chooseAnswer, showResults,
  } = props;

  const answerElements = answers.map((answer) => (
    <Answer
      id={answer.id}
      key={answer.id}
      chosen={answer.chosen}
      correct={answer.correct}
      answer={answer.answer}
      chooseAnswer={() => chooseAnswer(answer.id)}
      showResults={showResults}
    />
  ));

  return (
    <div className="quiz-container">
      <h2 className="question">{question}</h2>
      {answerElements}
    </div>
  );
}

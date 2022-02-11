/* eslint-disable react/prop-types */
import React from 'react';

export default function QuizPage(props) {
  const { questions } = props;
  console.log(questions);
  const questionElements = questions.map((question) => (
    <div className="quizPage--container" key={question.question}>
      <h2>{question.question}</h2>
      <div>{question.correct_answer}</div>
      <div>{question.incorrect_answers[0]}</div>
      <div>{question.incorrect_answers[1]}</div>
      <div>{question.incorrect_answers[2]}</div>
    </div>
  ));
  return (<div>{ questionElements }</div>);
}

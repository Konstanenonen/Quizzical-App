/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';

export default function Answer(props) {
  const {
    answer, chosen, correct, chooseAnswer, showResults,
  } = props;

  const duringQuiz = {
    backgroundColor: chosen && '#D6DBF5',
    borderStyle: chosen && 'none',
  };

  const afterQuiz = {
    backgroundColor: correct ? '#94D7A2' : (chosen ? '#F8BCBC' : ''),
    opacity: !correct && 0.5,
    borderStyle: chosen ? 'none' : correct ? 'none' : '',
  };

  return <button className="answer-button" style={showResults ? afterQuiz : duringQuiz} onClick={chooseAnswer} type="button">{answer}</button>;
}

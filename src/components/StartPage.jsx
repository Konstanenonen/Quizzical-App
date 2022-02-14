/* eslint-disable react/prop-types */
import React from 'react';

export default function StartPage(props) {
  const { start, setQuestionCategory } = props;

  return (
    <div className="startPage--container">
      <h1>Quizzical</h1>
      <h2>Choose a category.</h2>
      <div className="category-container">
        <button type="button" onClick={() => { setQuestionCategory('https://opentdb.com/api.php?amount=5&category=27&type=multiple'); start(); }}>Animals</button>
        <button type="button" onClick={() => { setQuestionCategory('https://opentdb.com/api.php?amount=5&category=12&type=multiple'); start(); }}>Music</button>
        <button type="button" onClick={() => { setQuestionCategory('https://opentdb.com/api.php?amount=5&category=11&type=multiple'); start(); }}>Films</button>
        <button type="button" onClick={() => { setQuestionCategory('https://opentdb.com/api.php?amount=5&category=15&type=multiple'); start(); }}>Video Games</button>
        <button type="button" onClick={() => { setQuestionCategory('https://opentdb.com/api.php?amount=5&category=14&type=multiple'); start(); }}>Television</button>
        <button type="button" onClick={() => { setQuestionCategory('https://opentdb.com/api.php?amount=5&category=16&type=multiple'); start(); }}>Board Games</button>
        <button type="button" onClick={() => { setQuestionCategory('https://opentdb.com/api.php?amount=5&category=17&type=multiple'); start(); }}>Science & Nature</button>
        <button type="button" onClick={() => { setQuestionCategory('https://opentdb.com/api.php?amount=5&category=20&type=multiple'); start(); }}>Mythology</button>
        <button type="button" onClick={() => { setQuestionCategory('https://opentdb.com/api.php?amount=5&category=21&type=multiple'); start(); }}>Sports</button>
        <button type="button" onClick={() => { setQuestionCategory('https://opentdb.com/api.php?amount=5&category=23&type=multiple'); start(); }}>History</button>
        <button type="button" onClick={() => { setQuestionCategory('https://opentdb.com/api.php?amount=5&category=22&type=multiple'); start(); }}>Geography</button>
        <button type="button" onClick={() => { setQuestionCategory('https://opentdb.com/api.php?amount=5&category=32&type=multiple'); start(); }}>Cartoons</button>
      </div>
      <p>Quizzical is a front-end web application for</p>
      <a href="https://opentdb.com/">Open Trivia Database API</a>
      <p>made with React.js</p>
    </div>
  );
}

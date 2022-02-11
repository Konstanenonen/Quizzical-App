/* eslint-disable react/prop-types */
import React from 'react';

export default function StartPage(props) {
  const { start } = props;
  return (
    <div className="startPage--container">
      <h1>Quizzical</h1>
      <h2>5 questions about animals</h2>
      <button onClick={start} type="button">Start quiz</button>
    </div>
  );
}

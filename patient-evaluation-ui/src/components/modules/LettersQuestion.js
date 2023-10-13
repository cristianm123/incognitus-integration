import React from 'react';

function LettersQuestion({ question }) {
  return (
    <div>
      <h4>{question.testName}</h4>
      <p>Letter Searched: {question.searchedLetter}</p>
      <p>Time Response: {question.timeResponseTotal} ms</p>
    </div>
  );
}

export default LettersQuestion;

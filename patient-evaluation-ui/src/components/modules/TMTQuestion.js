import React from 'react';

function TMTQuestion({ question }) {
  return (
    <div>
      <h2>TMT</h2>
      <p>Selected Sequence: {question.selection.join(' -> ')}</p>
      <p>Correct Sequence: {question.correctSelection.join(' -> ')}</p>
      <p>Time Taken: {question.timeResponseTotal / 1000}</p>
    </div>
  );
}

export default TMTQuestion;

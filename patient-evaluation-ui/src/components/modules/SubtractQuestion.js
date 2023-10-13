import React from 'react';

function SubtractQuestion({ question }) {
  return (
    <div>
      <h4>{question.testName}</h4>
      <ul>
        {question.answers.map((answer, idx) => (
          <li key={idx}>
            {answer}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubtractQuestion;

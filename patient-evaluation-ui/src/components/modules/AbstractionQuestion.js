import React from 'react';

function AbstractionQuestion({ question }) {
  return (
    <div>
      <h4>{question.testName}</h4>
      <ul>
        {question.phrasesToRepeat.map((phraseObj, idx) => (
          <li key={idx}>
            {phraseObj.phraseToRepeat} - {phraseObj.repeatedCorrectly ? "Repeated Correctly" : "Not Repeated Correctly"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AbstractionQuestion;

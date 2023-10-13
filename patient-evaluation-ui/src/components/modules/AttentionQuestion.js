import React from 'react';

function AttentionQuestion({ question }) {
  return (
    <div>
      <h4>{question.testName}</h4>
      <ul>
        {question.phrasesToRepeat.map((phrase, idx) => (
          <li key={idx}>
            {phrase.phraseToRepeat} - {phrase.repeatedCorrectly ? "Repeated Correctly" : "Incorrect"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AttentionQuestion;

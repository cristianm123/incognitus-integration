import React from 'react';

function MemoryFinalQuestion({ question }) {
  return (
    <div>
      <h4>{question.testName}</h4>
      <p>Selected Words:</p>
      <ul>
        {question.selectedWords.map((word, idx) => (
          <li key={idx}>{word}</li>
        ))}
      </ul>
      <p>Words to Remember:</p>
      <ul>
        {question.wordsToRemember.map((word, idx) => (
          <li key={idx}>{word}</li>
        ))}
      </ul>
    </div>
  );
}

export default MemoryFinalQuestion;

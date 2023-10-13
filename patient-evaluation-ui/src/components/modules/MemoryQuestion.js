import React from 'react';

function MemoryQuestion({ question }) {
  return (
    <div>
      <h4>{question.testName}</h4>
      <p>Remembered Words:</p>
      <ul>
        {question.rememberedWords.map((word, idx) => (
          <li key={idx}>{word}</li>
        ))}
      </ul>
      <p>Words Left to Remember:</p>
      <ul>
        {question.wordsLeftToRemember.map((word, idx) => (
          <li key={idx}>{word}</li>
        ))}
      </ul>
    </div>
  );
}

export default MemoryQuestion;

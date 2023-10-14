import React from 'react';

function MemoryQuestion({ question }) {
  return (
    <div>
      <h4>{question.testName}</h4>
      <p>Palabras recordadas</p>
      <ul>
        {question.rememberedWords.map((word, idx) => (
          <li key={idx}>{word}</li>
        ))}
      </ul>
      <p>Palabras por recordar:</p>
      <ul>
        {question.wordsLeftToRemember.map((word, idx) => (
          <li key={idx}>{word}</li>
        ))}
      </ul>
    </div>
  );
}

export default MemoryQuestion;

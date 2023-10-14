import React from 'react';

function MemoryFinalQuestion({ question }) {
  return (
    <div>
      <h4>{question.testName}</h4>
      <p>Palabras seleccionadas</p>
      <ul>
        {question.selectedWords.map((word, idx) => (
          <li key={idx}>{word}</li>
        ))}
      </ul>
      <p>Palabras que faltaban:</p>
      <ul>
        {question.wordsToRemember.map((word, idx) => (
          <li key={idx}>{word}</li>
        ))}
      </ul>
    </div>
  );
}

export default MemoryFinalQuestion;

import React from 'react';

function MemoryDefinitionQuestion({ question }) {
  return (
    <div>
      <h4>{question.testName}</h4>
      <ul>
        {question.wordsToRemember.map((word, idx) => (
          <li key={idx}>
            {word}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MemoryDefinitionQuestion;

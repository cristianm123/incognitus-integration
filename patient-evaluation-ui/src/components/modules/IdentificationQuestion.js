import React from 'react';

function IdentificationQuestion({ question }) {
  return (
    <div>
      <h4>{question.testName}</h4>
      <ul>
        {question.imagesToName.map((image, idx) => (
          <li key={idx}>
            {image.imageDescription} - {image.identified ? "Identificada" : "No Identificada"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IdentificationQuestion;

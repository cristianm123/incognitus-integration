import React from 'react';

function IdentificationQuestion({ question }) {
  return (
    <div>
      <h4>{question.testName}</h4>
      <ul>
        {question.imagesToName.map((image, idx) => (
          <li key={idx}>
            {image.identified ? <span class='badge text-bg-success'>{image.imageDescription}</span> : <span class='badge text-bg-warning'>{image.imageDescription}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IdentificationQuestion;

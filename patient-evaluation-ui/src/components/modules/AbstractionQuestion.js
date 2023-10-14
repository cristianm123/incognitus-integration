import React from 'react';

function AbstractionQuestion({ question }) {
  return (
    <div>
      <h4>{question.testName}</h4>
      <ul>
        {question.phrasesToRepeat.map((phraseObj, idx) => {
          if(idx > 0) {
            return (
              <li key={idx}>
                {phraseObj.phraseToRepeat} - {phraseObj.repeatedCorrectly ? "Correcto" : "Incorrecto"}
              </li>
            )
          } else {
            return ("")
          }
        })}
      </ul>
    </div>
  );
}

export default AbstractionQuestion;

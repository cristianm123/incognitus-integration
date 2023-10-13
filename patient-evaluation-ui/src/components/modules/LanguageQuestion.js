import React from 'react';

function LanguageQuestion({ question }) {
  return (
    <div>
      <h4>{question.testName}</h4>
      <ul>
        {question.phrasesToRepeat.map((phrase, idx) => (
          <li key={idx}>
            <span className={phrase.repeatedCorrectly ? "text-success" : "text-danger" }>
              {phrase.phraseToRepeat}
            </span>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LanguageQuestion;

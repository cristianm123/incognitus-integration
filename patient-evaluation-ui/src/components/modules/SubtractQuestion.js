import React from 'react';

function SubtractQuestion({ question }) {
  const calculateCorrectAnswers = () => {
    let start = question.startNumber;
    const correctAnswers = [];
    for (let i = 0; i < 5; i++) {
      start -= 7;
      correctAnswers.push(start);
    }
    return correctAnswers;
  };

  const evaluateAnswers = () => {
    const userAnswers = [...question.answers];
    const evaluations = [];
    const correctAnswers = calculateCorrectAnswers();
    
    for (let i = 0; i < correctAnswers.length; i++) {
      if (userAnswers[i] === undefined) {
        evaluations.push(<span key={i} style={{ color: 'grey' }}>N/A</span>);
      } else if (userAnswers[i] === correctAnswers[i]) {
        evaluations.push(<span key={i} style={{ color: 'green' }}>{userAnswers[i]}</span>);
      } else if (i !== 0 && userAnswers[i] === userAnswers[i-1] - 7) {
        evaluations.push(<span key={i} style={{ color: 'green' }}>{userAnswers[i]}</span>);
      } else {
        evaluations.push(<span key={i} style={{ color: 'red', textDecoration: 'underline' }}>{userAnswers[i]}</span>);
      }
    }

    return evaluations;
  };

  return (
    <div>
      <h4>{question.testName}</h4>
      <p>Número inicial: {question.startNumber}</p>
      <p>Tiempo total: {question.timeResponseTotal / 1000} ms</p>
      <div>Respuestas: {evaluateAnswers().map((answer, idx) => 
        <span key={idx}>{answer} </span>)}
      </div>
    </div>
  );
}

export default SubtractQuestion;

import React from 'react';

function TMTQuestion({ question }) {
  return (
    <div>
      <h2>TMT</h2>
      <p>Secuencia seleccionada: <b>{question.selection.join(' -> ')}</b></p>
      <p>Secuencia correcta: <b>{question.correctSelection.join(' -> ')}</b></p>
      <p>Tiempo: {question.timeResponseTotal / 1000} seg</p>
    </div>
  );
}

export default TMTQuestion;

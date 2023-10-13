import React from 'react';

function OrientationQuestion({ question }) {
  return (
    <div>
      <h4>{question.testName}</h4>
      <ul>
        <li>Día: {question.correctDay ? "Sí" : "No"}</li>
        <li>Año: {question.correctYear ? "Sí" : "No"}</li>
        <li>Mes: {question.correctMonth ? "Sí" : "No"}</li>
        <li>Sitio: {question.correctPlace ? "Sí" : "No"}</li>
        <li>Localidad: {question.correctLocality ? "Sí" : "No"}</li>
        <li>Día de la semana: {question.correctDayOfWeek ? "Sí" : "No"}</li>
      </ul>
    </div>
  );
}

export default OrientationQuestion;

import React from 'react';

function OrientationQuestion({ question }) {
  return (
    <div>
      <h4>{question.testName}</h4>
      <ul>
        <li>Correct Day: {question.correctDay ? "Yes" : "No"}</li>
        <li>Correct Year: {question.correctYear ? "Yes" : "No"}</li>
        <li>Correct Month: {question.correctMonth ? "Yes" : "No"}</li>
        <li>Correct Place: {question.correctPlace ? "Yes" : "No"}</li>
        <li>Correct Locality: {question.correctLocality ? "Yes" : "No"}</li>
        <li>Correct Day of the Week: {question.correctDayOfWeek ? "Yes" : "No"}</li>
      </ul>
    </div>
  );
}

export default OrientationQuestion;

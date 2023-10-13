import React from 'react';

function ClockQuestion({ question }) {
  return (
    <div>
      <h4>{question.testName}</h4>
      <img src={`http://localhost:9000/incognitus-processed-data/${question.clockPath}`} alt="Clock" style={{ width: '300px', height: '300px' }} />
    </div>
  );
}

export default ClockQuestion;

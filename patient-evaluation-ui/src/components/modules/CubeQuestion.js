import React from 'react';

function CubeQuestion({ question }) {
  return (
    <div>
      <h4>{question.testName}</h4>
      <img src={`http://localhost:9000/incognitus-processed-data/${question.cubePath}`} alt="Cube" style={{ width: '300px', height: '300px' }} />
    </div>
  );
}

export default CubeQuestion;

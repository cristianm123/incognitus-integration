import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function SpeechQuestion({ question }) {
  return (
    <div>
      <h4>{question.testName}</h4>
      <AudioPlayer
        src={`http://localhost:9000/incognitus-processed-data/${question.recordingPath}`} 
        style={{ width: '500px', height: '200' }}
        autoPlayAfterSrcChange={false}
        // other props here
        />
      
      <p className='mt-3'>
        Letra: {question.startLetter}
        <br />
        {question.transcription}
      </p>
    </div>
  );
}

export default SpeechQuestion;

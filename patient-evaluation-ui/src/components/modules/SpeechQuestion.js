import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function SpeechQuestion({ question }) {
  return (
    <div>
      <h4>{question.testName}</h4>
      <p>Letter Given: {question.startLetter}</p>
      <AudioPlayer
        src={`http://192.168.1.7:9000/incognitus-processed-data/${question.recordingPath}`} 
        style={{ width: '500px', height: '200' }}
        autoPlayAfterSrcChange={false}
        // other props here
      />
      <p>{question.transcription}</p>
    </div>
  );
}

export default SpeechQuestion;

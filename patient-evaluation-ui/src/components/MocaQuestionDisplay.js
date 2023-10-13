import React from 'react';
import TMTQuestion from './modules/TMTQuestion';
import CubeQuestion from './modules/CubeQuestion';
import ClockQuestion from './modules/ClockQuestion';
import IdentificationQuestion from './modules/IdentificationQuestion';
import MemoryQuestion from './modules/MemoryQuestion';
import MemoryDefinitionQuestion from './modules/MemoryDefinitionQuestion';
import MemoryFinalQuestion from './modules/MemoryFinalQuestion';
import AttentionQuestion from './modules/AttentionQuestion';
import LettersQuestion from './modules/LettersQuestion';
import SubtractQuestion from './modules/SubtractQuestion';
import LanguageQuestion from './modules/LanguageQuestion';
import SpeechQuestion from './modules/SpeechQuestion';
import AbstractionQuestion from './modules/AbstractionQuestion';
import OrientationQuestion from './modules/OrientationQuestion';
// import AbstractionQuestion from './modules/AbstractionQuestion';
// ... import other question components

function QuestionComponentSelector({ question }) {
  switch (question.testName) {
    case 'TMT':
      return <TMTQuestion question={question} />;
    case 'Cubo':
      return <CubeQuestion question={question} />;
    case 'Reloj':
      return <ClockQuestion question={question} />;
    case 'Identificación':
      return <IdentificationQuestion question={question} />;
    case 'Memoria':
      return <MemoryDefinitionQuestion question={question} />;
    case 'Atención':
      return <AttentionQuestion question={question} />;
    case 'Letras':
      return <LettersQuestion question={question} />;
    case 'Restas':
      return <SubtractQuestion question={question} />;
    case 'Lenguaje':
      return <LanguageQuestion question={question} />;
    case 'Fluidez Verbal':
      return <SpeechQuestion question={question} />;
    case 'Abstracción':
      return <AbstractionQuestion question={question} />;
    case 'Recuerdo Diferido I':
      return <MemoryQuestion question={question} />;
    case 'Recuerdo Diferido II':
      return <MemoryQuestion question={question} />;
    case 'Recuerdo Diferido III':
      return <MemoryFinalQuestion question={question} />;
    case 'Orientación':
      return <OrientationQuestion question={question} />;
    // ... other cases
    default:
      return <h3>{question.testName}</h3>;
  }
}

function MocaQuestionDisplay({ questions }) {
  return (
    <div>
      {questions.map((question, index) => (
        <QuestionComponentSelector key={index} question={question} />
      ))}
    </div>
  );
}

export default MocaQuestionDisplay;
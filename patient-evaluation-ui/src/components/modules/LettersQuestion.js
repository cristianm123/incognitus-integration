import React from 'react';

function LettersQuestion({ question }) {
  const renderLetters = () => {
    const lettersWithStyles = [];
    
    for (let i = 0; i < question.showedLetters.length; i++) {
      const letter = question.showedLetters[i];

      if (letter === question.searchedLetter && question.tappedLetters[i] === 1) {
        lettersWithStyles.push(<span key={i} style={{ color: 'green' }}>{letter}</span>);
      } else if (letter === question.searchedLetter && question.tappedLetters[i] === 0) {
        lettersWithStyles.push(<span key={i} style={{ color: 'red', textDecoration: 'underline' }}>{letter}</span>);
      } else if (letter !== question.searchedLetter && question.tappedLetters[i] === 1) {
        lettersWithStyles.push(<span key={i} style={{ color: 'red', textDecoration: 'underline' }}>{letter}</span>);
      } else {
        lettersWithStyles.push(letter);
      }

      if (i < question.showedLetters.length - 1) {
        lettersWithStyles.push(' ');  // Adding space between letters for clarity.
      }
    }

    return lettersWithStyles;
  };

  return (
    <div>
      <h4>{question.testName}</h4>
      <p>Letra a tocar: {question.searchedLetter}</p>
      <p>Tiempo de respuesta: {question.timeResponseTotal / 1000} s</p>
      <div>{renderLetters()}</div>
    </div>
  );
}

export default LettersQuestion;


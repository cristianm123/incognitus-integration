import React from 'react';
import PatientList from './components/PatientList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>MoCA Evaluation App</h1>
      </header>
      <main>
        <PatientList />
      </main>
    </div>
  );
}

export default App;

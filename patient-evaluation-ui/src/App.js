import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PatientList from './components/PatientList';

function App() {
  return (
    <div className="App">
      <main>
        <div className="container">
          <h1>MoCA Evaluation App</h1>
          <PatientList />
        </div>
      </main>
    </div>
  );
}

export default App;

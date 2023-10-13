import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MocaQuestionDisplay from './MocaQuestionDisplay';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [mocaQuestions, setMocaQuestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4020/api/patients').then(response => {
      setPatients(response.data);
    });
  }, []);

  const handlePatientClick = (id) => {
    setSelectedPatientId(id);
    axios.get(`http://localhost:4020/api/patients/${id}/evaluations/MoCA`)
      .then(response => {
        setMocaQuestions(response.data);
      });
  };

  return (
    <div>
      <h2>Patients</h2>
      <ul>
        {patients.map(patient => (
          <li key={patient.numberId}>
            <button onClick={() => handlePatientClick(patient.numberId)}>
              {patient.name} {/* Assuming your patient object has a name field */}
            </button>
          </li>
        ))}
      </ul>

      {selectedPatientId && (
        <MocaQuestionDisplay questions={mocaQuestions} />
      )}
    </div>
  );
}

export default PatientList;

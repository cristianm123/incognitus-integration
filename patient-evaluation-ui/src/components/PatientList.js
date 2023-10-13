import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MocaQuestionDisplay from './MocaQuestionDisplay';

function PatientList() {
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [mocaQuestions, setMocaQuestions] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.1.105:4020/api/patients').then(response => {
      setPatients(response.data);
    });
  }, []);

  const handlePatientClick = (id) => {
    setSelectedPatientId(id);
    axios.get(`http://192.168.1.105:4020/api/patients/${id}/evaluations/MoCA`)
      .then(response => {
        setMocaQuestions(response.data);
      });
  };

  return (
    <div>
      <h2 className='mt-5'>Pacientes</h2>
      <ul class="list-group mb-5">
        {patients.map(patient => (
            <button key={patient.numberId} className='list-group-item list-group-item-action' onClick={() => handlePatientClick(patient.numberId)}>
              {patient.name}
            </button>
        ))}
      </ul>

      {selectedPatientId && (
        <MocaQuestionDisplay questions={mocaQuestions} />
      )}
    </div>
  );
}

export default PatientList;

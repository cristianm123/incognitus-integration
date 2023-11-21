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

  const handleSelectChange = (event) => {
    setSelectedPatientId(event.target.value);
    axios.get(`http://localhost:4020/api/patients/${event.target.value}/evaluations/MoCA`)
      .then(response => {
        setMocaQuestions(response.data);
      });
  };

  return (
    <div>
      <h2 className='mt-5'>Pacientes</h2>
      <select className='form-select mb-5' value={selectedPatientId} onChange={handleSelectChange}>
        <option value="">Select a patient</option>
        {patients.map(patient => (
          <option key={patient.numberId} value={patient.numberId}>
            {patient.name} {patient.lastname} - {patient.numberId}
          </option>
        ))}
      </select>

      {selectedPatientId && (
        <MocaQuestionDisplay questions={mocaQuestions} />
      )}
    </div>
  );
}

export default PatientList;

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 4020;

app.use(cors());  // Enable CORS for all routes

const db = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'pass',
    database: 'incognitus'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

app.get('/api/patients', (req, res) => {
    db.query('SELECT * FROM patient', (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/api/patients/:id/evaluations', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM evaluation WHERE patientNumberId = ?', [id], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.get('/api/patients/:id/evaluations/MoCA', (req, res) => {
  const id = req.params.id;
  db.query('SELECT questions FROM evaluation WHERE patientNumberId = ? AND evaluationName = "MoCA" ORDER BY dateResponse DESC LIMIT 1', [id], (err, results) => {
      if (err) throw err;
        // Check if there are results and send only the 'questions' value
      if (results.length > 0) {
        res.json(JSON.parse(results[0].questions));
      } else {
        res.json([]);  // send an empty array if no results are found
      }
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});

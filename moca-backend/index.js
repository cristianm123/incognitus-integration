const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require("path");
const fs = require("fs");

const app = express();
const port = 4020;
const publicUrl = "/moca";

app.use(cors());  // Enable CORS for all routes

const buildPath = path.join(__dirname, "build");
app.use(express.static(buildPath));
app.get("/*", (req, res) => {
  let resource = decodeURI(req.path);

  if (!resource.startsWith(publicUrl)) {
    return res.status(404).send(`Resource not found: ${resource}`);
  }

  resource = resource.replace(publicUrl, "");
  const filePath = path.resolve(path.join(buildPath, resource));

  if (fs.existsSync(filePath) && resource !== "" && resource !== "/") {
    return res.sendFile(filePath);
  } else {
    return res.sendFile(path.resolve(buildPath, "index.html"));
  }
});

const db = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'ouq8Vba6UFwuK4jW3z',
    database: 'incognitus'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
});

app.get('/', (req, res) => {
  db.query('SELECT * FROM patient WHERE numberId IN (SELECT patientNumberId FROM evaluation WHERE evaluationName = "MoCA")', (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

app.get('/moca', (req, res) => {
  db.query('SELECT * FROM patient WHERE numberId IN (SELECT patientNumberId FROM evaluation WHERE evaluationName = "MoCA")', (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});

app.get('/api/patients', (req, res) => {
    db.query('SELECT * FROM patient WHERE numberId IN (SELECT patientNumberId FROM evaluation WHERE evaluationName = "MoCA")', (err, results) => {
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
  console.log(`Server running on http://0.0.0.0:${port}${publicUrl}`);
});

CREATE TABLE patient (
    numberId VARCHAR(20) PRIMARY KEY,
    name VARCHAR(255),
    lastname VARCHAR(255),
    age INT,
    birthDate DATE,
    comment TEXT,
    isDiagnostic VARCHAR(3),
    moreThan12YearsOfStudy BOOLEAN
);

-- Create the 'evaluations' table
CREATE TABLE evaluation (
    patientNumberId VARCHAR(20),
    evaluationName VARCHAR(255),
    dateResponse DATETIME,
    isFinished BOOLEAN,
    questions JSON,
    score INT,
    securedScore INT,
    timeResponseTotal INT,
    PRIMARY KEY (patientNumberId, evaluationName, dateResponse),
    FOREIGN KEY (patientNumberId) REFERENCES patient(numberId)
);
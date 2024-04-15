// infrastructureRoutes.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bd_crm'
});

// Connect
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL infrastructure_edu connected');
});

// Get all infrastructures
router.get('/', (req, res) => {
  db.query('SELECT * FROM infrastructure_edu', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch infrastructures' });
    } else {
      res.json(results);
    }
  });
});

// Get a single infrastructure
router.get('/:id', (req, res) => {
  const infrastructureId = req.params.id;
  db.query('SELECT * FROM infrastructure_edu WHERE Id_Infra_Str = ?', infrastructureId, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch infrastructure' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Infrastructure not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Add a new infrastructure
router.post('/', (req, res) => {
  const { Id_Infra_Str, Nom_Infra_Str, Adr_Infra_Str, Directeur_Infra_Str } = req.body;
  const newInfrastructure = {
    Id_Infra_Str,
    Nom_Infra_Str,
    Adr_Infra_Str,
    Directeur_Infra_Str
  };
  db.query('INSERT INTO infrastructure_edu SET ?', newInfrastructure, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add infrastructure' });
    } else {
      res.status(201).json({ message: 'Infrastructure added successfully', infrastructureId: result.insertId });
    }
  });
});

// Update an infrastructure
router.put('/:id', (req, res) => {
  const infrastructureId = req.params.id;
  const { Nom_Infra_Str, Adr_Infra_Str, Directeur_Infra_Str } = req.body;
  const updatedInfrastructure = {
    Nom_Infra_Str,
    Adr_Infra_Str,
    Directeur_Infra_Str
  };
  db.query('UPDATE infrastructure_edu SET ? WHERE Id_Infra_Str = ?', [updatedInfrastructure, infrastructureId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update infrastructure' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Infrastructure not found' });
    } else {
      res.json({ message: 'Infrastructure updated successfully' });
    }
  });
});

// Delete an infrastructure
router.delete('/:id', (req, res) => {
  const infrastructureId = req.params.id;
  db.query('DELETE FROM infrastructure_edu WHERE Id_Infra_Str = ?', infrastructureId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete infrastructure' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Infrastructure not found' });
    } else {
      res.json({ message: 'Infrastructure deleted successfully' });
    }
  });
});

module.exports = router;

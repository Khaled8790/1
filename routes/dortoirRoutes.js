// dortoirRoutes.js

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
  console.log('MySQL dortoir connected');
});

// Get all dortoirs
router.get('/', (req, res) => {
  db.query('SELECT * FROM dortoir', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch dortoirs' });
    } else {
      res.json(results);
    }
  });
});

// Add a new dortoir
router.post('/', (req, res) => {
  const { Id_Infra_Str, Genre_Dor, Nb_Chamb, Nb_Lits } = req.body;
  const newDortoir = { Id_Infra_Str, Genre_Dor, Nb_Chamb, Nb_Lits };
  db.query('INSERT INTO dortoir SET ?', newDortoir, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add dortoir' });
    } else {
      res.status(201).json({ message: 'Dortoir added successfully', dortoirId: result.insertId });
    }
  });
});

// Delete a dortoir
router.delete('/:id', (req, res) => {
  const dortoirId = req.params.id;
  db.query('DELETE FROM dortoir WHERE Id_Infra_Str = ?', dortoirId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete dortoir' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Dortoir not found' });
    } else {
      res.json({ message: 'Dortoir deleted successfully' });
    }
  });
});

module.exports = router;

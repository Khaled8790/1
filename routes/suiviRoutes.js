// suiviRoutes.js

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
  console.log('MySQL Suivi connected');
});

// Get all suivi entries
router.get('/', (req, res) => {
  db.query('SELECT * FROM suivi', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch suivi entries' });
    } else {
      res.json(results);
    }
  });
});

// Add a new suivi entry
router.post('/', (req, res) => {
  const newSuiviEntry = req.body;
  db.query('INSERT INTO suivi SET ?', newSuiviEntry, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add suivi entry' });
    } else {
      res.status(201).json({ message: 'Suivi entry added successfully', suiviId: result.insertId });
    }
  });
});

// Delete a suivi entry
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM suivi WHERE Id_Suiv = ?', id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete suivi entry' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Suivi entry not found' });
    } else {
      res.json({ message: 'Suivi entry deleted successfully' });
    }
  });
});

module.exports = router;

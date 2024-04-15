// reglementDefinRoutes.js

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
  console.log('MySQL reglement_defin connected');
});

// Get all regulations for a specific project
router.get('/:projId', (req, res) => {
  const { projId } = req.params;
  db.query('SELECT * FROM reglement_defin WHERE Id_Proj = ?', projId, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch regulations' });
    } else {
      res.json(results);
    }
  });
});

// Add a new regulation for a specific project
router.post('/:projId', (req, res) => {
  const { projId } = req.params;
  const newRegulation = { ...req.body, Id_Proj: projId };
  db.query('INSERT INTO reglement_defin SET ?', newRegulation, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add regulation' });
    } else {
      res.status(201).json({ message: 'Regulation added successfully', regulationId: result.insertId });
    }
  });
});

// Update a regulation
router.put('/:regId', (req, res) => {
  const { regId } = req.params;
  db.query('UPDATE reglement_defin SET ? WHERE Id_Reg = ?', [req.body, regId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update regulation' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Regulation not found' });
    } else {
      res.json({ message: 'Regulation updated successfully' });
    }
  });
});

// Delete a regulation
router.delete('/:regId', (req, res) => {
  const { regId } = req.params;
  db.query('DELETE FROM reglement_defin WHERE Id_Reg = ?', regId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete regulation' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Regulation not found' });
    } else {
      res.json({ message: 'Regulation deleted successfully' });
    }
  });
});

module.exports = router;

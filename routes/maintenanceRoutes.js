// maintenanceRoutes.js

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
  console.log('MySQL maintenance connected');
});

// Get all maintenance records
router.get('/', (req, res) => {
  db.query('SELECT * FROM maintenance', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch maintenance records' });
    } else {
      res.json(results);
    }
  });
});

// Add a new maintenance record
router.post('/', (req, res) => {
  const { Id_Proj } = req.body;
  const newMaintenance = { Id_Proj };
  db.query('INSERT INTO maintenance SET ?', newMaintenance, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add maintenance record' });
    } else {
      res.status(201).json({ message: 'Maintenance record added successfully', maintenanceId: result.insertId });
    }
  });
});

// Delete a maintenance record
router.delete('/:id', (req, res) => {
  const projectId = req.params.id;
  db.query('DELETE FROM maintenance WHERE Id_Proj = ?', projectId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete maintenance record' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Maintenance record not found' });
    } else {
      res.json({ message: 'Maintenance record deleted successfully' });
    }
  });
});

module.exports = router;

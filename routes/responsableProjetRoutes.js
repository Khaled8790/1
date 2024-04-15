// responsableProjetRoutes.js

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
  console.log('MySQL responsable_projet connected');
});

// Get all project responsibilities for a specific team member
router.get('/:memEqId', (req, res) => {
  const { memEqId } = req.params;
  db.query('SELECT * FROM responsable_projet WHERE Id_Mem_Eq = ?', memEqId, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch project responsibilities' });
    } else {
      res.json(results);
    }
  });
});

// Add a new project responsibility for a team member
router.post('/', (req, res) => {
  const newResponsibility = req.body;
  db.query('INSERT INTO responsable_projet SET ?', newResponsibility, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add project responsibility' });
    } else {
      res.status(201).json({ message: 'Project responsibility added successfully', responsibilityId: result.insertId });
    }
  });
});

// Delete a project responsibility for a team member
router.delete('/:memEqId', (req, res) => {
  const { memEqId } = req.params;
  db.query('DELETE FROM responsable_projet WHERE Id_Mem_Eq = ?', memEqId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete project responsibility' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Project responsibility not found' });
    } else {
      res.json({ message: 'Project responsibility deleted successfully' });
    }
  });
});

module.exports = router;

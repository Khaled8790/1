// membreProjetRoutes.js

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
  console.log('MySQL membre_projet connected');
});

// Get all project members
router.get('/', (req, res) => {
  db.query('SELECT * FROM membre_projet', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch project members' });
    } else {
      res.json(results);
    }
  });
});

// Add a new project member
router.post('/', (req, res) => {
  const { Id_Proj, Id_Mem_Eq } = req.body;
  const newMember = { Id_Proj, Id_Mem_Eq };
  db.query('INSERT INTO membre_projet SET ?', newMember, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add project member' });
    } else {
      res.status(201).json({ message: 'Project member added successfully', memberId: result.insertId });
    }
  });
});

// Delete a project member
router.delete('/:projId/:memId', (req, res) => {
  const { projId, memId } = req.params;
  db.query('DELETE FROM membre_projet WHERE Id_Proj = ? AND Id_Mem_Eq = ?', [projId, memId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete project member' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Project member not found' });
    } else {
      res.json({ message: 'Project member deleted successfully' });
    }
  });
});

module.exports = router;

// constructionRoutes.js

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
  console.log('MySQL construction connected');
});

// Get all construction projects
router.get('/', (req, res) => {
  db.query('SELECT * FROM construction', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch construction projects' });
    } else {
      res.json(results);
    }
  });
});

// Add a new construction project
router.post('/', (req, res) => {
  const { Id_Proj } = req.body;
  const newConstructionProject = { Id_Proj };
  db.query('INSERT INTO construction SET ?', newConstructionProject, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add construction project' });
    } else {
      res.status(201).json({ message: 'Construction project added successfully', projectId: result.insertId });
    }
  });
});

// Delete a construction project
router.delete('/:id', (req, res) => {
  const projectId = req.params.id;
  db.query('DELETE FROM construction WHERE Id_Proj = ?', projectId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete construction project' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Construction project not found' });
    } else {
      res.json({ message: 'Construction project deleted successfully' });
    }
  });
});

module.exports = router;

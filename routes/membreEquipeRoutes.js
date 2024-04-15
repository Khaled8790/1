// membreEquipeRoutes.js

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
  console.log('MySQL membre_equipe connected');
});

// Get all team members
router.get('/', (req, res) => {
  db.query('SELECT * FROM membre_equipe', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch team members' });
    } else {
      res.json(results);
    }
  });
});

// Add a new team member
router.post('/', (req, res) => {
  const { Id_Mem_Eq, Nom_Mem_Eq, Pren_Mem_Eq, Adr_Mem_Eq, Email_Mem_Eq, Tel_Mem_Eq, Poste_Mem_eq, Id_log, Role_Mem_Eq } = req.body;
  const newMember = { Id_Mem_Eq, Nom_Mem_Eq, Pren_Mem_Eq, Adr_Mem_Eq, Email_Mem_Eq, Tel_Mem_Eq, Poste_Mem_eq, Id_log, Role_Mem_Eq };
  db.query('INSERT INTO membre_equipe SET ?', newMember, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add team member' });
    } else {
      res.status(201).json({ message: 'Team member added successfully', memberId: result.insertId });
    }
  });
});

// Update a team member
router.put('/:id', (req, res) => {
  const memberId = req.params.id;
  const { Nom_Mem_Eq, Pren_Mem_Eq, Adr_Mem_Eq, Email_Mem_Eq, Tel_Mem_Eq, Poste_Mem_eq, Id_log, Role_Mem_Eq } = req.body;
  db.query('UPDATE membre_equipe SET Nom_Mem_Eq = ?, Pren_Mem_Eq = ?, Adr_Mem_Eq = ?, Email_Mem_Eq = ?, Tel_Mem_Eq = ?, Poste_Mem_eq = ?, Id_log = ?, Role_Mem_Eq = ? WHERE Id_Mem_Eq = ?', [Nom_Mem_Eq, Pren_Mem_Eq, Adr_Mem_Eq, Email_Mem_Eq, Tel_Mem_Eq, Poste_Mem_eq, Id_log, Role_Mem_Eq, memberId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update team member' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Team member not found' });
    } else {
      res.json({ message: 'Team member updated successfully' });
    }
  });
});

// Delete a team member
router.delete('/:id', (req, res) => {
  const memberId = req.params.id;
  db.query('DELETE FROM membre_equipe WHERE Id_Mem_Eq = ?', memberId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete team member' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Team member not found' });
    } else {
      res.json({ message: 'Team member deleted successfully' });
    }
  });
});

module.exports = router;

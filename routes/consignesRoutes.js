// consignesRoutes.js

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
  console.log('MySQL consignes connected');
});

// Get all consignes
router.get('/', (req, res) => {
  db.query('SELECT * FROM consignes', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch consignes' });
    } else {
      res.json(results);
    }
  });
});

// Add a new consigne
router.post('/', (req, res) => {
  const { Sujet_Cons, Date_Cons, Id_Mem_Eq, Id_Proj } = req.body;
  const newConsigne = { Sujet_Cons, Date_Cons, Id_Mem_Eq, Id_Proj };
  db.query('INSERT INTO consignes SET ?', newConsigne, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add consigne' });
    } else {
      res.status(201).json({ message: 'Consigne added successfully', consigneId: result.insertId });
    }
  });
});

// Update a consigne
router.put('/:id', (req, res) => {
  const consigneId = req.params.id;
  const { Sujet_Cons, Date_Cons, Id_Mem_Eq, Id_Proj } = req.body;
  db.query('UPDATE consignes SET Sujet_Cons = ?, Date_Cons = ?, Id_Mem_Eq = ?, Id_Proj = ? WHERE Id_Cons = ?', [Sujet_Cons, Date_Cons, Id_Mem_Eq, Id_Proj, consigneId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update consigne' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Consigne not found' });
    } else {
      res.json({ message: 'Consigne updated successfully' });
    }
  });
});

// Delete a consigne
router.delete('/:id', (req, res) => {
  const consigneId = req.params.id;
  db.query('DELETE FROM consignes WHERE Id_Cons = ?', consigneId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete consigne' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Consigne not found' });
    } else {
      res.json({ message: 'Consigne deleted successfully' });
    }
  });
});

module.exports = router;

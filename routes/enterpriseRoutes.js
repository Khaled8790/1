// entrepriseConsRoutes.js

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
  console.log('MySQL entreprise_cons connected');
});

// Get all enterprise consultancies
router.get('/', (req, res) => {
  db.query('SELECT * FROM entreprise_cons', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch enterprise consultancies' });
    } else {
      res.json(results);
    }
  });
});

// Add a new enterprise consultancy
router.post('/', (req, res) => {
  const { Id_Entr_Cons, Nom_Entr_Cons, Adr_Entr_Cons, Resp_Entr_Cons, Tel_Entr_Cons, Domaine_Entr_Cons, Notes_Entr_Cons } = req.body;
  const newEnterpriseCons = { Id_Entr_Cons, Nom_Entr_Cons, Adr_Entr_Cons, Resp_Entr_Cons, Tel_Entr_Cons, Domaine_Entr_Cons, Notes_Entr_Cons };
  db.query('INSERT INTO entreprise_cons SET ?', newEnterpriseCons, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add enterprise consultancy' });
    } else {
      res.status(201).json({ message: 'Enterprise consultancy added successfully', enterpriseId: result.insertId });
    }
  });
});

// Delete an enterprise consultancy
router.delete('/:id', (req, res) => {
  const enterpriseId = req.params.id;
  db.query('DELETE FROM entreprise_cons WHERE Id_Entr_Cons = ?', enterpriseId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete enterprise consultancy' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Enterprise consultancy not found' });
    } else {
      res.json({ message: 'Enterprise consultancy deleted successfully' });
    }
  });
});

module.exports = router;

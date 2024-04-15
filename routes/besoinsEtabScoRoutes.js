// besoinsEtabScoRoutes.js

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
  console.log('MySQL besoins_etab_sco connected');
});

// Get all needs for educational establishments
router.get('/', (req, res) => {
  db.query('SELECT * FROM besoins_etab_sco', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch needs for educational establishments' });
    } else {
      res.json(results);
    }
  });
});

// Add a need for an educational establishment
router.post('/', (req, res) => {
  const { Id_Bes, Qte_Bes, Date_Bes, Desc_Bes, Remarques_Bes, Id_Infra_Str } = req.body;
  const newNeed = { Id_Bes, Qte_Bes, Date_Bes, Desc_Bes, Remarques_Bes, Id_Infra_Str };
  db.query('INSERT INTO besoins_etab_sco SET ?', newNeed, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add need for educational establishment' });
    } else {
      res.status(201).json({ message: 'Need for educational establishment added successfully', needId: result.insertId });
    }
  });
});

// Delete a need for an educational establishment
router.delete('/:id', (req, res) => {
  const needId = req.params.id;
  db.query('DELETE FROM besoins_etab_sco WHERE Id_Bes = ?', needId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete need for educational establishment' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Need for educational establishment not found' });
    } else {
      res.json({ message: 'Need for educational establishment deleted successfully' });
    }
  });
});

module.exports = router;

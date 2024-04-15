// etablissementScolaireRoutes.js

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
  console.log('MySQL etablissement_scolaire connected');
});

// Get all educational establishments
router.get('/', (req, res) => {
  db.query('SELECT * FROM etablissement_scolaire', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch educational establishments' });
    } else {
      res.json(results);
    }
  });
});

// Add an educational establishment
router.post('/', (req, res) => {
  const { Id_Infra_Str, Cat_Etab_Sco, Effectif, Nb_Salles } = req.body;
  const newEstablishment = { Id_Infra_Str, Cat_Etab_Sco, Effectif, Nb_Salles };
  db.query('INSERT INTO etablissement_scolaire SET ?', newEstablishment, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add educational establishment' });
    } else {
      res.status(201).json({ message: 'Educational establishment added successfully', establishmentId: result.insertId });
    }
  });
});

// Delete an educational establishment
router.delete('/:id', (req, res) => {
  const infraId = req.params.id;
  db.query('DELETE FROM etablissement_scolaire WHERE Id_Infra_Str = ?', infraId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete educational establishment' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Educational establishment not found' });
    } else {
      res.json({ message: 'Educational establishment deleted successfully' });
    }
  });
});

module.exports = router;

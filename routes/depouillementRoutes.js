// depouillementRoutes.js

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
  console.log('MySQL depouillement connected');
});

// Get all depouillements
router.get('/', (req, res) => {
  db.query('SELECT * FROM depouillement', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch depouillements' });
    } else {
      res.json(results);
    }
  });
});

// Add a new depouillement
router.post('/', (req, res) => {
  const { Id_Dep, Obj_Dep, Desc_Dep, Date_Deb_Dep, Date_Fin_Dep, Statut_Dep, Remarques_Dep, Id_Entr_Cons, Id_Proj } = req.body;
  const newDepouillement = { Id_Dep, Obj_Dep, Desc_Dep, Date_Deb_Dep, Date_Fin_Dep, Statut_Dep, Remarques_Dep, Id_Entr_Cons, Id_Proj };
  db.query('INSERT INTO depouillement SET ?', newDepouillement, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add depouillement' });
    } else {
      res.status(201).json({ message: 'Depouillement added successfully', depouillementId: result.insertId });
    }
  });
});

// Delete a depouillement
router.delete('/:id', (req, res) => {
  const depouillementId = req.params.id;
  db.query('DELETE FROM depouillement WHERE Id_Dep = ?', depouillementId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete depouillement' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Depouillement not found' });
    } else {
      res.json({ message: 'Depouillement deleted successfully' });
    }
  });
});

module.exports = router;

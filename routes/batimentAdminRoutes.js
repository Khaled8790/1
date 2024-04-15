// batimentAdminRoutes.js

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
  console.log('MySQL batiment_admin connected');
});

// Get all administrative buildings
router.get('/', (req, res) => {
  db.query('SELECT * FROM batiment_admin', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch administrative buildings' });
    } else {
      res.json(results);
    }
  });
});

// Add an administrative building
router.post('/', (req, res) => {
  const { Id_Infra_Str, Surface_Bat, Nb_Etages, Usages } = req.body;
  const newBuilding = { Id_Infra_Str, Surface_Bat, Nb_Etages, Usages };
  db.query('INSERT INTO batiment_admin SET ?', newBuilding, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add administrative building' });
    } else {
      res.status(201).json({ message: 'Administrative building added successfully', buildingId: result.insertId });
    }
  });
});

// Delete an administrative building
router.delete('/:id', (req, res) => {
  const infraId = req.params.id;
  db.query('DELETE FROM batiment_admin WHERE Id_Infra_Str = ?', infraId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete administrative building' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Administrative building not found' });
    } else {
      res.json({ message: 'Administrative building deleted successfully' });
    }
  });
});

module.exports = router;

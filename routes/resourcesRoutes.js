// resourcesRoutes.js

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
  console.log('MySQL ressources connected');
});

// Get all resources
router.get('/', (req, res) => {
  db.query('SELECT * FROM ressources', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch resources' });
    } else {
      res.json(results);
    }
  });
});

// Get a single resource
router.get('/:id', (req, res) => {
  const resourceId = req.params.id;
  db.query('SELECT * FROM ressources WHERE Id_Res = ?', resourceId, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch resource' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Resource not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Add a new resource
router.post('/', (req, res) => {
  const { Id_Res, Qte_Res, Unite_Res, Cout_Uni_Res, Cout_Tot_Res, Date_Deb_Res, Date_Fin_Res, Etat_Res } = req.body;
  const newResource = {
    Id_Res,
    Qte_Res,
    Unite_Res,
    Cout_Uni_Res,
    Cout_Tot_Res,
    Date_Deb_Res,
    Date_Fin_Res,
    Etat_Res
  };
  db.query('INSERT INTO ressources SET ?', newResource, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to add resource' });
    } else {
      res.status(201).json({ message: 'Resource added successfully', resourceId: result.insertId });
    }
  });
});

// Update a resource
router.put('/:id', (req, res) => {
  const resourceId = req.params.id;
  const { Qte_Res, Unite_Res, Cout_Uni_Res, Cout_Tot_Res, Date_Deb_Res, Date_Fin_Res, Etat_Res } = req.body;
  const updatedResource = {
    Qte_Res,
    Unite_Res,
    Cout_Uni_Res,
    Cout_Tot_Res,
    Date_Deb_Res,
    Date_Fin_Res,
    Etat_Res
  };
  db.query('UPDATE ressources SET ? WHERE Id_Res = ?', [updatedResource, resourceId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update resource' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Resource not found' });
    } else {
      res.json({ message: 'Resource updated successfully' });
    }
  });
});

// Delete a resource
router.delete('/:id', (req, res) => {
  const resourceId = req.params.id;
  db.query('DELETE FROM ressources WHERE Id_Res = ?', resourceId, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete resource' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Resource not found' });
    } else {
      res.json({ message: 'Resource deleted successfully' });
    }
  });
});

module.exports = router;

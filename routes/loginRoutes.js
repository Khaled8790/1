const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// MySQL Connection
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
    console.log('MySQL login connected');
  });
// Create a new login
router.post('/', (req, res) => {
  const { Id_log, users, passwords } = req.body;
  const insertQuery = 'INSERT INTO login (Id_log, users, passwords) VALUES (?, ?, ?)';
  db.query(insertQuery, [Id_log, users, passwords], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to create login' });
    } else {
      res.json({ message: 'Login created successfully', loginId: result.insertId });
    }
  });
});

// Get all logins
router.get('/', (req, res) => {
  const selectQuery = 'SELECT * FROM login';
  db.query(selectQuery, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch logins' });
    } else {
      res.json(results);
    }
  });
});

// Get login by Id
router.get('/:id', (req, res) => {
  const loginId = req.params.id;
  const selectQuery = 'SELECT * FROM login WHERE Id_log = ?';
  db.query(selectQuery, [loginId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch login' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Login not found' });
    } else {
      res.json(results[0]);
    }
  });
});

// Update a login
router.put('/:id', (req, res) => {
  const loginId = req.params.id;
  const { users, passwords } = req.body;
  const updateQuery = 'UPDATE login SET users = ?, passwords = ? WHERE Id_log = ?';
  db.query(updateQuery, [users, passwords, loginId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update login' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Login not found' });
    } else {
      res.json({ message: 'Login updated successfully' });
    }
  });
});

// Delete a login
router.delete('/:id', (req, res) => {
  const loginId = req.params.id;
  const deleteQuery = 'DELETE FROM login WHERE Id_log = ?';
  db.query(deleteQuery, [loginId], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete login' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Login not found' });
    } else {
      res.json({ message: 'Login deleted successfully' });
    }
  });
});

module.exports = router;

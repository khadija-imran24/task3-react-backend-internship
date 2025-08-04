// /routes/blog.js
const express = require('express');
const router = express.Router();
const db = require('../database/sql');
const multer = require('multer');
const path = require('path');

// Configure Multer to store files in public/images/
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });

// POST route to add blog with image
router.post('/', upload.single('coverImage'), (req, res) => {
  const { title, content, date } = req.body;
  const coverImagePath = req.file ? `/images/${req.file.filename}` : null;

  const sql = 'INSERT INTO blogs (title, content, date, coverImage) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, content, date, coverImagePath], (err, result) => {
    if (err) {
      console.error('DB Insert Error:', err); 
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: result.insertId, coverImage: coverImagePath });
  });
});

// GET all blogs
router.get('/', (req, res) => {
  db.query('SELECT * FROM blogs ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});
// GET a single blog by ID
router.get('/:id', (req, res) => {
  const blogId = req.params.id;
  db.query('SELECT * FROM blogs WHERE id = ?', [blogId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    if (rows.length === 0) return res.status(404).json({ error: 'Blog not found' });
    res.json(rows[0]);
  });
});

module.exports = router;

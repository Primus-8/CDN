// api/index.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Allow static files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.post('/upload', upload.single('image'), (req, res) => {
  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url: imageUrl });
});

module.exports = app;

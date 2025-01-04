const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

dotenv.config();
app.use(cors());
app.use(express.json());


app.post('/api/shorten', (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const maxLength = 20;
  const shortenedText = text.length > maxLength 
    ? text.slice(0, maxLength) + '...' 
    : text;

  res.json({ shortenedText });
});

app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

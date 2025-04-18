const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/qr-generate', (req, res) => {
  const { text, size = '150x150' } = req.query;
  if (!text) {
    return res.status(400).json({ error: "Текст для QR-кода не предоставлен" });
  }
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodeURIComponent(text)}`;
  res.json({ qrUrl });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
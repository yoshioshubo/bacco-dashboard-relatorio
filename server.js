const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const html = fs.readFileSync(path.join(__dirname, 'public', 'index.html'), 'utf-8');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.send(html));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

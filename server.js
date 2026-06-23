const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const htmlPath = path.join(__dirname, 'public', 'index.html');

// Load HTML at startup with error handling
let html;
try {
  html = fs.readFileSync(htmlPath, 'utf-8');
  console.log(`✓ Loaded HTML: ${htmlPath} (${html.length} bytes)`);
} catch (err) {
  console.error(`✗ Failed to load HTML from ${htmlPath}`);
  console.error(`  Error: ${err.message}`);
  process.exit(1);
}

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => res.send(html));
app.get('/health', (req, res) => res.json({ status: 'ok' }));

const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

server.on('error', (err) => {
  console.error(`Server error: ${err.message}`);
  process.exit(1);
});

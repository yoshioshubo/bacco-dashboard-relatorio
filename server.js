const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Read HTML file once at startup
let htmlContent = '';
try {
  const htmlPath = path.join(__dirname, 'public', 'index.html');
  htmlContent = fs.readFileSync(htmlPath, 'utf8');
  console.log('✓ HTML file loaded:', htmlPath.length, 'bytes');
} catch (err) {
  console.error('✗ Failed to load HTML:', err.message);
  process.exit(1);
}

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Root route - serve from memory
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(htmlContent);
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('Server running on port', PORT);
});

module.exports = app;

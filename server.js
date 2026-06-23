const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Root route - serve dashboard
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n==============================================`);
  console.log(`  BACCO - Dashboard Relatório`);
  console.log(`==============================================`);
  console.log(`  Servidor rodando em: http://localhost:${PORT}`);
  console.log(`==============================================\n`);
});

module.exports = app;

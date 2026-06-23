const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Resolve public directory
const publicDir = path.join(__dirname, 'public');

// Middleware
app.use(express.json());
app.use(express.static(publicDir));

// Root route - serve dashboard
app.get('/', (req, res) => {
  const indexPath = path.join(publicDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Dashboard file not found');
  }
});

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.path });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n==============================================`);
  console.log(`  BACCO - Dashboard Relatório`);
  console.log(`==============================================`);
  console.log(`  Servidor rodando em porta: ${PORT}`);
  console.log(`  Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`  Public dir: ${publicDir}`);
  console.log(`==============================================\n`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = app;

const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

console.log('🚀 Starting BACCO Dashboard Server');
console.log(`   Port: ${PORT}`);
console.log(`   ENV: ${process.env.NODE_ENV || 'development'}`);
console.log(`   __dirname: ${__dirname}`);

// Resolve paths
const publicDir = path.join(__dirname, 'public');
const indexPath = path.join(publicDir, 'index.html');

console.log(`   Public dir: ${publicDir}`);
console.log(`   Index path: ${indexPath}`);
console.log(`   Index exists: ${fs.existsSync(indexPath)}`);

// Middleware
app.use(express.json());
app.use(express.static(publicDir, {
  maxAge: '1d',
  etag: false
}));

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    port: PORT
  });
});

// Root route
app.get('/', (req, res) => {
  console.log('📄 Serving index.html');

  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('❌ Error sending file:', err);
        res.status(500).send('Error loading dashboard');
      }
    });
  } else {
    console.error('❌ index.html not found at:', indexPath);
    res.status(404).json({ error: 'Dashboard not found', path: indexPath });
  }
});

// 404 fallback
app.use((req, res) => {
  console.log(`404: ${req.method} ${req.path}`);
  res.status(404).json({ error: 'Not found', path: req.path });
});

// Start
const server = app.listen(PORT, () => {
  console.log(`\n✅ Server running on port ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`🔗 Health: http://localhost:${PORT}/health\n`);
});

server.on('error', (err) => {
  console.error('❌ Server error:', err);
  process.exit(1);
});

process.on('SIGTERM', () => {
  console.log('\n⚠️  SIGTERM received, shutting down...');
  server.close(() => process.exit(0));
});

module.exports = app;

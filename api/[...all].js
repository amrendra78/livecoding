// Catch-all entry for Vercel functions under /api/*
// Forwards requests to the Express app exported from server.js
const server = require('./server');

// server.js exports the express app and serverless handler
// module.exports.handler = serverless(app)

module.exports = server.handler;

import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

import fs from 'fs';
import bcrypt from 'bcryptjs';
import bodyParser from 'body-parser';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Path to users JSON file
const usersFile = join(import.meta.dirname, 'users.json');


// User type
type User = { name: string; email: string; password: string };

// Helper to read users from file
function readUsers(): User[] {
  if (!fs.existsSync(usersFile)) return [];
  const data = fs.readFileSync(usersFile, 'utf-8');
  try {
    return JSON.parse(data) as User[];
  } catch {
    return [];
  }
}

// Helper to write users to file
function writeUsers(users: User[]): void {
  // Ensure directory exists
  const path = require('path');
  const dir = path.dirname(usersFile);
  if (dir && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }
  const users = readUsers();
  if (users.find((u: User) => u.email === email)) {
    res.status(400).json({ error: 'User already exists' });
    return;
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ name, email, password: hashedPassword });
  writeUsers(users);
  res.status(201).json({ message: 'Signup successful' });
  return;
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }
  const users = readUsers();
  const user = users.find((u: User) => u.email === email);
  if (!user) {
    res.status(400).json({ error: 'Invalid credentials' });
    return;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).json({ error: 'Invalid credentials' });
    return;
  }
  res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
  return;
});

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/{*splat}', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);

import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { PORT } from './config.js';
import { listInvoicesHandler, getInvoiceHandler } from './routes/invoices.js';
import { signupHandler } from './routes/signup.js';

const PUBLIC_DIR = new URL('../public/', import.meta.url);
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };

function send(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

async function readBody(req) {
  let raw = '';
  for await (const chunk of req) raw += chunk;
  try { return raw ? JSON.parse(raw) : {}; } catch { return null; }
}

export function createApp() {
  return createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost');
    const path = url.pathname;

    if (req.method === 'GET' && path === '/api/invoices') return listInvoicesHandler(req, res, send);
    const match = path.match(/^\/api\/invoices\/([\w-]+)$/);
    if (req.method === 'GET' && match) return getInvoiceHandler(req, res, send, match[1]);
    if (req.method === 'POST' && path === '/api/signup') {
      const body = await readBody(req);
      if (body === null) return send(res, 400, { error: 'Invalid JSON' });
      return signupHandler(req, res, send, body);
    }

    const file = path === '/' ? 'index.html' : path.slice(1);
    try {
      const content = await readFile(new URL(file, PUBLIC_DIR));
      res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'text/plain' });
      res.end(content);
    } catch {
      send(res, 404, { error: 'Not found' });
    }
  });
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  createApp().listen(PORT, () => console.log(`Ledgerly running at http://localhost:${PORT}`));
}

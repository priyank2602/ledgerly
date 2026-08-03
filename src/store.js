import { readFileSync } from 'node:fs';

const DATA_FILE = new URL('./data/invoices.json', import.meta.url);

export function loadInvoices() {
  return JSON.parse(readFileSync(DATA_FILE, 'utf8'));
}

export function findInvoice(id) {
  return loadInvoices().find((inv) => inv.id === id) || null;
}

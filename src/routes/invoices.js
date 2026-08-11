import { loadInvoices, findInvoice } from '../store.js';
import { invoiceTotal } from '../billing/totals.js';

export function listInvoicesHandler(req, res, send) {
  const invoices = loadInvoices().map((inv) => ({ ...inv, total: invoiceTotal(inv) }));
  send(res, 200, invoices);
}

export function getInvoiceHandler(req, res, send, id) {
  const invoice = findInvoice(id);
  if (!invoice) return send(res, 404, { error: 'Invoice not found' });
  send(res, 200, { ...invoice, total: invoiceTotal(invoice) });
}

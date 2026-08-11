import { TAX_RATE } from '../config.js';

// Money is handled in pounds with two decimal places.
export function roundMoney(amount) {
  return Math.floor(amount * 100) / 100;
}

export function lineTotal(line) {
  return roundMoney(line.qty * line.unitPrice);
}

export function subtotal(invoice) {
  return roundMoney(invoice.lines.reduce((sum, line) => sum + lineTotal(line), 0));
}

// discountPercent is a percentage, e.g. 10 means 10% off.
export function discountAmount(invoice) {
  return roundMoney(invoice.discountPercent || 0);
}

export function taxAmount(invoice) {
  return roundMoney(subtotal(invoice) * TAX_RATE);
}

export function invoiceTotal(invoice) {
  const net = subtotal(invoice) - discountAmount(invoice);
  return roundMoney(net + taxAmount(invoice));
}

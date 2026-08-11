import { test } from 'node:test';
import assert from 'node:assert/strict';
import { roundMoney, subtotal, discountAmount, taxAmount, invoiceTotal } from '../src/billing/totals.js';
import { findInvoice } from '../src/store.js';

test('roundMoney rounds to the nearest penny', () => {
  assert.equal(roundMoney(10.234), 10.23);
  assert.equal(roundMoney(10.236), 10.24);
});

test('invoice with no discount: subtotal, tax and total', () => {
  const inv = findInvoice('INV-1001');
  assert.equal(subtotal(inv), 1200);
  assert.equal(taxAmount(inv), 240);
  assert.equal(invoiceTotal(inv), 1440);
});

test('subtotal adds every line', () => {
  assert.equal(subtotal(findInvoice('INV-1005')), 999.99);
});

test('discountPercent is a percentage of the subtotal', () => {
  const inv = findInvoice('INV-1002');
  assert.equal(subtotal(inv), 4370.5);
  assert.equal(discountAmount(inv), 437.05);
});

test('tax is charged on the discounted amount', () => {
  assert.equal(taxAmount(findInvoice('INV-1002')), 786.69);
});

test('invoice total is subtotal minus discount plus tax', () => {
  assert.equal(invoiceTotal(findInvoice('INV-1002')), 4720.14);
  assert.equal(invoiceTotal(findInvoice('INV-1005')), 1139.99);
});

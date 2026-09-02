import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isOverdue, daysOverdue } from '../src/billing/dates.js';

const invoice = { status: 'sent', due: '2026-10-01' };

test('paid invoices are never overdue', () => {
  assert.equal(isOverdue({ ...invoice, status: 'paid' }, '2026-12-01'), false);
});

test('an invoice is not overdue on its due date', () => {
  assert.equal(isOverdue(invoice, '2026-10-01'), false);
});

test('an invoice is overdue the day after its due date', () => {
  assert.equal(isOverdue(invoice, '2026-10-02'), true);
});

test('daysOverdue counts whole days past the due date', () => {
  assert.equal(daysOverdue(invoice, '2026-10-04'), 3);
  assert.equal(daysOverdue(invoice, '2026-09-20'), 0);
});

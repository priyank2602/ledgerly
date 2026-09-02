const DAY_MS = 24 * 60 * 60 * 1000;

function toDate(value) {
  return value instanceof Date ? value : new Date(`${value}T00:00:00Z`);
}

// An invoice is overdue once its due date has passed and it is not paid.
export function isOverdue(invoice, today = new Date()) {
  if (invoice.status === 'paid') return false;
  return toDate(invoice.due) <= toDate(today);
}

export function daysOverdue(invoice, today = new Date()) {
  if (!isOverdue(invoice, today)) return 0;
  return Math.round((toDate(today) - toDate(invoice.due)) / DAY_MS) + 1;
}

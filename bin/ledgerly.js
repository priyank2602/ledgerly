#!/usr/bin/env node
import { loadInvoices, findInvoice } from '../src/store.js';
import { invoiceTotal, subtotal, discountAmount, taxAmount } from '../src/billing/totals.js';
import { CURRENCY } from '../src/config.js';

const money = (n) => `${CURRENCY} ${n.toFixed(2)}`;

const commands = {
  list() {
    for (const inv of loadInvoices()) {
      console.log(`${inv.id}  ${inv.customer.padEnd(20)}  ${inv.status.padEnd(6)}  due ${inv.due}  ${money(invoiceTotal(inv))}`);
    }
  },

  show(id) {
    const inv = findInvoice(id);
    if (!inv) {
      console.error(`No invoice with id ${id}`);
      process.exitCode = 1;
      return;
    }
    console.log(`${inv.id} for ${inv.customer} (${inv.status})`);
    for (const line of inv.lines) {
      console.log(`  ${line.qty} x ${line.description} @ ${money(line.unitPrice)}`);
    }
    console.log(`  Subtotal  ${money(subtotal(inv))}`);
    console.log(`  Discount  ${money(discountAmount(inv))}`);
    console.log(`  Tax       ${money(taxAmount(inv))}`);
    console.log(`  Total     ${money(invoiceTotal(inv))}`);
  },

  total() {
    const outstanding = loadInvoices().filter((inv) => inv.status !== 'paid');
    const sum = outstanding.reduce((acc, inv) => acc + invoiceTotal(inv), 0);
    console.log(`${outstanding.length} outstanding invoices, ${money(sum)}`);
  },

  help() {
    console.log(`Usage: ledgerly <command>

Commands:
  list         List all invoices
  show <id>    Show one invoice with its totals
  total        Sum of all outstanding invoices
  help         Show this message`);
  },
};

const [command = 'help', ...args] = process.argv.slice(2);
const run = commands[command];
if (!run) {
  console.error(`Unknown command: ${command}`);
  commands.help();
  process.exitCode = 1;
} else {
  run(...args);
}

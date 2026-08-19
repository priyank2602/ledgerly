import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';

const cli = (...args) => execFileSync(process.execPath, ['bin/ledgerly.js', ...args], { encoding: 'utf8' });

test('list prints every invoice', () => {
  const out = cli('list');
  assert.match(out, /INV-1001/);
  assert.match(out, /INV-1006/);
});

test('help lists the commands', () => {
  assert.match(cli('help'), /Commands:/);
});

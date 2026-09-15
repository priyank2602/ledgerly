import { test, before, after, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/server.js';
import { resetUsers } from '../src/users.js';

let server;
let base;

before(async () => {
  server = createApp();
  await new Promise((resolve) => server.listen(0, resolve));
  base = `http://localhost:${server.address().port}`;
});

after(() => server.close());
beforeEach(() => resetUsers());

const post = (body) =>
  fetch(`${base}/api/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

test('signup creates a user', async () => {
  const res = await post({ email: 'sam@example.com', password: 'abc' });
  assert.equal(res.status, 201);
  const user = await res.json();
  assert.equal(user.email, 'sam@example.com');
  assert.equal(user.password, undefined);
});

test('signup rejects a body that is not JSON', async () => {
  const res = await post('not json');
  assert.equal(res.status, 400);
});

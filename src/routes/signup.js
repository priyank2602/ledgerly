import { createUser } from '../users.js';

export function signupHandler(req, res, send, body) {
  const { email, password } = body || {};
  const user = createUser({ email, password });
  send(res, 201, user);
}

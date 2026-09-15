// In-memory user store. Resets every time the server restarts.
const users = [];

export function createUser({ email, password }) {
  const user = { id: users.length + 1, email, createdAt: new Date().toISOString() };
  users.push({ ...user, password });
  return user;
}

export function listUsers() {
  return users.map(({ password, ...rest }) => rest);
}

export function resetUsers() {
  users.length = 0;
}

# Ledgerly

A tiny invoicing app, used as the practice project for the Claude Code workshop.

> Ledgerly has bugs, a messy CLAUDE.md and a broken skill **on purpose**. You'll fix them during the workshop. Please don't fix them before the session they belong to.

## Requirements

Node.js 20 or newer. There are no dependencies to install.

## Run it

```sh
npm start                      # web app on http://localhost:4000
npm test                       # run the test suite
node bin/ledgerly.js list      # the CLI
node bin/ledgerly.js show INV-1002
```

## What's inside

| Path | What it is |
|---|---|
| `bin/ledgerly.js` | The command-line tool |
| `src/server.js` | Web server and API routes |
| `src/billing/` | Totals, discounts, tax and due dates |
| `src/routes/` | API handlers for invoices and signup |
| `src/data/invoices.json` | Sample invoices |
| `public/` | The web pages (invoice list and signup form) |
| `test/` | Tests, run with Node's built-in test runner |
| `.claude/` | Claude Code skills for this project |

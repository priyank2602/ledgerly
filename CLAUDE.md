# Ledgerly

Ledgerly is an invoicing app. It has a CLI, a small web server and a JSON data file.

## General

- Follow best practices.
- Write clean code.
- Always write good, readable, maintainable code.
- Be careful when making changes.
- Make sure the code is high quality.
- Think about performance.
- Think about security.
- Keep things simple.
- Don't overcomplicate things.
- IMPORTANT: Always follow best practices!!!

## Code style

- Use modern JavaScript.
- Use ES modules.
- Don't use default exports.
- Use good variable names.
- Format the code nicely.
- Add comments where needed.
- Don't add too many comments.
- Follow the existing style.
- Use semicolons.
- Use single quotes.
- Use 2 spaces for indentation.

## Git

- NEVER push to main. Ever.
- Write good commit messages.
- Commit often.
- Never commit the .env file.

## Testing

- Write tests.
- Make sure tests pass.
- Tests are important.
- Run the tests with `npm test`.
- Don't skip tests.

## API

- Follow best practices for API routes.
- Routes should be RESTful.
- Handle errors properly.
- Return the right status codes.

## Billing

- Money is in pounds (GBP).
- Be careful with rounding.
- Tax is 20%.

## My notes (Sam)

- I'm halfway through refactoring the billing module on my branch, so remember that totals.js is changing.
- I prefer short answers.
- Remind me to update the changelog.

## Commands

- Start the server: `npm start` (http://localhost:4000)
- Run the tests: `npm test`
- Run the CLI: `node bin/ledgerly.js <command>`

## Misc

- The data lives in src/data/invoices.json.
- Don't edit the data file by hand.
- Follow best practices.

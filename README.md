# DevMarket UI Automation Tests

This repository contains Playwright UI automation tests for the sign-in page:

- URL under test: `https://devmarket.realworld.fi/sign-in`
- Test file: `tests/sign-in.spec.js`

## Covered scenarios

1. Sign-in form renders correctly.
2. Empty form submission shows validation feedback.
3. Invalid credentials show an authentication error and remain on sign-in page.

## Run locally

```bash
npm install
npx playwright install chromium
npm run test:ui
```

For interactive debugging:

```bash
npm run test:ui:headed
npm run test:ui:debug
```

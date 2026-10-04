# QA Portfolio

![Tests](https://github.com/Automation-QA-Tester/qa-portfolio/actions/workflows/tests.yml/badge.svg)

A portfolio of quality assurance work: a small practice web application, automated end-to-end tests written in two tools (Playwright and Cypress), a test plan with exploratory testing results, and bug reports.

## What is inside

| Part | Description | Location |
|---|---|---|
| Practice application | Login and todo list in plain HTML, CSS and JavaScript | `app/` |
| Playwright tests | 14 end-to-end tests | `tests/playwright/` |
| Cypress tests | The same 14 scenarios | `cypress/e2e/` |
| Test plan | Scope, approach, test cases, exploratory testing results | [docs/test-plan.md](docs/test-plan.md) |
| Application features | Specification the tests are based on | [docs/app-features.md](docs/app-features.md) |
| Setup guide | How to run everything locally | [docs/setup.md](docs/setup.md) |
| Bug reports | Defects and improvement ideas found during testing | [GitHub Issues](https://github.com/Automation-QA-Tester/qa-portfolio/issues) |
| CI | Both test suites run on every pull request | `.github/workflows/tests.yml` |

## Quick start

```bash
git clone https://github.com/Automation-QA-Tester/qa-portfolio.git
cd qa-portfolio
npm install
npm start
```

Open <http://localhost:3000>. The login page accepts the fake demo account `demo` / `demo-password`.

Run the tests (stop the application first or use another terminal; the test commands start it themselves):

```bash
npm run test:playwright
npm run test:cypress
```

Prerequisites, including the system libraries Cypress needs on Linux and WSL, are described in [docs/setup.md](docs/setup.md).

## How the work is organised

Every change goes through a branch and a pull request. The tests run automatically on each pull request and on each push to `main`.

## Status

Work in progress. Known defects and ideas are tracked in GitHub Issues.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE).

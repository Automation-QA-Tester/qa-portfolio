# Setup Guide

How to run this project locally. Commands are for Linux, macOS or WSL (Ubuntu on Windows).

## Prerequisites

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) LTS (this project was developed with v24)

Check your versions:

```bash
git --version
node --version
npm --version
```

### Windows users (WSL)

WSL can see the Windows installation of Node.js and may use it by mistake. Install Node.js inside WSL, for example with [nvm](https://github.com/nvm-sh/nvm), and verify:

```bash
which node   # expected: /home/<user>/.nvm/versions/node/...
```

If the path starts with `/mnt/c/`, the Windows version is being used.

## Get the code

```bash
git clone https://github.com/Automation-QA-Tester/qa-portfolio.git
cd qa-portfolio
```

## Install and run

Install the dependencies:

```bash
npm install
```

Start the test application:

```bash
npm start
```

Then open <http://localhost:3000> in a browser. Stop the server with `Ctrl + C`.

### Demo credentials

The login page accepts a fake demo account that exists only for practice and protects nothing:

- Username: `demo`
- Password: `demo-password`

## Automated tests

### Playwright

Install the browser used by the tests (one time only):

```bash
npx playwright install --with-deps chromium
```

On Linux and WSL, `--with-deps` also installs system libraries and asks for the `sudo` password.

Run the tests. Playwright starts the application automatically, so no separate server is needed:

```bash
npm run test:playwright
```

Open the HTML report of the last run:

```bash
npx playwright show-report
```

Tests are in `tests/playwright/`. The behaviour they verify is described in [app-features.md](app-features.md).

### Cypress

On Linux and WSL, install the system libraries Cypress needs. For Ubuntu 24.04 or newer:

```bash
sudo apt update
sudo apt install -y libgtk-3-0t64 libgbm-dev libnotify-dev libnss3 libxss1 libasound2t64 libxtst6 xauth xvfb
```

On Ubuntu 22.04 the package names `libgtk-3-0` and `libasound2` have no `t64` suffix. `xvfb` provides a virtual display so Cypress can run without a window.

Install the Cypress binary (needed if `npm install` skipped its install script) and verify it:

```bash
npx cypress install
npx cypress verify
```

Run the tests. The application is started automatically and stopped after the run:

```bash
npm run test:cypress
```

Tests are in `cypress/e2e/`. Cypress currently runs them in Electron and prints a deprecation warning, which is expected.

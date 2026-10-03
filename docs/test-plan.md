# Test Plan

## 1. Introduction

This document describes how the practice application in `app/` is tested. The application is a small single-page web app with a login form and a todo list. Its expected behaviour is specified in [app-features.md](app-features.md).

## 2. Scope

### In scope

- Login: validation, invalid credentials, successful login, logout
- Todo list: adding, validating, completing, deleting tasks, remaining-tasks counter, clearing the list on logout

### Out of scope (for now)

- Cross-browser testing (Playwright runs Chromium, Cypress runs Electron)
- Automated tests for the responsive layout (checked manually from 320 px width, see section 9)
- Accessibility audit
- Performance and security testing
- Persistence: the application keeps no data after a page reload, by design

## 3. Test approach

| Level | Type | Tool |
|---|---|---|
| End-to-end | Automated, regression | Playwright (`tests/playwright/`) |
| End-to-end | Automated, regression | Cypress (`cypress/e2e/`) |
| Exploratory | Manual | Browser, findings reported as GitHub Issues |

The same scenarios are implemented in both tools to compare them and to keep the suite independent of one tool.

Techniques used: equivalence partitioning (valid and invalid credentials), boundary value analysis (task length of 100 and 101 characters), state-based checks (counter, empty state, completed state).

## 4. Test environment

- Application served locally with `http-server` on `http://localhost:3000` (`npm start`)
- Node.js LTS, Ubuntu on WSL
- Test data: the fake demo account `demo` / `demo-password`
- Setup instructions: [setup.md](setup.md)

## 5. Test cases

| ID | Title | Expected result | Playwright | Cypress |
|---|---|---|---|---|
| LOGIN-01 | Login with empty fields | Message `Username and password are required.` | yes | yes |
| LOGIN-02 | Login with invalid credentials | Message `Invalid username or password.` | yes | yes |
| LOGIN-03 | Login with valid credentials | Welcome heading is shown, login form is hidden | yes | yes |
| LOGIN-04 | Logout | Login form is shown again, welcome heading is hidden | yes | yes |
| TODO-01 | Empty state | No items, counter `No tasks yet.` | yes | yes |
| TODO-02 | Add a task | Item is listed, input is cleared, counter `1 task left` | yes | yes |
| TODO-03 | Add an empty task | Message `Task cannot be empty.`, no item added | yes | yes |
| TODO-04 | Add a task with only spaces | Message `Task cannot be empty.`, no item added | yes | yes |
| TODO-05 | Add a task with 100 characters (boundary) | Task is accepted, no error | yes | yes |
| TODO-06 | Add a task with 101 characters (boundary) | Message `Task is too long (max 100 characters).`, no item added | yes | yes |
| TODO-07 | Mark a task as done and unmark it | Strike-through and counter change both ways | yes | yes |
| TODO-08 | Counter with several tasks | Counter `2 tasks left` after two tasks | yes | yes |
| TODO-09 | Delete a task | Only the other task remains, counter is updated | yes | yes |
| TODO-10 | Tasks are cleared after logout and login | List is empty, counter `No tasks yet.` | yes | yes |

## 6. Entry and exit criteria

- Entry: the application starts with `npm start` and the dependencies are installed.
- Exit: all automated tests pass in both tools and no open bug with high severity remains.

## 7. Bug reporting

Defects are reported as GitHub Issues in this repository in English. Each report contains: summary, steps to reproduce, expected result, actual result, environment and severity.

## 8. Risks and limitations

- Tests depend on `data-testid` attributes. If they are removed from the markup, the tests fail.
- Only one browser engine per tool is used, so browser-specific defects can go unnoticed.
- The application stores no data, so persistence-related defects cannot occur and are not tested.

## 9. Exploratory testing

### Session 1 (2026-10-03)

**Charter:** Explore the login and the todo list. Find behaviour that is unexpected, inconsistent or different from [app-features.md](app-features.md).

**Environment:** Desktop browser on Windows, application served locally with `npm start`.

| Area | What was checked | Result |
|---|---|---|
| Login validation | Empty fields, only username, only password, wrong username, wrong password | As expected |
| Login: letter case | `Demo` and `DEMO` as username | Rejected as invalid. Not specified; user names are case-sensitive |
| Keyboard login | Tab and Enter | As expected |
| Task text: special characters | `!@#$%^&*()`, `<b>test</b>`, `&amp;`, `\n` | Shown literally, no HTML is interpreted |
| Task text: spaces | Only spaces, spaces before the text, many spaces between words | Only spaces rejected. Leading and trailing spaces are removed. Inner spaces count towards the 100 character limit and are collapsed on display. See [#12](https://github.com/Automation-QA-Tester/qa-portfolio/issues/12) |
| Duplicate task names | Two tasks with the same text | Both created. Not specified |
| Many tasks | 50 tasks | The page scrolls correctly. The counter is at the bottom of the list. See [#11](https://github.com/Automation-QA-Tester/qa-portfolio/issues/11) |
| Checkbox by keyboard | Space and Enter | Space toggles the checkbox, Enter does not (standard checkbox behaviour) |
| Focus after actions | Check, uncheck and delete with the keyboard | Focus is lost. See [#10](https://github.com/Automation-QA-Tester/qa-portfolio/issues/10) |
| Page width | 320, 360 and 400 px in device emulation | No problems. The heading wraps below about 300 px and the card shrinks below about 470 px, which is expected. Supported width: from 320 px |
| Page reload | F5 after login | Returns to the login form, by design |
| Browser Back button | Back after login | Leaves the application. See [#13](https://github.com/Automation-QA-Tester/qa-portfolio/issues/13) |
| Logout | Double click on Log out | As expected |
| Clean-up | 50 tasks, then logout and login | List is empty, as specified |

## 10. Known issues

Issues are tracked in [GitHub Issues](https://github.com/Automation-QA-Tester/qa-portfolio/issues).

| Issue | Type | Summary | Status |
|---|---|---|---|
| [#10](https://github.com/Automation-QA-Tester/qa-portfolio/issues/10) | bug | Keyboard focus is lost after toggling or deleting a task | Open |
| [#11](https://github.com/Automation-QA-Tester/qa-portfolio/issues/11) | enhancement | Show the remaining tasks counter above the task list | Open |
| [#12](https://github.com/Automation-QA-Tester/qa-portfolio/issues/12) | enhancement | Add a live character counter to the New task field | Open |
| [#13](https://github.com/Automation-QA-Tester/qa-portfolio/issues/13) | enhancement | Browser Back button leaves the application after login | Open |

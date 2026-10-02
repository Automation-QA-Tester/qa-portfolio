# Practice App Features

Description of the behaviour of the practice application in `app/`. It serves as the specification for the automated tests.

## Login

| Scenario | Input | Expected result |
|---|---|---|
| Empty fields | username or password empty | Message: `Username and password are required.` |
| Wrong credentials | any other combination than the demo account | Message: `Invalid username or password.` |
| Valid credentials | `demo` / `demo-password` | Login form is hidden, heading `Welcome, demo!` and the todo list are shown |
| Logout | click **Log out** | Login form is shown again, the todo list is cleared |

Selectors: `username-input`, `password-input`, `login-button`, `login-message`, `welcome-heading`, `logout-button`.

## Todo list

Visible after login. Tasks are kept in memory only, so a page reload or logout clears them.

| Scenario | Expected result |
|---|---|
| Add a task | Task appears in the list, input is cleared, counter is updated |
| Add an empty task (or only spaces) | Message: `Task cannot be empty.` |
| Add a task longer than 100 characters | Message: `Task is too long (max 100 characters).` |
| Mark a task as done | Text is struck through, counter decreases |
| Unmark a done task | Strike-through is removed, counter increases |
| Delete a task | Task is removed from the list |
| No tasks | Counter shows `No tasks yet.` |

Counter text: `1 task left`, `N tasks left` (including `0 tasks left` when all are done).

Selectors: `todo-input`, `todo-add-button`, `todo-error`, `todo-list`, `todo-item`, `todo-checkbox`, `todo-text`, `todo-delete-button`, `todo-counter`.

All selectors are `data-testid` attribute values.

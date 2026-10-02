// Demo credentials for this practice app only. They are fake and protect nothing.
const DEMO_USER = { username: "demo", password: "demo-password" };
const MAX_TASK_LENGTH = 100;

const loginSection = document.getElementById("login-section");
const welcomeSection = document.getElementById("welcome-section");
const welcomeHeading = document.getElementById("welcome-heading");
const loginForm = document.getElementById("login-form");
const loginMessage = document.getElementById("login-message");
const logoutButton = document.getElementById("logout-button");

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoError = document.getElementById("todo-error");
const todoList = document.getElementById("todo-list");
const todoCounter = document.getElementById("todo-counter");

let todos = [];
let nextTodoId = 1;

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  if (username === "" || password === "") {
    loginMessage.textContent = "Username and password are required.";
    return;
  }

  if (username !== DEMO_USER.username || password !== DEMO_USER.password) {
    loginMessage.textContent = "Invalid username or password.";
    return;
  }

  loginMessage.textContent = "";
  welcomeHeading.textContent = "Welcome, " + username + "!";
  loginSection.hidden = true;
  welcomeSection.hidden = false;
  renderTodos();
});

logoutButton.addEventListener("click", function () {
  loginForm.reset();
  loginMessage.textContent = "";
  todos = [];
  todoError.textContent = "";
  todoInput.value = "";
  welcomeSection.hidden = true;
  loginSection.hidden = false;
});

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = todoInput.value.trim();

  if (text === "") {
    todoError.textContent = "Task cannot be empty.";
    return;
  }

  if (text.length > MAX_TASK_LENGTH) {
    todoError.textContent = "Task is too long (max " + MAX_TASK_LENGTH + " characters).";
    return;
  }

  todoError.textContent = "";
  todos.push({ id: nextTodoId++, text: text, done: false });
  todoInput.value = "";
  renderTodos();
});

function renderTodos() {
  todoList.textContent = "";

  todos.forEach(function (todo) {
    const item = document.createElement("li");
    item.setAttribute("data-testid", "todo-item");
    if (todo.done) {
      item.classList.add("completed");
    }

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.setAttribute("aria-label", "Mark task as done: " + todo.text);
    checkbox.setAttribute("data-testid", "todo-checkbox");
    checkbox.addEventListener("change", function () {
      todo.done = checkbox.checked;
      renderTodos();
    });

    const label = document.createElement("span");
    label.textContent = todo.text;
    label.setAttribute("data-testid", "todo-text");

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.setAttribute("aria-label", "Delete task: " + todo.text);
    deleteButton.setAttribute("data-testid", "todo-delete-button");
    deleteButton.addEventListener("click", function () {
      todos = todos.filter(function (t) {
        return t.id !== todo.id;
      });
      renderTodos();
    });

    item.append(checkbox, label, deleteButton);
    todoList.appendChild(item);
  });

  const remaining = todos.filter(function (t) {
    return !t.done;
  }).length;

  if (todos.length === 0) {
    todoCounter.textContent = "No tasks yet.";
  } else {
    todoCounter.textContent = remaining + (remaining === 1 ? " task left" : " tasks left");
  }
}

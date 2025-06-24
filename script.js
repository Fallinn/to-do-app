const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const sparkleContainer = document.getElementById("sparkle-container");
const progressBar = document.getElementById("progress-bar");
const taskStats = document.getElementById("task-stats");
const themeSwitch = document.getElementById("theme-switch");
const prioritySelect = document.getElementById("priority");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function createSparkles(x, y) {
  for (let i = 0; i < 15; i++) {
    const sparkle = document.createElement("div");
    sparkle.classList.add("sparkle");
    sparkle.style.left = `${x + Math.random() * 100 - 50}px`;
    sparkle.style.top = `${y + Math.random() * 40 - 20}px`;
    sparkle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
    sparkleContainer.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const percent = total === 0 ? 0 : (completed / total) * 100;
  progressBar.value = percent;
  taskStats.textContent = `${completed} of ${total} tasks completed`;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.style.background = `hsl(${(index * 40) % 360}, 40%, 30%)`;

    const checkboxBox = document.createElement("div");
    checkboxBox.className = "checkbox-box";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => {
      task.completed = checkbox.checked;
      saveTasks();
      renderTasks();
      if (checkbox.checked) {
        const rect = li.getBoundingClientRect();
        createSparkles(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2 + window.scrollY
        );
      }
    });

    checkboxBox.appendChild(checkbox);

    const span = document.createElement("span");
    span.textContent = `${task.priority} ${task.text}`;

    const delBtn = document.createElement("button");
    delBtn.className = "delete-btn";
    delBtn.textContent = "🗑️";
    delBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(checkboxBox);
    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
  updateProgress();
}

function addTask() {
  const text = taskInput.value.trim();
  const priority = prioritySelect.value;
  if (!text) return;

  tasks.push({ text, completed: false, priority });
  saveTasks();
  renderTasks();
  taskInput.value = "";
}

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("light", themeSwitch.checked);
  localStorage.setItem("theme", themeSwitch.checked ? "light" : "dark");
});

if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
  themeSwitch.checked = true;
}

renderTasks();

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  // Separate completed and incomplete tasks
  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  // Render incomplete tasks
  incompleteTasks.forEach(task => renderTask(taskList, task));

  // Render completed tasks at the bottom
  completedTasks.forEach(task => renderTask(taskList, task));

  saveTasksToLocalStorage();
}

function renderTask(taskList, task) {
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.addEventListener("change", () => toggleTaskStatus(task.id));

  const span = document.createElement("span");
  span.textContent = task.name;
  if (task.completed) {
    span.classList.add("completed");
  }

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => removeTask(task.id));

  taskElement.appendChild(checkbox);
  taskElement.appendChild(span);
  taskElement.appendChild(deleteButton);

  taskList.appendChild(taskElement);
}

document.getElementById("add-button").addEventListener("click", addTask);

function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskName = taskInput.value.trim();

  if (taskName !== "") {
    let newTask = {
      id: tasks.length + 1,
      name: taskName,
      createdDate: new Date().toLocaleString(),
      completed: false,
    };

    tasks.push(newTask);
    renderTasks();
    taskInput.value = "";
  }
}

function toggleTaskStatus(id) {
  let taskIndex = tasks.findIndex(task => task.id === id);
  tasks[taskIndex].completed = !tasks[taskIndex].completed;
  renderTasks();
}

function removeTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function saveTasksToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Initial render of tasks
renderTasks();


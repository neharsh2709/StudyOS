/* ==========================================
   StudyOS - Smart Tasks
   Designed & Developed by Neharsh Shende
========================================== */

let tasks = JSON.parse(localStorage.getItem("studyos_tasks")) || [];
let editIndex = -1;

// Elements
const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");

const addTaskBtn = document.getElementById("addTaskBtn");
const updateTaskBtn = document.getElementById("updateTaskBtn");

const taskList = document.getElementById("taskList");
const searchTask = document.getElementById("searchTask");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

// Save Tasks
function saveTasks() {
    localStorage.setItem("studyos_tasks", JSON.stringify(tasks));
}

// Update Dashboard Stats
function updateStats() {
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = tasks.filter(task => task.completed).length;
    pendingTasks.textContent = tasks.filter(task => !task.completed).length;
}

// Render Tasks
function renderTasks(filter = "") {

    taskList.innerHTML = "";

    tasks
        .filter(task => task.title.toLowerCase().includes(filter.toLowerCase()))
        .forEach((task, index) => {

            const li = document.createElement("li");

            li.className = task.completed ? "task completed" : "task";

            li.innerHTML = `
                <div class="task-info">

                    <div class="task-title">${task.title}</div>

                    <div class="task-date">
                        📅 ${task.date || "No Due Date"}
                    </div>

                </div>

                <div class="task-actions">

                    <span class="priority ${task.priority.toLowerCase()}">
                        ${task.priority}
                    </span>

                    <button class="complete-btn" onclick="editTask(${index})">
                        ✏️
                    </button>

                    <button class="complete-btn" onclick="toggleTask(${index})">
                        ✔
                    </button>

                    <button class="delete-btn" onclick="deleteTask(${index})">
                        🗑
                    </button>

                </div>
            `;

            taskList.appendChild(li);

        });

    updateStats();
}

// Add or Update Task
function addTask() {

    const title = taskInput.value.trim();

    if (title === "") {
        alert("Please enter a task.");
        return;
    }

    if (editIndex === -1) {

        tasks.push({
            title: title,
            priority: priority.value,
            date: dueDate.value,
            completed: false
        });

    } else {

        tasks[editIndex].title = title;
        tasks[editIndex].priority = priority.value;
        tasks[editIndex].date = dueDate.value;

        editIndex = -1;

        addTaskBtn.style.display = "inline-block";
        updateTaskBtn.style.display = "none";

    }

    saveTasks();
    renderTasks(searchTask.value);

    taskInput.value = "";
    dueDate.value = "";
    priority.value = "Medium";
}

// Edit Task
function editTask(index) {

    editIndex = index;

    taskInput.value = tasks[index].title;
    priority.value = tasks[index].priority;
    dueDate.value = tasks[index].date;

    addTaskBtn.style.display = "none";
    updateTaskBtn.style.display = "inline-block";
}

// Complete Task
function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    renderTasks(searchTask.value);
}

// Delete Task
function deleteTask(index) {

    if (confirm("Delete this task?")) {

        tasks.splice(index, 1);

        saveTasks();
        renderTasks(searchTask.value);

    }
}

// Events
addTaskBtn.addEventListener("click", addTask);
updateTaskBtn.addEventListener("click", addTask);

searchTask.addEventListener("input", function () {
    renderTasks(this.value);
});

// First Load
renderTasks();
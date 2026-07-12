/* ==========================================
   StudyOS v2
   Designed & Developed by Neharsh Shende
========================================== */

let tasks = JSON.parse(localStorage.getItem("studyos_tasks")) || [];

let editIndex = -1;

// Elements

const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");

const category = document.getElementById("category");

const addTaskBtn = document.getElementById("addTaskBtn");
const updateTaskBtn = document.getElementById("updateTaskBtn");

const taskList = document.getElementById("taskList");
const searchTask = document.getElementById("searchTask");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

/* ===========================
   Save
=========================== */

function saveTasks(){

    localStorage.setItem(
        "studyos_tasks",
        JSON.stringify(tasks)
    );

}

/* ===========================
   Statistics
=========================== */

function updateStats(){

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const pending = total - completed;

    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;

    let percent = 0;

    if(total>0){

        percent = Math.round(
            (completed/total)*100
        );

    }

    progressBar.style.width = percent+"%";

    progressText.textContent =
        percent+"% Completed";

}

/* ===========================
   Add / Update Task
=========================== */

function addTask(){

    const title = taskInput.value.trim();

    if(title===""){

        alert("Please enter task");

        return;

    }

    if(editIndex===-1){

        tasks.push({

            title:title,

            priority:priority.value,

            category:category.value,

            date:dueDate.value,

            completed:false,

            pinned:false,

            favorite:false

        });

    }

    else{

        tasks[editIndex].title=title;

        tasks[editIndex].priority=priority.value;

        tasks[editIndex].category=category.value;

        tasks[editIndex].date=dueDate.value;

        editIndex=-1;

        addTaskBtn.style.display="inline-block";

        updateTaskBtn.style.display="none";

    }

    clearInputs();

    saveTasks();

    renderTasks();

}
/* ===========================
   Edit Task
=========================== */

function editTask(index){

    editIndex = index;

    taskInput.value = tasks[index].title;

    priority.value = tasks[index].priority;

    category.value = tasks[index].category;

    dueDate.value = tasks[index].date;

    addTaskBtn.style.display = "none";

    updateTaskBtn.style.display = "inline-block";

}

/* ===========================
   Complete Task
=========================== */

function toggleTask(index){

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    renderTasks(searchTask.value);

}

/* ===========================
   Delete Task
=========================== */

function deleteTask(index){

    if(confirm("Delete this task?")){

        tasks.splice(index,1);

        saveTasks();

        renderTasks(searchTask.value);

    }

}

/* ===========================
   Pin Task
=========================== */

function pinTask(index){

    tasks[index].pinned = !tasks[index].pinned;

    saveTasks();

    renderTasks(searchTask.value);

}

/* ===========================
   Favorite Task
=========================== */

function favoriteTask(index){

    tasks[index].favorite = !tasks[index].favorite;

    saveTasks();

    renderTasks(searchTask.value);

}

/* ===========================
   Clear Inputs
=========================== */

function clearInputs(){

    taskInput.value = "";

    priority.value = "Medium";

    category.value = "Study";

    dueDate.value = "";

}

/* ===========================
   Sort Tasks
=========================== */

function sortTasks(){

    tasks.sort((a,b)=>{

        if(a.pinned !== b.pinned){

            return b.pinned - a.pinned;

        }

        if(a.favorite !== b.favorite){

            return b.favorite - a.favorite;

        }

        return 0;

    });

}
/* ===========================
   Render Tasks
=========================== */

function renderTasks(filter = ""){

    sortTasks();

    taskList.innerHTML = "";

    tasks
    .filter(task =>
        task.title.toLowerCase().includes(filter.toLowerCase())
    )
    .forEach((task,index)=>{

        const li = document.createElement("li");

        li.className = task.completed ? "task completed" : "task";

        li.innerHTML = `

        <div class="task-info">

            <div class="task-title">

                ${task.completed ? "✅" : ""}

                ${task.title}

            </div>

            <div class="task-date">

                📅 ${task.date || "No Due Date"}

            </div>

            <div class="task-category">

                📂 ${task.category}

            </div>

        </div>

        <div class="task-actions">

            <span class="priority ${task.priority.toLowerCase()}">

                ${task.priority}

            </span>

            <button class="pin-btn"

                onclick="pinTask(${index})">

                ${task.pinned ? "📌" : "📍"}

            </button>

            <button class="favorite-btn"

                onclick="favoriteTask(${index})">

                ${task.favorite ? "⭐" : "☆"}

            </button>

            <button class="edit-btn"

                onclick="editTask(${index})">

                ✏️

            </button>

            <button class="complete-btn"

                onclick="toggleTask(${index})">

                ✔

            </button>

            <button class="delete-btn"

                onclick="deleteTask(${index})">

                🗑

            </button>

        </div>

        `;

        taskList.appendChild(li);

    });

    updateStats();

}
/* ==========================================
   Event Listeners
========================================== */

addTaskBtn.addEventListener("click", addTask);

updateTaskBtn.addEventListener("click", addTask);

searchTask.addEventListener("input", function(){

    renderTasks(this.value);

});

/* ==========================================
   Enter Key Support
========================================== */

taskInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        addTask();

    }

});

/* ==========================================
   Auto Save
========================================== */

window.addEventListener("beforeunload", function(){

    saveTasks();

});

/* ==========================================
   Initial Load
========================================== */

renderTasks();

/* ==========================================
   Console Message
========================================== */

console.log("====================================");
console.log("StudyOS v2 Loaded Successfully");
console.log("Designed & Developed by");
console.log("Neharsh Shende");
console.log("====================================");

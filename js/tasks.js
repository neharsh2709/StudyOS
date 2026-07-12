/* ==========================================
   StudyOS - Smart Tasks
   Designed & Developed by Neharsh Shende
========================================== */

let tasks = JSON.parse(localStorage.getItem("studyos_tasks")) || [];
let editIndex = -1;
const taskInput = document.getElementById("taskInput");
const priority = document.getElementById("priority");
const dueDate = document.getElementById("dueDate");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const searchTask = document.getElementById("searchTask");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

function saveTasks(){
    localStorage.setItem("studyos_tasks", JSON.stringify(tasks));
}

function updateStats(){
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = tasks.filter(t=>t.completed).length;
    pendingTasks.textContent = tasks.filter(t=>!t.completed).length;
}

function renderTasks(filter=""){

    taskList.innerHTML="";

    tasks
    .filter(task=>task.title.toLowerCase().includes(filter.toLowerCase()))
    .forEach((task,index)=>{

        const li=document.createElement("li");

        li.className=task.completed?"task completed":"task";

        li.innerHTML=`
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

function addTask(){

    const title=taskInput.value.trim();

    if(title===""){
        alert("Enter a task.");
        return;
    }

    tasks.push({

        title:title,

        priority:priority.value,

        date:dueDate.value,

        completed:false

    });

    saveTasks();

    renderTasks();

    taskInput.value="";
    dueDate.value="";
    priority.value="Medium";

}

function toggleTask(index){

    tasks[index].completed=!tasks[index].completed;

    saveTasks();

    renderTasks(searchTask.value);

}

function deleteTask(index){

    if(confirm("Delete this task?")){

        tasks.splice(index,1);

        saveTasks();

        renderTasks(searchTask.value);

    }

}

addTaskBtn.addEventListener("click",addTask);

searchTask.addEventListener("input",function(){

    renderTasks(this.value);

});

renderTasks(); 
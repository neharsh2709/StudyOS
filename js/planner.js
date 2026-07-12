/* ==========================================
   StudyOS Planner v1
   Designed & Developed by Neharsh Shende
========================================== */


let sessions = JSON.parse(localStorage.getItem("studyos_sessions")) || [];

let editSessionIndex = -1;


// ================= Elements =================


const sessionTitle = document.getElementById("sessionTitle");

const subject = document.getElementById("subject");

const sessionPriority = document.getElementById("sessionPriority");

const sessionDate = document.getElementById("sessionDate");

const startTime = document.getElementById("startTime");

const endTime = document.getElementById("endTime");


const addSessionBtn = document.getElementById("addSessionBtn");

const updateSessionBtn = document.getElementById("updateSessionBtn");


const sessionList = document.getElementById("sessionList");

const searchSession = document.getElementById("searchSession");


// Statistics

const totalSessions = document.getElementById("totalSessions");

const completedSessions = document.getElementById("completedSessions");

const pendingSessions = document.getElementById("pendingSessions");


// Progress

const progressBar = document.getElementById("progressBar");

const progressText = document.getElementById("progressText");



// ================= Save =================


function saveSessions(){

    localStorage.setItem(
        "studyos_sessions",
        JSON.stringify(sessions)
    );

}



// ================= Statistics =================


function updateStats(){

    let total = sessions.length;

    let completed = sessions.filter(
        session => session.completed
    ).length;


    let pending = total - completed;


    totalSessions.textContent = total;

    completedSessions.textContent = completed;

    pendingSessions.textContent = pending;



    let percentage = 0;


    if(total > 0){

        percentage = Math.round(
            (completed / total) * 100
        );

    }


    progressBar.style.width = percentage + "%";

    progressText.textContent =
        percentage + "% Completed";

}



// ================= Add Session =================


function addSession(){


    let title = sessionTitle.value.trim();



    if(title === ""){

        alert("Enter study topic");

        return;

    }



    if(editSessionIndex === -1){


        sessions.push({

            title:title,

            subject:subject.value,

            priority:sessionPriority.value,

            date:sessionDate.value,

            start:startTime.value,

            end:endTime.value,

            completed:false


        });


    }

    else{


        sessions[editSessionIndex].title = title;

        sessions[editSessionIndex].subject = subject.value;

        sessions[editSessionIndex].priority = sessionPriority.value;

        sessions[editSessionIndex].date = sessionDate.value;

        sessions[editSessionIndex].start = startTime.value;

        sessions[editSessionIndex].end = endTime.value;



        editSessionIndex = -1;


        addSessionBtn.style.display = "inline-block";

        updateSessionBtn.style.display = "none";


    }



    clearSessionInputs();


    saveSessions();


    renderSessions();


}
/* ===========================
   Edit Session
=========================== */

function editSession(index){

    editSessionIndex = index;


    sessionTitle.value = sessions[index].title;

    subject.value = sessions[index].subject;

    sessionPriority.value = sessions[index].priority;

    sessionDate.value = sessions[index].date;

    startTime.value = sessions[index].start;

    endTime.value = sessions[index].end;



    addSessionBtn.style.display = "none";

    updateSessionBtn.style.display = "inline-block";

}



/* ===========================
   Complete Session
=========================== */

function completeSession(index){

    sessions[index].completed =
    !sessions[index].completed;


    saveSessions();

    renderSessions();

}



/* ===========================
   Delete Session
=========================== */

function deleteSession(index){


    if(confirm("Delete this study session?")){


        sessions.splice(index,1);


        saveSessions();


        renderSessions();


    }

}



/* ===========================
   Clear Inputs
=========================== */

function clearSessionInputs(){


    sessionTitle.value = "";


    subject.value = "Mathematics";


    sessionPriority.value = "Medium";


    sessionDate.value = "";


    startTime.value = "";


    endTime.value = "";


}



/* ===========================
   Sort Sessions
=========================== */

function sortSessions(){


    sessions.sort((a,b)=>{


        if(a.completed !== b.completed){

            return a.completed - b.completed;

        }


        return a.start.localeCompare(b.start);


    });


}
/* ===========================
   Render Sessions
=========================== */

function renderSessions(filter = ""){

    sortSessions();


    sessionList.innerHTML = "";


    sessions
    .filter(session =>

        session.title
        .toLowerCase()
        .includes(filter.toLowerCase())

    )
    .forEach((session,index)=>{


        const li = document.createElement("li");


        li.className =
        session.completed
        ? "session-card completed"
        : "session-card";



        li.innerHTML = `


        <div class="session-info">


            <div class="session-title">

                ${session.completed ? "✅" : "📚"}

                ${session.title}

            </div>



            <div class="session-details">


                <span>
                📖 ${session.subject}
                </span>


                <span>
                📅 ${session.date || "No Date"}
                </span>


                <span>
                ⏰ ${session.start || "--"}
                -
                ${session.end || "--"}
                </span>


            </div>



            <div class="subject-tag">

                ${session.subject}

            </div>


        </div>




        <div class="session-actions">



            <span class="session-priority ${session.priority.toLowerCase()}">

                ${session.priority}

            </span>



            <button class="edit-session"
            onclick="editSession(${index})">

                ✏️

            </button>



            <button class="complete-session"
            onclick="completeSession(${index})">

                ✔

            </button>



            <button class="delete-session"
            onclick="deleteSession(${index})">

                🗑

            </button>



        </div>


        `;



        sessionList.appendChild(li);


    });



    updateStats();


}



/* ===========================
   Search
=========================== */


searchSession.addEventListener(
"input",
function(){


    renderSessions(this.value);


});
/* ===========================
   Button Events
=========================== */


addSessionBtn.addEventListener(
"click",
addSession
);


updateSessionBtn.addEventListener(
"click",
addSession
);



/* ===========================
   Enter Key Support
=========================== */


sessionTitle.addEventListener(
"keypress",
function(e){


    if(e.key === "Enter"){

        addSession();

    }


});



/* ===========================
   Auto Save
=========================== */


window.addEventListener(
"beforeunload",
function(){


    saveSessions();


});



/* ===========================
   Initial Load
=========================== */


renderSessions();



/* ===========================
   Console
=========================== */


console.log(
"===================================="
);

console.log(
"StudyOS Planner Loaded Successfully"
);

console.log(
"Designed & Developed by Neharsh Shende"
);

console.log(
"===================================="
);

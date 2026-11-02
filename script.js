// NOTES
const noteInput = document.getElementById("noteInput");

if (noteInput) {
    noteInput.value = localStorage.getItem("novaNote") || "";

    noteInput.addEventListener("input", () => {
        localStorage.setItem("novaNote", noteInput.value);
    });
}

// TASKS
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

function saveTasks() {
    const tasks = [];

    taskList.querySelectorAll("li").forEach((task) => {
        tasks.push({
            text: task.textContent,
            completed: task.classList.contains("completed")
        });
    });

    localStorage.setItem("novaTasks", JSON.stringify(tasks));
}

function addTask(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    taskList.appendChild(li);
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("novaTasks")) || [];

    savedTasks.forEach((task) => {
        addTask(task.text);

        if (task.completed) {
            taskList.lastElementChild.classList.add("completed");
        }
    });
}

if (taskInput && addTaskButton && taskList) {
    loadTasks();

    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();

        if (taskText === "") return;

        addTask(taskText);
        saveTasks();
        taskInput.value = "";
    });
}
const liveClock = document.getElementById("liveClock");
async function updateClock() {
    const response = await fetch("http://localhost:3000/about");
    const data = await response.json();

    liveClock.textContent = new Date(data.timestamp).toLocaleString();
}
updateClock();
setInterval(updateClock, 1000);
document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "m") {
        document.getElementById("secretTerminal").style.display = "block";
    }
});

function closeSecret() {
    document.getElementById("secretTerminal").style.display = "none";
}
let secretCode = "";

document.addEventListener("keydown", (event) => {
    secretCode += event.key.toLowerCase();

    if (secretCode.length > 4) {
        secretCode = secretCode.slice(-4);
    }

    if (secretCode === "nova") {
        document.body.style.transition = "0.3s";
        document.body.style.filter = "invert(1) hue-rotate(180deg)";

        setTimeout(() => {
            document.body.style.filter = "none";
            alert("☠ DARK NOVA FOUND YOU ☠\nYou discovered the secret.");
        }, 1000);

        secretCode = "";
    }
});
let hackCode = "";

document.addEventListener("keydown", (event) => {
    hackCode += event.key.toLowerCase();
    hackCode = hackCode.slice(-4);

    if (hackCode === "hack") {
        document.body.innerHTML = `
            <div style="
                background:black;
                color:#ff0033;
                min-height:100vh;
                text-align:center;
                padding-top:20vh;
                font-family:monospace;
            ">
                <h1>⚠ SYSTEM BREACHED ⚠</h1>
                <h2>ACCESSING DARK NOVA FILES...</h2>
                <p>Decrypting secrets...</p>
                <p>ERROR 404: BRAIN NOT FOUND 💀</p>
                <button onclick="location.reload()">RESTORE SYSTEM</button>
            </div>
        `;
    }
});
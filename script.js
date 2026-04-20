let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let xp = localStorage.getItem("xp") || 0;

const taskList = document.getElementById("taskList");
const xpDisplay = document.getElementById("xp");

xpDisplay.textContent = xp;

function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("xp", xp);
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.onclick = () => toggleTask(index);

        let delBtn = document.createElement("span");
        delBtn.textContent = "❌";
        delBtn.className = "delete";
        delBtn.onclick = (e) => {
            e.stopPropagation();
            deleteTask(index);
        };

        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (text === "") return;

    tasks.push({ text, completed: false });
    input.value = "";

    saveData();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;

    if (tasks[index].completed) {
        xp = Number(xp) + 10; // gain XP
    } else {
        xp = Math.max(0, xp - 10);
    }

    xpDisplay.textContent = xp;

    saveData();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveData();
    renderTasks();
}

// Initial render
renderTasks();
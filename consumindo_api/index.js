const url = "https://run-production-d546.up.railway.app/"

loadTasks = async () => {
    const response = await fetch(`${url}tasks`, {
        method: "GET"
    }
    );
    const { tasks } = await response.json();
    const taskslist = document.getElementById("tasks");
    taskslist.innerText = "";

    const noTasksElement = taskslist.querySelector("#no-tasks");
    if (tasks.length > 0) {
        if (noTasksElement) {
            noTasksElement.innerHTML = "";
        }
    } else {
        taskslist.innerHTML = "<p id='no-tasks'>No tasks to show</p>";
    }


    tasks.forEach(task => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("task");
        taskElement.setAttribute("id", task.id);
        taskElement.innerHTML = `
            <div class="title-container">
                <label for="task-title">Title: </label>
                <h3 id="task-title">${task.title}</h3>
            </div>

            <div class="description-container">
                <label for="task-description">Description: </label>
                <p id="task-description">${task.description}</p>
            </div>
            <p id="task-error-message"></p>
            <button id="delete-button">Delete</button>
        `;
        taskElement.querySelector("#delete-button").addEventListener("click", () => {
            deleteTask(task.id);
        });
        taskslist.appendChild(taskElement);
    });

}

addTask = async () => {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    const response = await fetch(`${url}tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(
            {
                "title": title,
                "description": description
            }
        )
    });

    if (response.status === 201) {
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        loadTasks();
    } else {
        const errorMessage = document.getElementById("error-message");
        errorMessage.innerText = "Erro ao adicionar tarefa";
    }

}

deleteTask = async (id) => {
    const response = await fetch(`${url}tasks/${id}`, {
        method: "DELETE"
    });

    if (response.status === 204) {
        const taskElement = document.getElementById(id);
        taskElement.remove();
    } else {
        const errorMessage = document.getElementById("task-error-message");
        errorMessage.innerText = "Erro ao deletar tarefa";
    }
}

window.onload = async () => {
    await loadTasks();
    console.debug();
    const addTaskButton = document.getElementById("add-task-button");
    addTaskButton.addEventListener("click", addTask);
}
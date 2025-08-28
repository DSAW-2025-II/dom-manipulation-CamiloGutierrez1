// Variable to tasks array
let tasks = [];
let taskIdCounter = 0;

// Dom Interaction Elements - CORREGIDO: usar las clases correctas
const taskInput = document.querySelector(".task-input");
const addButton = document.querySelector(".add-task-button");
const tasksList = document.getElementById("tasksList");

//Function to add a new task, obtain the value from input and check if it's not empty.
function addTask(){
    const task = taskInput.value.trim();
    if (task === ''){
        alert("Please enter a valid task.");
        return;
    }
        
    // Create a task object and push it into the tasks array
    const newTask = {id: taskIdCounter++, description: task, completed: false}; //Atributes of the task object
        
    //Methods to add, clean input and show the updated list
    tasks.push(newTask);
    taskInput.value = "";
    displayTasks(); // CORREGIDO: usar displayTasks() no renderTasks()
}

// Function to delete a task 
function deleteTask(taskId){
    const task = tasks.find(task => task.id === taskId);
    if(confirm("Are you sure you want to delete this task?")){ // Confirmation message before deleting a task
        tasks = tasks.filter(task => task.id !== taskId);
        displayTasks();
    }
}

// Function to check & uncheck the completed status of a task
function toggleTask(taskId){
    const task = tasks.find(task => task.id === taskId);
    if (task){
        task.completed = !task.completed;
        displayTasks(); // CORREGIDO: usar displayTasks() no renderTasks()
    }
}

// Function to show the tasks 
function displayTasks(){
    tasksList.innerHTML = ""; // Clear the current list 

    if (tasks.length === 0){
        tasksList.innerHTML = `<li class="no-tasks-message">
                <p>📝 You have no pending tasks.<br>
                   Add a new task to get started!
                </p>
            </li>`;
        return;
    }
    // Show each task in the list
    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.className = "task-item";
        if (task.completed){
            taskItem.classList.add("completed");
        }
        taskItem.innerHTML = `
            <input type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                   onchange="toggleTask(${task.id})">
                        
            <span class="task-text">${task.description}</span>
                        
            <button class="delete-btn" 
                     onclick="deleteTask(${task.id})"
                    title="Eliminar tarea">
                ×
            </button>
        `;
        tasksList.appendChild(taskItem);
    });
            
}

// Event Listeners, When clicking the button "Add task" 
addButton.addEventListener("click", addTask);

//Event listener when pressing the "Enter" key - CORREGIDO: eliminar duplicado
taskInput.addEventListener("keypress", function(event){
    if (event.key === "Enter"){
        addTask();
    }
});

// Initial the App 
document.addEventListener("DOMContentLoaded", function(){
    displayTasks();
});
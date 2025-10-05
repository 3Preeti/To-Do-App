const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

document.addEventListener('DOMContentLoaded', displayTasks);

//Read Operations
function getTasksFromStorage() {
    let tasks;
    if(localStorage.getItem('tasks') === null) {
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

function displayTasks() {
    const tasks = getTasksFromStorage();
    taskList.innerHTML = '';

    tasks.forEach(function(task) {
        const li  = document.createElement('li');
        li.className = 'list-group-item';
        const taskText  = document.createElement('span');
        taskText.className = 'task-text';

        taskText.appendChild(document.createTextNode(task.text));

        if(task.completed){
            taskText.classList.add('completed');
        }
        li.appendChild(taskText);

        const actions = document.createElement('div');
        actions.className = 'task-actions';

        //Edit Button
        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.innerHTML = '<i class="bi bi-pencil-square"></i>';

        //Delete Button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '<i class="bi bi-trash-fill"></i>';

        //complete Button
        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.innerHTML = '<i class="bi bi-check-circle-fill"></i>';

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        actions.appendChild(completeBtn);
        li.appendChild(actions);
        taskList.appendChild(li);
    });
}
//Creating Task
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();//stop the form from submitting and reloading the page

    if(taskInput.value.trim() === '') {
        return;
    }

    const task = {
        text: taskInput.value,
        completed: false
    };
    
    const tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    displayTasks();
});

    taskList.addEventListener('click', function(e) {
        const li = e.target.closest('li');
        if(!li) return;

        const tasks = getTasksFromStorage();
        const taskTextContent = li.querySelector('.task-text').textContent;
        const taskIndex = tasks.findIndex(task => task.text === taskTextContent);

        //Delete logic
        if(e.target.closest('.delete-btn')) {   
            tasks.splice(taskIndex, 1);
        }

        //update logic
        if(e.target.closest('.edit-btn')) {
            const currentText = tasks[taskIndex].text;
            const newText = prompt('Edit Task:', currentText);
            if(newText !== null && newText.trim() !== '') {
                tasks[taskIndex].text = newText.trim();
            }

        }

        //update (toggle completion) logic
    if(e.target.closest('.complete-btn') || e.target.closest('.task-text')){
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
});
 

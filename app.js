const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners

loadEventListeners();

function loadEventListeners() {
document.addEventListener('DOMContentLoaded', getTasks);
form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTasks);
filter.addEventListener('keyup', filterTasks);
}
//Get tasks from local localStorage
function getTasks(){
      let tasks;
      if(localStorage.getItem('tasks') === null) {
        tasks = [];
      } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
      }
      tasks.forEach(function(task){
        //need to create new tasks as initial code
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(tasks));
        //create delete link
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        //insert above into ul
        taskList.appendChild(li);
});
}

//add new tasks
function addTask(e) {
              if(taskInput.value === ''){
                alert('Add a task');
              }
        //li tasks text
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(taskInput.value));
        //create delete link
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        //insert above into ul
        taskList.appendChild(li);
        //local storage of above task addition
        storeTaskInLocalStorage(taskInput.value);

        //clear input
        taskInput.value = '';

          e.preventDefault();
}

//Store Task function
function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('taks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
          if(confirm('Are You Sure?')){
              //remove from DOM
              e.target.parentElement.parentElement.remove();
              //remove from LS
              removeTaskFromLocalStorage(e.target.parentElement.parentElement);
          }
    }
}

function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }

  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//function to clear all using button
function clearTasks() {
while(taskList.firstChild){
  taskList.removeChild(taskList.firstChild);
}
clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  localStorage.clear();
}
//Filter Tasks**********************

function filterTasks(e) {

        const text = e.target.value.toLowerCase();

        document.querySelectorAll('.collection-item').forEach(function(task){
          const item = task.firstChild.textContent;
          if(item.toLowerCase().indexOf(text) != -1){
          task.style.display = 'block';
          } else {
          task.style.display = 'none';
          }
        });
}

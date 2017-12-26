const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collections');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners

loadEventListeners();

function loadEventListeners() {
form.addEventListener('submit', addTask);
}

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
//clear input
taskInput.value = '';

  e.preventDefault();
}

const projectNameInput = document.querySelector('.project')
const taskInput = document.querySelector('.task')
const addTask = document.querySelector('.addtaskbtn')
const taskList = document.querySelector('.taskList')
const clear = document.querySelector('.clear')
// project name
const projectname = localStorage.getItem('projectname') || '';
projectNameInput.value = projectname;
projectNameInput.addEventListener('change' , () => {
localStorage.setItem('projectname', projectNameInput.value)
})


// tasks
tasks = JSON.parse(localStorage.getItem('tasks')) || [];
addToDOM()
// function to add task in local storage
function addTolocalStorage (){
  let todo = {
    content : taskInput.value,
    id : new Date().getTime()
  }
 tasks.push(todo)
 localStorage.setItem('tasks', JSON.stringify(tasks))
 
}


// function to put things on DOM
function addToDOM(){
  taskList.innerHTML = ''
  tasks.forEach(task => {

      // creating elements
  const taskDisplay = document.createElement('div')
  taskDisplay.id = task.id
  const labelandcheck = document.createElement('div')
  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  const label = document.createElement('p')
  const delbutton = document.createElement('button')
  delbutton.innerText = 'Delete'
  delbutton.id = task.id
  delbutton.onclick = () => {
    for(let i = 0; i < tasks.length; i++){
      if(delbutton.id == tasks[i].id){
        tasks.splice(i, 1)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        addToDOM()
      }
    }
  }

 // giving classes
 label.classList.add('label')
  taskDisplay.classList.add('tasks')
  labelandcheck.classList.add('taskandcheckbox')
  delbutton.classList.add('delete')
  
 // putting todos in place 
 label.innerText = task.content


 
 // putting in DOM
 labelandcheck.appendChild(checkbox)
 labelandcheck.appendChild(label)
 taskDisplay.appendChild(labelandcheck)
 taskDisplay.appendChild(delbutton)
 taskList.appendChild(taskDisplay)
  });

  
 
}
// on click event listener
addTask.onclick = () => {
  if(taskInput.value !== ''){
    addTolocalStorage()
    addToDOM()
    taskInput.value = ''
  }else{
    alert('Put a task first dumbass!!')
  }
 
}
clear.onclick = () => {
  localStorage.removeItem('projectname')
  localStorage.removeItem('tasks')
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  taskList.innerHTML = ''
  projectNameInput.value = ''
}



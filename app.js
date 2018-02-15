// define UI vars
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-task')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

// load all event listener call
loadEventListeners()

// load all event listener function
function loadEventListeners() {

    // add task event
    form.addEventListener('submit', addTask)

    // remove task event
    taskList.addEventListener('click', removeTask)

    // clear task event
    clearBtn.addEventListener('click', clearTasks)

    // filter tasks event
    filter.addEventListener('keyup', filterTasks)

    // load dom event => to get localStorage data on load
    document.addEventListener('DOMContentLoaded', getTasks)
}

// add task function
function addTask(e) {
    e.preventDefault();
    
    // make sure that the field isnot empty on submit
    if(taskInput.value == '') {
        alert('Add a Task!')
    }

    // create li element
    const li = document.createElement('li')
    // add class to li
    li.className = 'collection-item'
    // create text node & append to li
    li.appendChild(document.createTextNode(taskInput.value))

    // create new link to li => it'll be a close btn to remove the li
    const link = document.createElement('a')
    //add class to a
    link.className = 'delete-item secondary-content'
    // add icon to link
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // append the link to li
    li.appendChild(link)


    // append li to ul
    taskList.appendChild(li)


    // store li in localStorage
    storeTaskInLocalStorage(taskInput.value)

    // clear input field on submit
    taskInput.value = ''
}


//store in localstorage function
function storeTaskInLocalStorage(task){
    let tasks

    // check if theres already something there
    if(localStorage.getItem('tasks') === null) {
        tasks = [] //if not => then set tasks to empty array
    } else {
        // if there's => then get it and convert it to json
        // because localStorage stores only string
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    // now we got the data from localStorage => it's time to push it
    tasks.push(task)

    // now we have to store the data back to localStorage
    // remoember the data should be stored as string
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


//get tasks function
function getTasks() {
    let tasks

    // check if theres already something there
    if(localStorage.getItem('tasks') === null) {
        tasks = [] //if not => then set tasks to empty array
    } else {
        // if there's => then get it and convert it to json
        // because localStorage stores only string
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    // loop through the tasks in localStorage and display them in DOM
    // we creat li for each task
    tasks.forEach(function(task){
        // create li element
        const li = document.createElement('li')
        // add class to li
        li.className = 'collection-item'
        // create text node & append to li
        li.appendChild(document.createTextNode(task))

        // create new link to li => it'll be a close btn to remove the li
        const link = document.createElement('a')
        //add class to a
        link.className = 'delete-item secondary-content'
        // add icon to link
        link.innerHTML = '<i class="fa fa-remove"></i>'
        // append the link to li
        li.appendChild(link)


        // append li to ul
        taskList.appendChild(li)
    })
}


// remove task function
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) { //we have to get the parent (link) .. because it gives us the icon (i) by default
        
        // confirm before removing
        if(confirm('Are you sure?')) { //if yes => returns true
            e.target.parentElement.parentElement.remove() //this will remove it from the DOM

            // we have also to remove it from localstorage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }
    }
}


// remove from localStorage function
function removeTaskFromLocalStorage(taskItem) {
    // console.log(taskItem)


    // check localStorage
    let tasks

    // check if theres already something there
    if(localStorage.getItem('tasks') === null) {
        tasks = [] //if not => then set tasks to empty array
    } else {
        // if there's => then get it and convert it to json
        // because localStorage stores only string
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    // loop through the data
    tasks.forEach(function(task, index) {

        // check if the text of the task matches the one in the ittration
        if(taskItem.textContent === task) {
            // if so, then this is the one to remove
            tasks.splice(index, 1)
        }
    })


    // after we removed the task => let's set (update) the localstorage
    localStorage.setItem('tasks', JSON.stringify(tasks))

}


// clear tasks function
function clearTasks() {
    // taskList.innerHTML = ''

    // another way to do it => faster than the first one
    while(taskList.firstChild) { //while there's still a list first child => means theres still something in the list

        taskList.removeChild(taskList.firstChild)
    }

    // we have also to clear everything from localStorage
    clearTasksFromLocalStorage()

}


// clear tasks from localStorage function
function clearTasksFromLocalStorage() {
    localStorage.clear() //thats clear out everything in local storage
}


//filter tasks function
function filterTasks(e) {

    //get what's written in the field
    const text = e.target.value.toLowerCase() // convert to lowerCase => so it matches correctly

    // we have to get all li items and loop through them
    // we can use forEach because querySelectorAll returns nodeList
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent; //get the text of the li item

        if(item.toLowerCase().indexOf(text) != -1) { //if there's no match => it gonna equale to -1
            task.style.display = 'block' //show the element if it does match
        } else { // there's no match
        task.style.display = 'none'
        }
    })


}
//SELECTORS
let todoList = document.querySelector('.todo-list')
let todoTemplate = document.querySelector('.todo-template').content

let formEl = document.getElementById('form')
let inputEl = document.querySelector('.todo-input')
let filterEl = document.getElementById('filter-todo')


//EVENT LISTENERS
var count = getTodos().length
formEl.addEventListener('submit', (event) => {
    if(inputEl.value == '') return
    event.preventDefault()
    addTodo({
        id: count++,
        title: inputEl.value,
        isComplated:false
    })
    renderTodo(getTodos())
    inputEl.value = ''
})


filterEl.addEventListener('change', filterTodo)

todoList.addEventListener('click', event => {
    event.preventDefault()
    const target = event.target
    if(target.dataset.task === 'trash'){
        let todoId = target.dataset.todoId
        todo = target.parentElement
        todo.classList.add('fall')
        todo.addEventListener('transitionend', function() {
            deleteTodo(todoId)
            renderTodo(getTodos())
        })
    }
    if(target.dataset.task === 'check') {
        todo = target.parentElement
        todo.classList.toggle('completed')
    }
})


//FUNCTIONS
function getTodos(){
    return JSON.parse(localStorage.getItem('todos')) || []
}


function addTodo(todo){
    const todos = getTodos()
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function deleteTodo(id){
    let todos = getTodos()
    todos = todos.filter(item => item.id != id)
    localStorage.setItem('todos', JSON.stringify(todos))
}


function renderTodo(todos){
    todoList.innerHTML = null

    todos.forEach(element => {
        let cloneTodo = document.importNode(todoTemplate, true)

        cloneTodo.querySelector('.todo__item').textContent = element.title
        cloneTodo.querySelector('[data-task=check]').dataset.todoId = element.id
        cloneTodo.querySelector('.todo__trash').dataset.todoId = element.id

        todoList.appendChild(cloneTodo)
    });
}

renderTodo(getTodos())


function filterTodo(e){
    const todos = todoList.childNodes;
    console.log(todos);
    for(let i = 1; i < todos.length; i++) {
        switch (e.target.value) {
            case 'all':
                todos[i].style.display = 'flex';
                break;
            case 'completed':
                if (todos[i].classList.contains('completed')) {
                    todos[i].style.display = 'flex'
                } else {
                    todos[i].style.display = 'none'
                }
            case 'uncompleted':
                if (!todos[i].classList.contains('completed')) {
                    todos[i].style.display = 'flex'
                } else {
                    todos[i].style.display = 'none'
                }
                break
        }
    }
}


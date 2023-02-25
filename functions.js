// Model
// if local storage has a todos array, then use it
// else use the default values
let todos;

// retrieve local storage
const savedTodos = JSON.parse(localStorage.getItem('todos'));
// Check if it is an array
if(Array.isArray(savedTodos)) {
    todos = savedTodos;

}
else{
        todos = [{
        title: 'Get groceries',
        dueDate: '10-04-2023',
        id: 'id1'
    }, {
        title: 'Wash car',
        dueDate: '11-08-2023',
        id: 'id2'
    }, {
        title: 'Make dinner',
        dueDate: '08-24-2023',
        id: 'id3'
    }];
}



// Creates a Todo
function createTodo(title, dueDate){
    const id = '' + new Date().getTime();
    todos.push({
        title: title,
        dueDate: dueDate,
        id: id
    });
    saveTodos();

}

// Deletes a Todo
function removeTodo(idToDelete){
    todos = todos.filter(function (todo) {
        // if the id of this todo matches isToDelete, return false
        // for everything else, return true
        if(todo.id === idToDelete)
        {
            return false;
        }
        else{
            return true;
        }
    });

    saveTodos();
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}


render();


// Controller
function addTodo(){
    const textbox = document.getElementById('todo-title');
    const title = textbox.value;

    const datePicker = document.getElementById('date-picker');
    const dueDate = datePicker.value;

    createTodo(title, dueDate);
    render();
}

function deleteTodo(event) {
    const deleteButton = event.target;
    const idToDelete = deleteButton.id;
    
    removeTodo(idToDelete);
    render();
}


// View
function render(){
    document.getElementById('todo-list').innerHTML = '';

    todos.forEach(function (todo) {
    const element = document.createElement('div');
    element.innerText = todo.title + ' Due on : ' + todo.dueDate;

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.style = 'margin-left: 12px;'
    deleteButton.onclick = deleteTodo;
    deleteButton.id = todo.id;
    element.appendChild(deleteButton);

    const todoList = document.getElementById('todo-list');
    todoList.appendChild(element);
    });
}
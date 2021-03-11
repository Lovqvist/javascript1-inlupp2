const todoInput = document.querySelector('#todo-input');
const todoOutput = document.querySelector('#todos-output');
const regTodo = document.querySelector('#reg-todo')

// Laddar upp 10 st todos till sidan

let todos = [];



const todoPosts = async () => {
    let url = 'https://jsonplaceholder.typicode.com/todos?_limit=10'

    const res = await fetch(url);
    todos = await res.json();
    console.log(todos)
    
    listTodos();
}

todoPosts();

const listTodos = () => {
    todoOutput.innerHTML = '';
    todos.forEach( post => { 
    
    postTodo(post);
    })
}

const postTodo = (todo) =>  {

    let card = document.createElement('div');
    
    card.addEventListener('click', () => {
        fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
        completed: true
    }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then(res => res.json())
    .then(data =>  {
        todos(data)
        card.classList.add('checked')
    })
        
        
    })
    if(todo.completed){
        card.classList.add('checked', 'todo-list', 'pt-1', 'pb-1', 'border', 'rounded', 'bg-white', 'd-flex', 'justify-content-between', 'align-items-center');
        } else {
            card.classList.add('todo-list', 'pt-1', 'pb-1', 'border', 'rounded', 'bg-white', 'd-flex', 'justify-content-between', 'align-items-center');
        }
   

    let titel = document.createElement('h5');
    titel.classList.add('px-2', 'm-0');
    titel.innerText = todo.title;

    let button = document.createElement('button');
    button.classList.add('btn', 'btn-delete');
    button.addEventListener('click', () =>{
        fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'DELETE',
          });
})

    
    let symbol = document.createElement('i');
    symbol.classList.add('fas', 'fa-minus')

    button.appendChild(symbol);
    card.appendChild(titel);
    card.appendChild(button);
    todoOutput.appendChild(card);
}

// Kolla så att det är något ifyllt!
const validate = () => {
    
    const error = document.querySelector('#todo-error')
    
    if(todoInput.value.trim() === ''){
        todoInput.classList.add('is-invalid')
        error.innerText = 'Please write something '
        
        return false;
        
    }else {
        todoInput.classList.remove('is-invalid');
        todoInput.classList.add('is-valid')
        
        return true;
    }
} 

// Skapa nya todos


const createTodo = (title) => { 
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        // gör om till json
        body: JSON.stringify({
            userId: 1,
            id: 0,
            title: title,
            completed: false
    }),
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
    })
    .then(res => res.json())
    .then(data => { 
    console.log(data);

    todos.unshift(data);
    listTodos();
    console.log(todos)
    })
}


// Ändra todo.completed

// const completUpdate = (todoid) => { 
//     fetch(`https://jsonplaceholder.typicode.com/todos/${todoid}`, {
//         method: 'PUT',
//         body: JSON.stringify({
//         completed: true
//     }),
//         headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//     },
//     })
//     .then(res => res.json())
//     .then(data => { 
//         console.log(data)

//         todos(data);
//     })
// }






regTodo.addEventListener('submit', (e) => {
    e.preventDefault();
    validate(todoInput);

    if(validate(todoInput)){
    createTodo(todoInput.value);
    regTodo.reset();
    }
    
    

    




})


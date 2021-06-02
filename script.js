const todoInput = document.querySelector('#todo-input');
const todoOutput = document.querySelector('#todos-output');
const regTodo = document.querySelector('#reg-todo')



let todos = [];

// Laddar upp 10 st todos till sidan

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
    // console.log(post.completed)
    })
}

const postTodo = (todo) =>  {

    let card = document.createElement('div');
    const checkCompleted = () => {
        if(todo.completed){
        card.classList.add('checked', 'todo-list', 'pt-1', 'pb-1', 'border', 'rounded', 'bg-white', 'd-flex', 'justify-content-between', 'align-items-center');
        } else {
            card.classList.add('todo-list', 'pt-1', 'pb-1', 'border', 'rounded', 'bg-white', 'd-flex', 'justify-content-between', 'align-items-center');
        }}
    card.addEventListener('click', () => {
        // console.log(todo)
        
        if(todo.completed){
           todo.completed = false;
        //    console.log(todos)
           card.classList.remove('checked')
       }else {
           todo.completed = true;
        //    console.log(todos)
           card.classList.add('checked')
       }
       return todos
    })
    
   checkCompleted(todos)

    let titel = document.createElement('h5');
    titel.classList.add('px-2', 'm-0');
    titel.innerText = todo.title.charAt(0).toUpperCase() + todo.title.slice(1).toLowerCase();  // Gör första bokstaven till stor bokstav och resterande små
      
    let button = document.createElement('button');
    button.classList.add('btn', 'btn-delete');

    button.addEventListener('click', () => {
        let deleteIndex = todo.id
        
        deleteTodo(todos.findIndex(todo => todo.id === deleteIndex))
        
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

// Ta bort todo

const deleteTodo = (todo) => {
    todos.splice(todo, 1);
    listTodos();
    console.log(todo);
  
}


regTodo.addEventListener('submit', (e) => {
    e.preventDefault();
    validate(todoInput);

    if(validate(todoInput)){
    createTodo(todoInput.value);
    regTodo.reset();
    }
    
})


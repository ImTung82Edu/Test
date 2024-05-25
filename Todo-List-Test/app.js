document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load todos from localStorage
    const todos = JSON.parse(localStorage.getItem('todos')) || [];

    // Function to render todos
    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
                ${todo}
                <button onclick="deleteTodo(${index})">Delete</button>
            `;
            todoList.appendChild(li);
        });
    }

    // Function to add todo
    function addTodo(event) {
        event.preventDefault();
        const newTodo = todoInput.value.trim();
        if (newTodo !== '') {
            todos.push(newTodo);
            todoInput.value = '';
            saveTodos();
            renderTodos();
        }
    }

    // Function to delete todo
    window.deleteTodo = function(index) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }

    // Function to save todos to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Event listener for form submission
    todoForm.addEventListener('submit', addTodo);

    // Initial render
    renderTodos();
});

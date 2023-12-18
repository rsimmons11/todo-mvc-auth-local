// Select all delete buttons, todo items, and completed todo items from the DOM
const deleteBtn = document.querySelectorAll('.del');
const todoItem = document.querySelectorAll('span.not');
const todoComplete = document.querySelectorAll('span.completed');

// Attach event listeners to each delete button to trigger the deleteTodo function
Array.from(deleteBtn).forEach((el) => {
    el.addEventListener('click', deleteTodo);
});

// Attach event listeners to each todo item to trigger the markComplete function
Array.from(todoItem).forEach((el) => {
    el.addEventListener('click', markComplete);
});

// Attach event listeners to each completed todo item to trigger the markIncomplete function
Array.from(todoComplete).forEach((el) => {
    el.addEventListener('click', markIncomplete);
});

// Function to handle the deletion of a todo item
async function deleteTodo() {
    // Get the todo ID from the dataset of the parent node
    const todoId = this.parentNode.dataset.id;
    try {
        // Make a DELETE request to the 'todos/deleteTodo' endpoint
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'todoIdFromJSFile': todoId,
            }),
        });

        // Parse the JSON response
        const data = await response.json();
        console.log(data);

        // Reload the page to reflect the changes
        location.reload();
    } catch (err) {
        console.log(err);
    }
}

// Function to handle marking a todo item as complete
async function markComplete() {
    // Get the todo ID from the dataset of the parent node
    const todoId = this.parentNode.dataset.id;
    try {
        // Make a PUT request to the 'todos/markComplete' endpoint
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'todoIdFromJSFile': todoId,
            }),
        });

        // Parse the JSON response
        const data = await response.json();
        console.log(data);

        // Reload the page to reflect the changes
        location.reload();
    } catch (err) {
        console.log(err);
    }
}

// Function to handle marking a todo item as incomplete
async function markIncomplete() {
    // Get the todo ID from the dataset of the parent node
    const todoId = this.parentNode.dataset.id;
    try {
        // Make a PUT request to the 'todos/markIncomplete' endpoint
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'todoIdFromJSFile': todoId,
            }),
        });

        // Parse the JSON response
        const data = await response.json();
        console.log(data);

        // Reload the page to reflect the changes
        location.reload();
    } catch (err) {
        console.log(err);
    }
}

let todoItems = [
  {id: 1, title: 'Homework'},
  {id: 2, title: 'Shopping'},
  {id: 3, title: 'Calling Mom'},
  {id: 4, title: 'Coffee with Elphaba'},
];

document.addEventListener('DOMContentLoaded', () => {
  let list = document.querySelector('ul');

  todoItems.forEach(todo => {
    let item = document.createElement('li');
    item.textContent = todo.title;
    item.dataset.id = todo.id;

    let button = document.createElement('span');
    button.classList.add('remove');

    item.appendChild(button);
    list.appendChild(item);
  })

  list.addEventListener('click', event => {
    if(event.target.tagName === 'SPAN') {
      const prompt = document.querySelector('.confirm_prompt');
      prompt.classList.add('show');
    }
  })
//   Create a list of todos in the DOM from a JavaScript collection (array) of todos.
//
//   Each Todo has an id, name, and a red x

  // each todo is implemented as a list item:
  // <ul class='todos'>
  // <li data-id="1">
  // Homework 
  // <span class="remove"></span>
  //
//   Add a delete button for each todo.
//
//   When the user clicks the delete button, a comfirmation prompt appears asking the user to confirm the deletion.
//
//
//   Use CSS to display the comfirmation prompt.
//
//   The comfirmation prompt has "Yes" and "No" buttons.
//
//   The prompt should include the title of the todo being deleted.
//
//   When the user clicks the "Yes" button, the comfirmation prompt disappears, and the corresponding todo is deleted.
//
//   When the user clicks the "No" button, the comfirmation prompt disappears, and the todo is not deleted.
//
//   When the user clicks outside of the comfirmation prompt, the comfirmation prompt disappears, and the todo is not deleted.
//
//
//
// Prevent the user from interacting with other buttons when the confirmation prompt is open.

})

let todoItems = [
  {id: 1, title: 'Homework'},
  {id: 2, title: 'Shopping'},
  {id: 3, title: 'Calling Mom'},
  {id: 4, title: 'Coffee with Elphaba'},
];

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', event => {
    if(event.target.classList.contains('remove')) {
      let todoId = event.target.closest('li').dataset.id;
      let title = document.createElement('p');
      let todo = todoItems.find(todo => todo.id === Number(todoId));
      title.textContent = todo.title;

      let text = document.createElement('p');
      text.textContent = `Are you sure you want to delete "${title.textContent}"?`

      let yes = document.createElement('a');
      yes.classList.add('confirm_yes');
      yes.textContent = 'Yes';
      yes.setAttribute('href', '#');

      let no = document.createElement('a');
      no.classList.add('confirm_no');
      no.textContent = 'No';
      no.setAttribute('href', '#');

      prompt.replaceChildren();
      prompt.appendChild(text);
      prompt.appendChild(yes);
      prompt.appendChild(no);
      prompt.dataset.id = todoId;
      prompt.classList.add('show');
      overlay.classList.add('show');
      return;
    }
    else if(event.target.classList.contains('confirm_yes')) {
      let id = prompt.dataset.id;
      let todo = list.querySelector(`li[data-id="${id}"]`);
      list.removeChild(todo);
      prompt.classList.remove('show');
      overlay.classList.remove('show');
    }
    else if(event.target.classList.contains('confirm_no') || event.target === overlay) {
      prompt.classList.remove('show');
      overlay.classList.remove('show');
    }
  });
})

class App {
  constructor(todos) {
    this.todos = todos;
    this.todosDiv = document.querySelector('.todos');
    this.promptDiv = document.querySelector('.confirm_prompt');
    this.overlayDiv = document.querySelector('.overlay');

    this.todos.forEach(todo => {
      let item = document.createElement('li');
      item.textContent = todo.title;
      item.dataset.id = todo.id;

      let button = document.createElement('span');
      button.classList.add('remove');

      item.appendChild(button);
      this.todosDiv.appendChild(item);
    })
  }
}

new App(todoItems);

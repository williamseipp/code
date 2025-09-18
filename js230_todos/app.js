let todoItems = [
  {id: 1, title: 'Homework'},
  {id: 2, title: 'Shopping'},
  {id: 3, title: 'Calling Mom'},
  {id: 4, title: 'Coffee with Elphaba'},
];

class App {
  constructor(todos) {
    this.todos = todos;
    this.todosDiv = document.querySelector('.todos');
    this.promptDiv = document.querySelector('.confirm_prompt');
    this.overlayDiv = document.querySelector('.overlay');

    this.renderTodos();

    this.todosDiv.addEventListener('click', event => {
      if(event.target.classList.contains('remove')) {
        let todoId = Number(event.target.closest('li').dataset.id);
        let todo = todoItems.find(todo => todo.id === todoId);
        this.showPrompt(todo);
      }
    });

    this.promptDiv.addEventListener('click', event => {
      event.preventDefault();
      let button = event.target;
      if(!button.classList.contains('confirm_yes') && !button.classList.contains('confirm_no')) return;

      // needed for deleting actual todo instead of just rendering
      let todoId = Number(button.closest('.confirm_wrapper').dataset.id);
      if(button.classList.contains('confirm_yes')) {
        this.todosDiv.removeChild(todo);
      }

      this.hidePrompt()
    });

    this.overlayDiv.addEventListener('click', event => {
      if(!event.target.classList.contains('overlay')) return;
      this.hidePrompt();
    });
  }

  confirmTemplate(todo) {
    return `
      <div class="confirm_wrapper" data-id="${todo.id}">
        <p>Are you sure you want to delete "${todo.title}"?</p>
        <div class="actions">
          <a href="#" class="confirm_yes">Yes</a>
          <a href="#" class="confirm_no">No</a>
        </div>
      </div>
    `;
  }

  showPrompt(todo) {
    this.promptDiv.innerHTML = this.confirmTemplate(todo);
    this.promptDiv.classList.add('show');
    this.overlayDiv.classList.add('show');
  }

  hidePrompt() {
    this.promptDiv.innerHTML = '';
    this.promptDiv.classList.remove('show');
    this.overlayDiv.classList.remove('show');
  }

  renderTodos() {
    this.todosDiv.innerHTML = this.todosTemplate();
  }

  todosTemplate() {
    return this.todos
      .map(todo => `<li data-id="${todo.id}">${todo.title} <span class="remove"></span></li>`)
      .join('');
  }
}

new App(todoItems);

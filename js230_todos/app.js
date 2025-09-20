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
    this.contextMenuDiv = document.querySelector('.context_menu');
    this.overlayDiv = document.querySelector('.overlay');

    this.renderTodos();

    this.todosDiv.addEventListener('click', this.handleDeleteClick.bind(this));
    this.todosDiv.addEventListener('contextmenu', this.handleRightClick.bind(this));
    this.promptDiv.addEventListener('click', this.handleConfirmClick.bind(this));
    this.overlayDiv.addEventListener('click', this.handleOverlayClick.bind(this));
    this.contextMenuDiv.addEventListener('click', this.handleMenuClick.bind(this));
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.renderTodos();
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

  menuTemplate(todo) {
    return `
        <ul>
          <li>Edit Todo</li>
          <li>Show Details</li>
          <li class="remove" data-id="${todo.id}">Delete</li>
        </ul>
    `;
  }

  handleDeleteClick(event) {
    if(!event.target.classList.contains('remove')) return;
    let todoId = Number(event.target.closest('li').dataset.id);
    let todo = todoItems.find(todo => todo.id === todoId);
    this.showPrompt(todo);
  }

  handleRightClick(event) {
    event.preventDefault();
    let todoId = Number(event.target.closest('li').dataset.id);
    let todo = todoItems.find(todo => todo.id === todoId);
    this.showMenu(todo);
  }

  handleMenuClick(event) {
    if(!event.target.classList.contains('remove')) return;
    let todoId = Number(event.target.dataset.id);
    let todo = todoItems.find(todo => todo.id === todoId);
    this.hideMenu();
    this.showPrompt(todo);
  }

  handleConfirmClick(event) {
    event.preventDefault();
    let button = event.target;
    if(!button.classList.contains('confirm_yes') && !button.classList.contains('confirm_no')) return;

    let todoId = Number(button.closest('.confirm_wrapper').dataset.id);
    if(button.classList.contains('confirm_yes')) {
      this.deleteTodo(todoId);
    }

    this.hidePrompt()
  }

  handleOverlayClick(event) {
    if(!event.target.classList.contains('overlay')) return;
    this.hidePrompt();
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

  showMenu(todo) {
    this.contextMenuDiv.innerHTML = this.menuTemplate(todo);
    this.contextMenuDiv.classList.add('show');
  }

  hideMenu() {
    this.contextMenuDiv.innerHTML = '';
    this.contextMenuDiv.classList.remove('show');
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

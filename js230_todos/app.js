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
        let title = document.createElement('p');
        let todo = todoItems.find(todo => todo.id === todoId);
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

        this.promptDiv.replaceChildren();
        this.promptDiv.appendChild(text);
        this.promptDiv.appendChild(yes);
        this.promptDiv.appendChild(no);
        this.promptDiv.dataset.id = todoId;
        this.promptDiv.classList.add('show');
        this.overlayDiv.classList.add('show');
        return;
      }
    });

    this.promptDiv.addEventListener('click', event => {
      event.preventDefault();
      let button = event.target;
      if(!button.classList.contains('confirm_yes') && !button.classList.contains('confirm_no')) return;

      if(button.classList.contains('confirm_yes')) {
        let id = this.promptDiv.dataset.id;
        let todo = this.todosDiv.querySelector(`li[data-id="${id}"]`);
        this.todosDiv.removeChild(todo);
      }

      this.hidePrompt()
    });

    this.overlayDiv.addEventListener('click', event => {
      if(!event.target.classList.contains('overlay')) return;
      this.hidePrompt();
    });
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

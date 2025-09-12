let todoItems = [
  {id: 1, title: 'Homework'},
  {id: 2, title: 'Shopping'},
  {id: 3, title: 'Calling Mom'},
  {id: 4, title: 'Coffee with Elphaba'},
];

document.addEventListener('DOMContentLoaded', () => {
  let list = document.querySelector('ul');
  const prompt = document.querySelector('.confirm_prompt');

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

      let todoId = event.target.parentNode.dataset.id;
      let title = document.createElement('p');
      let todo = todoItems.find(todo => todo.id === Number(todoId));
      title.textContent = todo.title;

      let yes = document.createElement('a');
      yes.classList.add('confirm_yes');
      yes.textContent = 'Yes';
      yes.setAttribute('href', '#');

      let no = document.createElement('a');
      no.classList.add('confirm_no');
      no.textContent = 'No';
      no.setAttribute('href', '#');

      prompt.appendChild(title);
      prompt.appendChild(yes);
      prompt.appendChild(no);
      prompt.classList.add('show');
    }
  })

  prompt.addEventListener('click', event => {
    if(event.target.classList.contains('confirm_yes')) {
      prompt.classList.remove('show');
      prompt.replaceChildren();
    }
  })
})

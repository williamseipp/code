async function addForm(event) {
  event.preventDefault();
  console.log('blue')
}

async function handleFormSubmit(event) {
  event.preventDefault();
  console.log('red')

}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btnAdd').addEventListener('click', addForm);

  document.querySelector('form').addEventListener('submit', handleFormSubmit);
})

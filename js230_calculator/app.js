class App {
  constructor() {
    document.querySelector('#buttons').addEventListener('click', this.pressButton.bind(this));
    this.expression = document.querySelector('.calculation');
    this.result = document.querySelector('.current_num');
  }

  pressButton(event) {
    alert(event.target.classList);
  }
}

new App();

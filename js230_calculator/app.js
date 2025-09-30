class App {
  constructor() {
    document.querySelector('#buttons').addEventListener('click', this.pressButton.bind(this));
  }

  pressButton(event) {
    alert(event.target.classList);
  }
}

new App();

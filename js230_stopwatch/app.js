class App {
  constructor() {
    this.toggleButton = document.querySelector('.toggle');
    this.toggleButton.addEventListener('click', this.handleToggle.bind(this));
  }

  handleToggle(event) {
    let text = event.target.textContent;
    if (text === 'Start') {
      this.toggleButton.textContent = 'Stop';
    } else {
      this.toggleButton.textContent = 'Start';
    }
  }
}

new App();

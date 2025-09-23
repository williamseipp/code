class App {
  constructor() {
    this.toggleButton = document.querySelector('.toggle');
    this.toggleButton.addEventListener('click', this.handleToggle.bind(this));
    this.centiseconds = document.querySelector('.centiseconds');
    this.seconds = document.querySelector('.seconds');
    this.minutes = document.querySelector('.minutes');
    this.hours = document.querySelector('.hours');
    this.elapsedMs = 0;
    this.intervalId = null;
  }

  handleToggle(event) {
    let text = event.target.textContent;
    if (text === 'Start') {
      this.toggleButton.textContent = 'Stop';
      this.intervalId = setInterval(this.updateTime.bind(this), 10);
    } else {
      this.toggleButton.textContent = 'Start';
      clearInterval(this.intervalId);
    }
  }

  updateTime() {
    this.elapsedMs += 10;
    let cs = Math.floor((this.elapsedMs % 1000) / 10);
    let s = Math.floor((this.elapsedMs / 1000) % 60);
    let m = Math.floor((this.elapsedMs / (60 * 1000)) % 60);
    let h = Math.floor((this.elapsedMs / (60 * 60 * 1000)));

    this.centiseconds.textContent = cs;
    this.seconds.textContent = s;
    this.minutes.textContent = m;
    this.hours.textContent = h;
  }
}

new App();

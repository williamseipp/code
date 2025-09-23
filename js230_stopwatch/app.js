class App {
  constructor() {
    this.toggleButton = document.querySelector('.toggle');
    this.toggleButton.addEventListener('click', this.handleToggle.bind(this));
    this.resetButton = document.querySelector('.reset');
    this.resetButton.addEventListener('click', this.handleReset.bind(this));

    this.display = {
      centiseconds: document.querySelector('.centiseconds'),
      seconds: document.querySelector('.seconds'),
      minutes: document.querySelector('.minutes'),
      hours: document.querySelector('.hours'),
    }

    this.elapsedMs = 0;
    this.isRunning = false;
    this.intervalId = null;
  }

  setToggleBtnText() {
    this.toggleButton.textContent = this.isRunning ? 'Stop' : 'Start';
  }

  handleToggle(event) {
    this.isRunning = !this.isRunning;
    this.setToggleBtnText();

    if (this.isRunning) {
      this.intervalId = setInterval(this.updateTime.bind(this), 10);
    } else {
      clearInterval(this.intervalId);
    }
  }

  handleReset() {
    clearInterval(this.intervalId);
    this.isRunning = false;

    this.elapsedMs = 0;
    this.display.centiseconds.textContent = 0;
    this.display.seconds.textContent = 0;
    this.display.minutes.textContent = 0;
    this.display.hours.textContent = 0;

    this.setToggleBtnText();
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

class App {
  constructor() {
    this.toggleButton = document.querySelector('.toggle');
    this.toggleButton.addEventListener('click', this.handleToggle.bind(this));
    this.resetButton = document.querySelector('.reset');
    this.resetButton.addEventListener('click', this.handleReset.bind(this));

    this.time = { h: 0, m: 0, s: 0, cs: 0 };

    this.display = {
      hours: document.querySelector('.hours'),
      minutes: document.querySelector('.minutes'),
      seconds: document.querySelector('.seconds'),
      centiseconds: document.querySelector('.centiseconds'),
    };

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

    this.time.h = Math.floor((this.elapsedMs / (60 * 60 * 1000)));
    this.time.m = Math.floor((this.elapsedMs / (60 * 1000)) % 60);
    this.time.s = Math.floor((this.elapsedMs / 1000) % 60);
    this.time.cs = Math.floor((this.elapsedMs % 1000) / 10);

    this.updateDisplay();
  }

  updateDisplay() {
    this.display.hours.textContent = String(this.time.h).padStart(2, '0');
    this.display.minutes.textContent = String(this.time.m).padStart(2, '0');
    this.display.seconds.textContent = String(this.time.s).padStart(2, '0');
    this.display.centiseconds.textContent = String(this.time.cs).padStart(2, '0');
  }
}

new App();

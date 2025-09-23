class App {
  constructor() {
    this.toggleButton = document.querySelector('.toggle');
    this.toggleButton.addEventListener('click', this.handleToggle.bind(this));
    this.centiseconds = document.querySelector('.centiseconds');
    this.seconds = document.querySelector('.seconds');
    this.minutes = document.querySelector('.minutes');
    this.hours = document.querySelector('.hours');
    this.elapsed_time = null;
    this.intervalId = null;
  }

  handleToggle(event) {
    let text = event.target.textContent;
    if (text === 'Start') {
      this.toggleButton.textContent = 'Stop';
      this.elapsed_time = new Date(0);
      this.intervalId = setInterval(this.updateTime.bind(this), 10);
    } else {
      this.toggleButton.textContent = 'Start';
    }
  }

  updateTime() {
    let elapsed_ms = this.elapsed_time.getTime() + 10;
    this.elapsed_time = new Date(elapsed_ms);
    this.centiseconds.textContent = this.elapsed_time.getUTCMilliseconds() / 10;
    this.seconds.textContent = this.elapsed_time.getUTCSeconds();
    this.minutes.textContent = this.elapsed_time.getUTCMinutes();
    this.hours.textContent = this.elapsed_time.getUTCHours();
  }
}

new App();

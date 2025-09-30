class App {
  constructor() {
    this.calculator = new Calculator();

    this.expressionDisplay = document.querySelector('.calculation');
    this.resultDisplay = document.querySelector('.current_num');

    document.querySelector('#buttons').addEventListener('click', this.onButtonClick.bind(this));
  }

  // responds to user action
  onButtonClick(event) {
    if(event.target.className === 'digit') {
      const num = event.target.textContent;
      this.updateResult(num);
    }
  }

  // change DOM
  updateResultDisplay(num) {
    const newValue = this.calculator.inputDigit(num);
    this.result.textContent = newValue;
  }
}

class Calculator {
  constructor() {
    this.currentValue = '0';
  }

  inputDigit(num) {
    if (this.currentValue === '0') {
      this.currentValue = num;
    } else {
      this.currentValue += num;
    }
    return this.currentValue;
  }
}

new App();

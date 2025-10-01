class App {
  constructor() {
    this.calculator = new Calculator();

    this.expressionDisplay = document.querySelector('.calculation');
    this.resultDisplay = document.querySelector('.current_num');

    document.querySelector('#buttons').addEventListener('click', this.onButtonClick.bind(this));
  }

  // decides what kind of button was pressed and route it
  onButtonClick(event) {
    const button = event.target.closest('a')
    if (!button) return;
    const btnType = button.className;
    const btnValue = button.textContent;

    if(btnType === 'digit') {
      this.calculator.inputDigit(btnValue);
      this.updateResultDisplay();
    }
  }

  // should read calculator's current state and update the DOM to match it
  updateResultDisplay(num) {
    this.resultDisplay.textContent = this.calculator.inputBuffer;
  }

  updateExpressionDisplay(expression) {
    this.expressionDisplay.textContent = expression;
  }
}

class Calculator {
  constructor() {
    this.inputBuffer = '0';
  }

  inputDigit(num) {
    if (this.inputBuffer === '0') {
      this.inputBuffer = num;
    } else {
      this.inputBuffer += num;
    }
  }
}

new App();

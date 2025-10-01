class App {
  constructor() {
    this.calculator = new Calculator();

    this.expressionDisplay = document.querySelector('.calculation');
    this.resultDisplay = document.querySelector('.current_num');

    document.querySelector('#buttons').addEventListener('click', this.onButtonClick.bind(this));
  }

  // responds to user action
  onButtonClick(event) {
    const button = event.target.closest('button')
    if (!button) return;
    const btnType = button.className;
    const btnValue = button.textContent;

    if(btnType === 'digit') {
      this.updateResultDisplay(btnValue);
    }
  }

  // change DOM
  updateResultDisplay(num) {
    const newValue = this.calculator.inputDigit(num);
    this.resultDisplay.textContent = newValue;
  }

  updateExpressionDisplay(expression) {
    this.expressionDisplay.textContent = expression;
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

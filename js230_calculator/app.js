class App {
  constructor() {
    this.calculator = new Calculator();

    this.expressionDisplay = document.querySelector('.calculation');
    this.resultDisplay = document.querySelector('.current_num');

    document.querySelector('#buttons').addEventListener('click', this.onButtonClick.bind(this));
  }

  // responds to user action
  onButtonClick(event) {
    const btnType = event.target.className;
    const btnValue = event.target.textContent;

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

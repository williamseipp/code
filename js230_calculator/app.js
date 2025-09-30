class App {
  constructor() {
    this.calculator = new Calculator();
    document.querySelector('#buttons').addEventListener('click', this.pressButton.bind(this));
    this.expression = document.querySelector('.calculation');
    this.result = document.querySelector('.current_num');
  }

  pressButton(event) {
    if(event.target.className === 'digit') {
      const num = event.target.textContent;
      this.updateResult(num);
    }
  }

  emptyExpression() {
    return this.expression.textContent === '';
  }

  updateResult(num) {
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

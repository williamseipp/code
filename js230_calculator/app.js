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
    const btnId = button.id;

    if(btnType === 'digit') {
      this.calculator.inputDigit(btnValue);
    } else if(btnType === 'dot') {
      this.calculator.inputDecimal();
    } else if(btnId === 'ce') {
      this.calculator.clearInputBuffer();
    } else if(btnId === 'c') {
      this.calculator.clearInputBuffer();
      this.calculator.clearExpression();
    } else if(btnId === 'neg') {
      this.calculator.negateInput();
    } else if(btnType === 'op') {
      this.calculator.addOperator(btnValue);
    }
    this.updateResultDisplay();
  }

  // updates DOM to match calculator input buffer state
  updateResultDisplay(num) {
    this.resultDisplay.textContent = this.calculator.inputBuffer;
  }

  // updates DOM to match calculator expression state
  updateExpressionDisplay(expression) {
    this.expressionDisplay.textContent = this.calculator.expression;
  }
}

class Calculator {
  constructor() {
    this.inputBuffer = '0';
    this.expression = '';
  }

  inputDigit(num) {
    if (this.inputBuffer === '0') {
      this.inputBuffer = num;
    } else {
      this.inputBuffer += num;
    }
  }

  inputDecimal() {
    if(this.inputBuffer.includes('.')) return;
    this.inputBuffer += '.';
  }

  clearInputBuffer() {
    this.inputBuffer = '0';
  }

  clearExpression() {
    this.expression = '';
  }

  negateInput() {
    if(this.inputBuffer.includes('-')) {
      this.inputBuffer = this.inputBuffer.slice(1);
    } else {
      this.inputBuffer = '-' + this.inputBuffer;
    }
  }

  addOperator(opString) {
    this.expression += this.inputBuffer + opString;
    this.clearInputBuffer();
  }
}

new App();

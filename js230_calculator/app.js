class App {
  constructor() {
    document.querySelector('#buttons').addEventListener('click', this.pressButton.bind(this));
    this.expression = document.querySelector('.calculation');
    this.result = document.querySelector('.current_num');
  }

  pressButton(event) {
    let num = event.target.textContent;
    if(event.target.className === 'digit' && this.emptyExpression()) {
      this.updateResult(num);
    }
  }

  emptyExpression() {
    return this.expression.textContent === '';
  }

  updateResult(num) {
    if (this.result.textContent === '0') {
      this.result.textContent = num;
    } else {
      this.result.textContent += num;
    }
  }
}

new App();

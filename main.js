class Calculator {
  constructor(input, output) {
    (this.input = input), (this.output = output), (this.history = []);
  }

  clear() {
    this.history = [];
    this.updateInput();
    this.updateOutput("0");
  }

  backspace() {}

  percentToDecimal() {}

  getNumber(value) {
    if (this.LastInputType() === "number") {
      this.appendToLastInput(value);
    } else if (
      this.LastInputType() === "operator" ||
      this.LastInputType() === null
    ) {
      this.NewInput(value, "number");
    }
  }

  getOperation(value) {}

  negateNumber() {}

  getDecimalPoint() {}

  result() {}

  getInputValue() {
    return this.history.map((entry) => entry.value);
  }

  updateInput() {
    this.input.value = this.getInputValue().join(" ");
  }

  updateOutput(value) {
    this.output.value = Number(value).toLocaleString();
  }
}

// DOM ELEMENTS
const input = document.querySelector("#history");
const output = document.querySelector("#result");

const clearBtn = document.querySelector("[data-clear]");
const backSpcBtn = document.querySelector("[data-backspace]");
const percentBtn = document.querySelector("[data-percent]");
const opBtn = document.querySelector("[data-operator]");
const numBtn = document.querySelector("[data-number]");
const decimalBtn = document.querySelector("[data-decimal]");
const equalsBtn = document.querySelector("[data-equals]");
const negateBtn = document.querySelector("[data-negation]");

// CALCULATOR
const calculator = new Calculator(input, output);

// Event Handlers

clearBtn.addEventListener("click", () => {
  calculator.clear();
});

backSpcBtn.addEventListener("click", () => {
  calculator.backspace();
});

percentBtn.addEventListener("click", () => {
  calculator.percentToDecimal();
});

negateBtn.addEventListener("click", () => {
  calculator.negateNumber();
});

decimalBtn.addEventListener("click", () => {
  calculator.getDecimalPoint();
});

equalsBtn.addEventListener("click", () => {
  calculator.result();
});

opBtn.forEach((button) => {
  button.addEventListener("click", (event) => {
    let { target } = event;
    calculator.getOperation(target.dataset.operator);
  });
});

numBtn.forEach((button) => {
  button.addEventListener("click", (event) => {
    let { target } = event;
    calculator.getNumber(target.dataset.number);
  });
});

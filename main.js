class Calculator {
  constructor(input, output) {
    (this.input = input), (this.output = output), (this.history = []);
  }

  clear() {
    this.history = [];
    this.updateInput();
    this.updateOutput("0");
  }

  backspace() {
    switch (this.LastInputType()) {
      case "number":
        if (this.LastInputVal().length > 1) {
          this.editLastInput(this.LastInputVal().slice(0, -1), "number");
        } else {
          this.deleteLastInput();
        }
        break;
      case "operator":
        this.deleteLastInput();
        break;
      default:
        return;
    }
  }

  percentToDecimal() {}

  getNumber(value) {
    if (this.LastInputType() === "number") {
      this.appendToLastInput(value);
    } else if (
      this.LastInputType() === "operator" ||
      this.LastInputType() === null
    ) {
      this.addNewInput(value, "number");
    }
  }

  getOperation(value) {}

  negateNumber() {}

  getDecimalPoint() {}

  result() {}

  LastInputType() {
    return this.history.length === 0
      ? null
      : this.history[this.history.length - 1].type;
  }

  LastInputVal() {
    return this.history.length === 0
      ? null
      : this.history[this.history.length - 1].value;
  }

  getInputValue() {
    return this.history.map((entry) => entry.value);
  }

  getOutputValue() {
    return this.output.value.replace(/,/g, "");
  }

  editLastInput(value, type) {
    this.history.pop();
    this.addNewInput(value, type);
  }

  deleteLastInput() {
    this.history.pop();
    this.updateInput();
  }

  addNewInput(value, type) {
    this.history.push({ type: type, value: value.toString() });
    this.updateInput();
  }

  appendToLastInput(value) {
    this.history[this.history.length - 1].value += value.toString();
    this.updateInput();
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
const opBtn = document.querySelectorAll("[data-operator]");
const numBtn = document.querySelectorAll("[data-number]");
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

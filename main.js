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

  percentToDecimal() {
    if (this.LastInputType() === "number") {
      this.editLastInput(this.LastInputVal() / 100, "number");
    }
  }

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

  getOperation(value) {
    switch (this.LastInputType()) {
      case "number":
        this.addNewInput(value, "operator");
        break;
      case "operator":
        this.editLastInput(value, "operator");
        break;
      case "equals":
        let output = this.outputVal();
        this.history();
        this.addNewInput(output, "number");
        this.addNewInput(value, "operator");
        break;
      default:
        return;
    }
  }
  negateNumber() {
    if (this.LastInputType() === "number") {
      this.editLastInput(parseFloat(this.LastInputVal()) * -1, "number");
    }
  }

  getDecimalPoint() {
    if (
      this.LastInputType() === "number" &&
      this.LastInputVal().includes(".")
    ) {
      this.appendToLastInput(".");
    } else if (
      this.LastInputType() === "operator" ||
      this.LastInputType() === null
    ) {
      this.addNewInput("0.", "number");
    }
  }

  result() {
    if (this.LastInputType() === "number") {
      const self = this;
      const simpleExp = function (currExp, operator) {
        if (currExp.indexOf(operator) === -1) {
          return currExp;
        } else {
          let opIdx = currExp.indexOf(operator);
          let leftOperandIdx = opIdx - 1;
          let rightOperandIdx = opIdx + 1;

          let partialSol = self.performOperation(
            ...currExp.slice(leftOperandIdx, rightOperandIdx + 1)
          );

          currExp.splice(leftOperandIdx, 3, partialSol.toString());

          return simpleExp(currExp, operator);
        }
      };

      let result = ["÷", "×", "−", "+"].reduce(simpleExp, this.getInputValue());

      this.addNewInput("=", "equals");
      this.updateOutput(result.toString());
    }
  }

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

  performOperation(leftOperand, operation, rightOperand) {
    leftOperand = parseFloat(leftOperand);
    rightOperand = parseFloat(rightOperand);

    if (Number.isNaN(leftOperand) || Number.isNaN(rightOperand)) {
      return;
    }

    switch (operation) {
      case "−":
        return leftOperand - rightOperand;
      case "+":
        return leftOperand + rightOperand;
      case "×":
        return leftOperand * rightOperand;
      case "÷":
        return leftOperand / rightOperand;
      default:
        return;
    }
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

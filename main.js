class Calculator {
  constructor() {}
  clear() {}

  backspace() {}

  percentToDecimal() {}

  getNumber(value) {}

  getOperation(value) {}

  negateNumber() {}

  getDecimalPoint() {}

  result() {}
}

const input = document.querySelector("#history");
const output = document.querySelector("#result");

const clearBtn = document.querySelector("[data-clear]");
const backSpcBtn = document.querySelector("[data-backspace]");
const percentBtn = document.querySelector("[data-percent]");
const opBtn = document.querySelector("[data-operator]");
const numBtn = document.querySelector("[data-number]");
const equalsBtn = document.querySelector("[data-equals]");

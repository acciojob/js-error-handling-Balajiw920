class OutOfRangeError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = "Expression should only consist of integers and +-/* characters";
  }
}

class InvalidExprError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.message = "Expression should not have an invalid combination of operators";
  }
}

function evalString(expression) {
  try {
    // Throw error if there is an invalid character
    if (!/^[\d\s\+\-\*\/]+$/.test(expression)) {
      throw new OutOfRangeError();
    }

    // Throw error if there is a combination of operators like ++, /+, etc.
    if (/[\+\-\/\*]{2,}/.test(expression)) {
      throw new InvalidExprError();
    }

    // Throw Syntax Error if Expression starts with an invalid operator
    if (/^[\*\/]/.test(expression)) {
      throw new SyntaxError("Expression should not start with an invalid operator");
    }

    // Throw Syntax Error if Expression ends with an invalid operator
    if (/[\+\-\*\/]$/.test(expression)) {
      throw new SyntaxError("Expression should not end with an invalid operator");
    }

    // Evaluate the expression here
    const result = eval(expression);
    return result;
  } catch (error) {
    if (error instanceof OutOfRangeError || error instanceof InvalidExprError) {
      throw error;
    } else {
      throw new Error("Something went wrong during evaluation");
    }
  }
}

const expressionInput = document.getElementById("expression");
const resultDiv = document.getElementById("result");

expressionInput.addEventListener("input", () => {
  const expression = expressionInput.value.trim();
  resultDiv.textContent = "";
  try {
    if (expression) {
      const result = evalString(expression);
      resultDiv.textContent = `Result: ${result}`;
    }
  } catch (error) {
    if (error instanceof OutOfRangeError || error instanceof InvalidExprError) {
      resultDiv.textContent = error.message;
    } else {
      resultDiv.textContent = "An unexpected error occurred.";
      console.error(error);
    }
  }
});

//your code here
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
    this.message = "Expression should not have an invalid combination of expression";
  }
}

function evalString(expression) {
  try {
    // Throw error if there is a combination of operators like ++, /+, etc.
    if (/[\+\-\/\*]{2,}/.test(expression)) {
      throw new InvalidExprError();
    }

    // Throw Syntax Error if Expression starts with +, /, * operator
    if (/^[\+\/\*]/.test(expression)) {
      throw new SyntaxError("Expression should not start with an invalid operator");
    }

    // Throw Syntax Error if Expression ends with +, /, *, - operator
    if (/[\+\/\*\-]$/.test(expression)) {
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

try {
  // Test your expression here
  const expression = "5 + 10 / 2";
  const result = evalString(expression);
  console.log(result);
} catch (error) {
  if (error instanceof OutOfRangeError || error instanceof InvalidExprError) {
    console.error(error.message);
  } else {
    console.error("An unexpected error occurred:", error);
  }
}

function calculateExpression(expression) {
    const output = [];
    const operators = [];
    const priority = {
        "+": 1,
        "-": 1,
        "*": 2,
        "/": 2
    };
    // Split the expression into numbers, operators, and parentheses
    const tokens = expression.match(/\d+(\.\d+)?|[()+\-*/]/g);
    // Convert infix expression to postfix notation
    for (const token of tokens) {
        // Number
        if (!isNaN(token)) {
            output.push(Number(token));
        }
        // Opening parenthesis
        else if (token === "(") {
            operators.push(token);
        }
        // Closing parenthesis
        else if (token === ")") {
            while (
                operators.length > 0 &&
                operators[operators.length - 1] !== "("
                ) {
                output.push(operators.pop());
            }
            operators.pop();
        }
        // Operator
        else {
            while (
                operators.length > 0 &&
                operators[operators.length - 1] !== "(" &&
                priority[operators[operators.length - 1]] >= priority[token]
                ) {
                output.push(operators.pop());
            }
            operators.push(token);
        }
    }
    // Move remaining operators to output
    while (operators.length > 0) {
        output.push(operators.pop());
    }
    console.log("Postfix:", output.join(" "));
    // Evaluate postfix expression
    const stack = [];
    for (const token of output) {
        if (typeof token === "number") {
            stack.push(token);
        } else {
            const b = stack.pop();
            const a = stack.pop();
            if (token === "+") {
                stack.push(a + b);
            } else if (token === "-") {
                stack.push(a - b);
            } else if (token === "*") {
                stack.push(a * b);
            } else if (token === "/") {
                stack.push(a / b);
            }
        }
    }
    return stack[0];
}

const expression = "3 + (2 * 4) - 10 / 2";
console.log("Result:", calculateExpression(expression));
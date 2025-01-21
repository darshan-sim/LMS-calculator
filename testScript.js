const functionRegex = /^(log|abs|sqrt|sin|cos|tan|exp|ln|mod)\((.*)/;

// const functionRegex = /^(log|abs|sqrt|sin|cos|tan|exp|ln|mod)\((.*)/;

function precedence(op) {
    if (op === '^') {
        return 3;
    }
    if (op === '*' || op === '/') {
        return 2;
    }
    if (op === '+' || op === '-') {
        return 1;
    }
    return 0;
}

function factorial(n) {
    if (n === 0) {
        return 1;
    }
    return n * factorial(n - 1);
}

function isMathFunction(expression) {
    return expression.match(functionRegex) ? true : false;
}

function evalFunction(expression) {
    // debugger
    console.log(expression)
    let match = expression.match(functionRegex);
    const fn = match[1];
    console.log(fn)
    let result = 0;
    if (match) {
        const parentheses = new paretheses();
        const innerExpression = parentheses.getFullExpression(expression.slice(fn.length + 1));
        console.log(innerExpression)
            // debugger
        result = myEval(innerExpression, match[1]);
    } else {
        return [expression, expression.length - 1]
    }
    console.log('result:' + result)
    console.log('length:' + expression.length - 1)

    return [result, expression.length - 1]
}

function infixToPostfix(expression) {
    let stack = [];
    let postfix = [];
    let i = 0;
    let n = expression.length;

    const numberPattern = /\d+(\.\d+)?/;

    while (i < n) {
        // console.log(expression.slice(i))
        // console.log(i)
        // debugger
        if (isMathFunction(expression.slice(i))) {
            const [result, length] = evalFunction(expression.slice(i));
            console.log(length)
            postfix.push(result);
            i += length;
        }
        let char = expression[i];

        if (/\d/.test(char) || char === '.') {
            let match = expression.slice(i).match(numberPattern);
            let num = match[0];
            postfix.push(num);
            i += num.length;
        } else if (['+', '-', '*', '/', '^'].includes(char)) {
            while (stack.length > 0 && precedence(stack[stack.length - 1]) >= precedence(char)) {
                postfix.push(stack.pop());
            }
            stack.push(char);
            i++;
        } else if (char === '!') {
            postfix.push(factorial(postfix.pop()));
            i++;
        } else {
            i++;
        }
    }

    while (stack.length > 0) {
        postfix.push(stack.pop());
    }

    return postfix.join(' ');
}

function evaluatePostfix(postfix) {
    let stack = [];

    let tokens = postfix.split(' ');

    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];

        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        } else {
            let b = stack.pop();
            let a = stack.pop();
            let result;

            switch (token) {
                case '+':
                    result = a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '*':
                    result = a * b;
                    break;
                case '/':
                    result = a / b;
                    break;
                case '^':
                    result = Math.pow(a, b);
                    break;
                default:
                    throw new Error(`Unknown operator: ${token}`);
            }

            stack.push(result);
        }
    }

    return stack.pop();
}

// const infixExpression = "2 ^ 3 ^ 4";
// const postfixExpression = infixToPostfix(infixExpression);
// console.log("Postfix:", postfixExpression);
// const result = evaluatePostfix(postfixExpression);
// console.log("Result:", result);

const getAnswer = (expression) => {
    const postfix = infixToPostfix(expression);
    const answer = evaluatePostfix(postfix);
    // console.log(answer)
    return answer;
}

class paretheses {
    constructor() {
        this.stack = [];
    }
    push() {
        this.stack.push('(');
    }
    pop() {
        return this.stack.pop();
    }
    isAllowed() {
        return this.stack[this.stack.length] > 0;
    }
    complete(expression) {
        let completeExpression = expression
        for (let i = 0; i < expression.length; i++) {
            if (expression[i] === '(') this.push();
            if (expression[i] === ')') this.pop();
        }
        while (this.stack.length > 0) {
            completeExpression += ')';
        }
        return completeExpression;
    }
    getFullExpression(expression) {
        let completeExpression = expression
        let last = 0;
        let canReturn = false;
        // console.log(expression)
        for (let i = 0; i < expression.length; i++) {
            if (i === expression.length - 1) canReturn = true;
            if (expression[i] === '(') {
                this.push();
                canReturn = true
            };
            if (expression[i] === ')') {
                this.pop();
                last = i;
            };
            if (this.stack.length === 0 && canReturn) return expression.slice(0, last + 1);
        }
        while (this.stack.length > 0) {
            completeExpression += ')';
            this.pop()
        }
        return completeExpression;
    }
};

const abs = (function() {
    const stack = [];
    const obj = {
        push: function() {
            stack.push('|');
        },
        pop: function() {
            return stack.pop();
        },
        isValid: function() {
            return stack.length % 2 === 0;
        }
    }
})();

const isSimpleOperation = (function(value) {
    const operators = ['+', '-', '*', '/', '%', '^'];
    return operators.includes(value);
});

const isFunctionOperation = function(value) {
    const functions = ['log', 'abs', 'sqrt', 'sin', 'cos', 'tan', 'exp', 'ln', 'mod'];
    return functions.includes(value);
}

const isNumber = function(value) {
    if (value === '.') return true;
    return !isNaN(value);
}

const getInnerExpression = function(expression) {
    const parentheses = new paretheses();
    return parentheses.complete(expression);
}


// const functionRegex = /^(log|abs|sqrt|sin|cos|tan|exp|ln|mod)\((.*)/;

const myEval = function(string, mathFn) {
    console.log({ string, mathFn })
    const n = string.length;
    let i = 0;
    while (i < n) {
        let match = string.slice(i).match(functionRegex);

        if (match) {
            let fn = match[1];
            const parentheses = new paretheses();
            const innerExpression = parentheses.getFullExpression(string.slice(i + fn.length + 1));

            // console.log(`Found function: ${fn}, Arguments: ${innerExpression}`);

            let evaluatedArg = myEval(innerExpression, fn);
            // console.log(fn)
            i += match.index + match[0].length;
        } else {
            if (string.length - 1 === ')') { return getAnswer(string.slice(0, -1)) }
            return getAnswer(string);
        }
    }
};

const string = 'log(10+log(10+10))';

myEval(string)
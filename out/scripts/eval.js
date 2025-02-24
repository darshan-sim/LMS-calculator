function isNumber(char) {
    return (char >= "0" && char <= "9") || char === ".";
}
function isParenthesis(char) {
    return char === "(" || char === ")";
}
function isOperator(char) {
    const operators = ["-", "+", "*", "/"];
    return operators.includes(char);
}
function degToRad(degrees) {
    return degrees * (Math.PI / 180);
}
const updateHistory = (value) => {
    const localHistory = localStorage.getItem("history");
    let history = localHistory ? JSON.parse(localHistory) : [];
    history.unshift(value);
    localStorage.setItem("history", JSON.stringify(history));
    const ul = document.querySelector(".history-list");
    const li = document.createElement("li");
    li.innerText = value;
    if (ul === null || ul === void 0 ? void 0 : ul.firstChild) {
        ul.insertBefore(li, ul.firstChild);
    }
    else {
        ul === null || ul === void 0 ? void 0 : ul.appendChild(li);
    }
};
function sin(x) {
    x = degToRad(x);
    let term = x;
    let sum = 0;
    let n = 1;
    while (Math.abs(term) > 1e-15) {
        sum += term;
        term = (-term * x * x) / (2 * n * (2 * n + 1));
        n++;
    }
    return sum;
}
function cos(x) {
    x = degToRad(x);
    let term = 1;
    let sum = 0;
    let n = 0;
    while (Math.abs(term) > 1e-15) {
        sum += term;
        term = (-term * x * x) / ((2 * n + 1) * (2 * n + 2));
        n++;
    }
    return sum;
}
function tan(x) {
    return sin(x) / cos(x);
}
function isFn(input) {
    const calculatorFunctions = {
        "^": "**",
        sin: "sin",
        cos: "cos",
        tan: "tan",
        log: "Math.log10",
        ln: "Math.log",
        sqrt: "Math.sqrt",
        exp: "Math.exp",
        factorial: "factorial",
        pi: "Math.PI",
        "e^": "Math.E**",
        mod: "%"
    };
    return calculatorFunctions[input];
}
const getFactorial = (number) => {
    if (number <= 1)
        return number;
    return number * getFactorial(number - 1);
};
const factorial = (number) => {
    return getFactorial(eval("" + number));
};
const getValidInfix = (expression) => {
    return expression.replace(/%(\d|\()/g, '/100 *$1').replace(/%/g, '/100');
};
const completeExpression = (incompleteExpression) => {
    let completeExpression = incompleteExpression;
    let i = 0;
    let parenthesis = 0;
    const n = incompleteExpression.length;
    while (i < n) {
        if (incompleteExpression[i] === "(")
            parenthesis++;
        if (incompleteExpression[i] === ")")
            parenthesis--;
        i++;
    }
    while (parenthesis > 0) {
        completeExpression += ")";
        parenthesis--;
    }
    return completeExpression;
};
const handleAbs = (abs) => {
    return abs ? [")", false] : ["Math.abs(", true];
};
export const getAnswer = function (userExpression) {
    const validExpression = completeExpression(userExpression);
    updateHistory(validExpression);
    const tokens = getValidInfix(validExpression);
    const expression = [];
    const n = tokens.length;
    let i = 0;
    let abs = false;
    while (i < n) {
        //handle spaces, abs and parenthesis first
        const char = tokens[i];
        if (char === " ") {
            i++;
            continue;
        }
        //handle absolute value based on abs flag
        if (char === "|") {
            let push;
            [push, abs] = handleAbs(abs);
            expression.push(push);
            i++;
            continue;
        }
        if (isParenthesis(char)) {
            expression.push(char);
            i++;
            continue;
        }
        if (isOperator(char)) {
            expression.push(char);
            i++;
            continue;
        }
        //handle operators
        if (isNumber(char)) {
            let num = "";
            while (isNumber(tokens[i])) {
                num += tokens[i];
                i++;
            }
            expression.push(Number(num));
            continue;
        }
        //handle factorial before evaluating
        if (char === "!") {
            let last = expression.pop();
            if (typeof last === "string" && last.includes(")")) {
                let temp = [];
                let closed = 1; // Track open-close balance
                temp.push(last);
                while (closed > 0) {
                    last = expression.pop();
                    temp.push(last);
                    if (last === ")")
                        closed++;
                    if (last === "(")
                        closed--;
                }
                temp.reverse();
                last = temp.join(""); // Reconstruct the full expression
            }
            const evaluatedLast = eval("" + last);
            // Ensure it's a valid non-negative integer
            if (!Number.isInteger(evaluatedLast) || evaluatedLast < 0) {
                throw new Error("Factorial only applies to non-negative integers.");
            }
            expression.push(factorial(evaluatedLast));
            i++;
            continue;
        }
        //handle functions
        let calFun = "";
        while (true) {
            const c = tokens[i];
            if (c === " ") {
                i++;
                continue;
            }
            if (!c || isParenthesis(c) || isNumber(c) || isOperator(c))
                break;
            calFun += c;
            i++;
        }
        /**
         * push the correct function to the expression
         * only the valid functions are pushed
         * safety for eval function
         */
        if (calFun !== " " && isFn(calFun)) {
            if (["-", "+", "^", "*", "/", "(", ")"].includes("" + expression[expression.length - 1])) {
                expression.push(isFn(calFun));
            }
            else if (expression.length > 0 && calFun !== "^" && calFun !== "mod") {
                expression.push("*");
                expression.push(isFn(calFun));
            }
            else {
                expression.push(isFn(calFun));
            }
            calFun = "";
        }
    }
    /**
     * evaluate the expression
     * if the answer is a number update the history
     * else update the history with 0
     */
    try {
        let answer = eval(expression.join(""));
        if (!isNaN(Number(answer))) {
            updateHistory(answer);
            return answer;
        }
        else {
            updateHistory("0");
        }
    }
    catch (err) {
        updateHistory("0");
        return "Error";
    }
    return "Error";
};

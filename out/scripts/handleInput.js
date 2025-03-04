export const handleInput = (() => {
    let isDecimalNumber = false;
    const operatorsForDecimal = ["-", "+", "^", "*", "/", "(", ")"];
    const operators = ["-", "+", "^", "*", "/", "%"];
    let parenthesis = 0;
    const resetParenthesis = () => (parenthesis = 0);
    const updateDecimalNumber = (input) => {
        if (input.length <= 0) {
            isDecimalNumber = false;
            return;
        }
        const lastChar = input[input.length - 1];
        if (lastChar === ".") {
            isDecimalNumber = true;
            return;
        }
        if (operatorsForDecimal.includes(lastChar)) {
            isDecimalNumber = false;
            return;
        }
    };
    const checkOperator = (input) => {
        if (input.length <= 0) {
            return "";
        }
        const lastChar = input[input.length - 1];
        const prevChar = input[input.length - 2];
        if (operators.includes(lastChar) && operators.includes(prevChar)) {
            return input.slice(0, -2) + lastChar;
        }
        return input;
    };
    const checkInput = (input) => {
        const char = input[input.length - 1];
        const value = input;
        if (char === "(") {
            parenthesis += 1;
        }
        if (char === ")" && parenthesis > 0) {
            parenthesis -= 1;
        }
        updateDecimalNumber(input);
        return checkOperator(input);
    };
    const checkForDecimal = () => {
        return isDecimalNumber;
    };
    return {
        processInput: checkInput,
        processDecimalNumber: checkForDecimal,
        processOperator: checkOperator,
        checkForParenthesis: () => {
            return parenthesis > 0;
        },
        resetParenthesis: resetParenthesis
    };
})();

export const handleInput = (() => {
    let isDecimalNumber = false;
    const operatorsForDecimal = ['-', '+', '^', '*', '/', '(', ')']
    const operators = ['-', '+', '^', '*', '/', ]
    let parenthesis = 0;

    const updateDecimalNumber = (input) => {
        if (input.length <= 0) {
            isDecimalNumber = false;
            return
        }
        const lastChar = input[input.length - 1]

        if (lastChar === '.') {
            isDecimalNumber = true
            return
        }

        if (operatorsForDecimal.includes(lastChar)) {
            isDecimalNumber = false;
            return
        }
        // if(lastChar)
    }

    const checkOperator = (input) => {
        if (input.length <= 0) {
            return ""
        }
        const lastChar = input[input.length - 1]
        const prevChar = input[input.length - 2]

        if (operators.includes(lastChar) && operators.includes(prevChar)) {
            return input.slice(0, -2) + lastChar
        }
        return input
    }

    const checkInput = (input) => {
        const char = input[input.length - 1]
        if (char === "(") {
            parenthesis += 1
            console.log({ "parenthesis": parenthesis })
        };
        if (char === ')' && parenthesis > 0) {
            parenthesis -= 1
        }
        updateDecimalNumber(input)
        return checkOperator(input)
    };

    const checkForDecimal = () => {
        return isDecimalNumber;
    }

    return {
        processInput: checkInput,
        processDecimalNumber: checkForDecimal,
        processOperator: checkOperator,
        checkForParenthesis: () => {
            console.log({ "parenthesis": parenthesis });
            return parenthesis > 0;
        },
        // updateParenthesis: updateParenthesis
    };
})();
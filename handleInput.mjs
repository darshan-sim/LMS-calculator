// class Parenthesis {
//     constructor() {
//         this.stack = []
//     }
//     push() {
//         this.stack.push('(')
//     }
//     pop() {
//         this.stack.pop
//     }
//     validParenthesis() {
//         console.log({ "class": "" })
//         return this.stack.length ? true : false
//     }

//     getStack() {
//         return this.stack
//     }
// }
// const parenthesis = new Parenthesis()

// // v.1
// export const handleInput = (() => {
//     let isDecimal = false;
//     const checkInput = (input) => {
//         input.length > 3 ? (isDecimal = true) : (isDecimal = false);
//         console.log(isDecimal);
//         console.log(isDecimal);
//         return input;
//     };
//     return checkInput;
// })();

// // v.2
// let isDecimal = false;
// export const handleInput = (() => {
//   const checkInput = (input) => {
//     input.length > 3 ? (isDecimal = true) : (isDecimal = false);
//     console.log(isDecimal);
//     console.log(input)
//     return input;
//   };
//   return checkInput;
// })();

// // v.3
// let isDecimal = false;
// const checkInput = (input) => {
//   input.length > 3 ? (isDecimal = true) : (isDecimal = false);
//   console.log(isDecimal);
//   console.log(input);
//   return input;
// };
// export const handleInput = (input) => {
//   return checkInput(input);
// };


// // v.4
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
        };
        if (char === ')') {
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
        checkForParenthesis: () => parenthesis > 0,
    };
})();
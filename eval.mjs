function isNumber(char) {
    return char >= '0' && char <= '9' || char === '.'
}

function isCloseParen(char) {
    return char === ')'
}

function isOpenParen(char) {
    return char === '('
}

function isOperator(char) {
    const operators = ['-', '+', '*', '/', '%']
    return operators.includes(char)
}

function isFn(string) {
    const calculatorFunctions = {
        "^": '**',
        "sin": 'Math.sin',
        "cos": 'Math.cos',
        "tan": 'Math.tan',
        "asin": 'Math.asin',
        "acos": 'Math.acos',
        "atan": 'Math.atan',
        "log": 'Math.log10',
        "ln": 'Math.log',
        "sqrt": 'Math.sqrt',
        "exp": 'Math.exp',
        "factorial": 'factorial',
        "pi": 'Math.PI',
        "e": 'Math.E',
        "sinh": 'Math.sinh',
        "cosh": 'Math.cosh',
        "tanh": 'Math.tanh',
        "arsinh": 'Math.asinh',
        "arcosh": 'Math.acosh',
        "artanh": 'Math.atanh',
        "deg": 'degToRad',
        "rad": 'radToDeg',
    }
    return calculatorFunctions[string];
}


const getValidInfix = (expression) => {
    return expression.replace(/%([^*\/+\-])/g, '/100*$1').replace(/%/g, '/100');
}

export const getAnswer = function(userExpression) {
    const infix = getValidInfix(userExpression)
    const expression = []

    const n = infix.length
    let i = 0;

    while (i < n) {
        const char = infix[i]
        if (char === " ") { i++; continue; }
        if (isOpenParen(char)) {
            expression.push(char)
            i++;
            continue
        }
        if (isCloseParen(char)) {
            expression.push(char)
            i++;
            continue
        }
        if (isOperator(char)) {
            expression.push(char)
            i++
            continue
        }
        if (isNumber(char)) {
            let num = ""
            while (isNumber(infix[i])) {
                num += infix[i]
                i++
            }
            expression.push(num)
            continue
        }
        let calFun = ""
        while (true) {
            const c = infix[i]
            if (c === " ") { i++; continue }
            if (isCloseParen(c) || isOpenParen(c) || isNumber(c) || isOperator(c)) break
            calFun += c
            i++
        }
        if (isFn(calFun)) {
            expression.push(isFn(calFun))
            calFun = ""
        }

    }
    return eval(expression.join(""))
}

// const Eval = (validInfix) => {
//     const postfixExpression = getAnswer(validInfix)
//     return
// }

// console.log(getAnswer('log(10)'))
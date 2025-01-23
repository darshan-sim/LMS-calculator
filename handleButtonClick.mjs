export const handleButtonInput = (() => {
    const calculatorFunctions = {
        "^": "^",
        "sin": 'sin(',
        "cos": 'cos(',
        "tan": 'tan(',
        "asin": 'asin(',
        "acos": 'acos(',
        "atan": 'atan(',
        "log": 'log10(',
        "ln": 'log(',
        "sqrt": 'sqrt(',
        "e": 'exp(',
        "!": "!",
        "pi": "3.14",
        "e": "e(",
        "x2": "^2",
        "|": "|",
        "exp": "e^(",
        "mod": "mod",
        "sqrt": "sqrt(",
        "(": "(",
        ")": ')',
        "+": "+",
        "-": "-",
        "/": "/",
        "*": "*",
        // "deg": 'degToRad',
        // "rad": 'radToDeg',
    }
    const handleClick = (displayValue, operation) => {
        // console.log({ "handleClick": displayValue += calculatorFunctions[operation] })
        if (operation === "clear") return ""
        const value = calculatorFunctions[operation]
        if (value) {
            return displayValue += value
        }
        return displayValue
    }
    return {
        processClick: handleClick
    }
})()
export const handleButtonInput = (() => {
    const calculatorFunctions = {
        "^": "^",
        "sin": 'sin(',
        "cos": 'cos(',
        "tan": 'tan(',
        "log": 'log(',
        "ln": 'ln(',
        "sqrt": 'sqrt(',
        "e": 'e',
        "!": "!",
        "pi": "pi",
        "square": "^2",
        "|": "|",
        "exp": "exp(",
        "mod": "mod",
        "(": "(",
        ")": ')',
        "+": "+",
        "-": "-",
        "/": "/",
        "*": "*",
        "1/": "1/",
        "10x": "^10",
        "%": "%"
    };
    const handleClick = (displayValue, operation) => {
        if (operation === "clear")
            return "";
        const value = calculatorFunctions[operation];
        if (value) {
            return displayValue += value;
        }
        return displayValue;
    };
    const handleNegative = (displayValue) => {
        if (displayValue.length === 0)
            return "-";
        if (displayValue.length === 1 && displayValue === "-")
            return "";
        if (displayValue[0] === '-') {
            return displayValue.slice(1);
        }
        else {
            return "-" + displayValue;
        }
    };
    return {
        processClick: handleClick,
        processNegative: handleNegative
    };
})();

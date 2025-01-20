const numbersButtons = document.querySelectorAll('[data-numbers]')
const operationsButtons = document.querySelectorAll('[data-operation]')
const display = document.getElementById('display')
console.log(operationsButtons)

const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', "/", '!', '^', '%', "=", 'Enter', 'Backspace', 'Delete', 'Escape', 'c', 'C', 'r', 'R', '(', ')', '.', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
const validInputs = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '-', '*', "/", '!', '^', '%']
const validOperations = ['+', '-', '*', '/', '!', '^', '%']

// "1-5+"
// _0123

function isValidString(value) {
    const validEndings = ['!', '%']
    let lastChar = value[value.length - 1]
    if (value.length === 0) {
        return false
    }
    if (value.length === 1) {
        return false
    }

    if (!isEncludeOperation(value)) {
        return false
    }

    if (!(validEndings.includes(lastChar) || isNumber(lastChar))) {
        return false
    }

    return true
}

function isNumber(value) {
    return !isNaN(parseFloat(value))
}

function isEncludeOperation(value) {
    for (let i = 0; i < value.length; i++) {
        if (validOperations.includes(value[i])) {
            return true
        }
    }
    return false
}

document.querySelector('.calculator').addEventListener('submit', (e) => e.preventDefault())


window.addEventListener('keydown', (e) => {
    console.log(display.value)
    if (!validKeys.includes(e.key)) {
        e.preventDefault()
    }
    if (e.key === 'Enter' || e.key === '=') {

        if (isValidString(display.value)) {
            display.value = eval(display.value)
        }
    }
})


display.addEventListener('input', (e) => {
    let value = validateInput(display.value)
    display.value = value
})

numbersButtons.forEach(button => {
    button.addEventListener('click', () => {
        display.value += button.textContent
    })
})

operationsButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        isEval = e.target.getAttribute('data-operation') === 'eval'
        if (!isEval) {
            display.value += button.getAttribute('data-operation')
            let value = validateInput(display.value)
            display.value = value
        }
    })
})

isNagative = false

function validateInput(value) {
    const operations = ['+', '-', '*', '/', '!', '^', '%']
    const lastChar = value[value.length - 1]
    const prevChar = value[value.length - 2]


    if (lastChar === '-' && prevChar === '-' && !isNagative) {
        isNagative = true
        return value.slice(0, -1)
    }
    if (lastChar === '-' && operations.includes(prevChar) && isNagative) {
        isNagative = false
        return value
    }


    if (operations.includes(lastChar) && operations.includes(prevChar)) {
        return validateInput(value.slice(0, -2) + lastChar)
    }
    return value
}
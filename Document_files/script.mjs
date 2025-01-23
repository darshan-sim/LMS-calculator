import { getAnswer } from "./eval.mjs"
import { handleInput } from './handleInput.mjs'
import { handleButtonInput } from "./handleButtonClick.mjs"


const numberBtnElements = document.querySelectorAll('[data-numbers]')
const operationBtnElements = document.querySelectorAll('[data-operation]')


const form = document.getElementById('calculator')
const display = document.getElementById('display')

window.addEventListener('keydown', (e) => {
    console.log({ "key": e.key })

    if (e.key === "Backspace") {
        display.value = display.value.slice(0, -1)
    }
    if (e.key === '.' && handleInput.processDecimalNumber()) {
        e.preventDefault()
    }
    if (e.key === '=' && e.key === 'Enter') {
        console.log({ "": e.key })
        display.value = getAnswer(display.value)
    }

})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    display.value = getAnswer(display.value)
})

operationBtnElements.forEach(btn => btn.addEventListener('click', (e) => {
    const operation = e.target.getAttribute('data-operation')
    const value = handleButtonInput.processClick(display.value, operation)
    display.value = handleInput.processInput(value)
}))

numberBtnElements.forEach(btn => btn.addEventListener('click', (e) => {
    const number = e.target.getAttribute('data-numbers')
    if (number === '.' && handleInput.processDecimalNumber()) {
        return
    }
    display.value = handleInput.processInput(display.value + number)
}))

display.addEventListener('input', (e) => {
    display.value = handleInput.processInput(display.value)
})
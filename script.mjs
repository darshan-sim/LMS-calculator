import { getAnswer } from "./eval.mjs"
import { handleInput } from './handleInput.mjs'
import { handleButtonInput } from "./handleButtonClick.mjs"
import { handleMemory } from "./memory.mjs"

const numberBtnElements = document.querySelectorAll('[data-numbers]')
const operationBtnElements = document.querySelectorAll('[data-operation]')
const memoryBtnElements = document.querySelectorAll('[data-memory]')


const form = document.getElementById('calculator')
const display = document.getElementById('display')

window.addEventListener('keydown', (e) => {
    if (e.key === '.' && handleInput.processDecimalNumber()) {
        e.preventDefault()
    }
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault()
        const result = getAnswer(display.value)
        if (result == "undefined" || !result) {
            display.value = "Invlid Expression"
        } else {
            display.value = result
        }
    }
    if (e.key === ')' && !handleInput.checkForParenthesis()) {
        e.preventDefault()
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    display.value = getAnswer(display.value)
})

operationBtnElements.forEach(btn => btn.addEventListener('click', (e) => {
    const operation = e.target.getAttribute('data-operation')
    if (operation === "eval") {
        display.value = getAnswer(display.value)
    }
    if (operation === "del") {
        display.value = display.value.slice(0, -1)
    }
    const value = handleButtonInput.processClick(display.value, operation)
    display.value = handleInput.processInput(value)
}))

memoryBtnElements.forEach(btn => btn.addEventListener('click', (e) => {
    const action = e.target.getAttribute('data-memory')
    console.log({ "action": action })

    const result = handleMemory.update(action, display.value)
    if (result) display.value = result
}))

numberBtnElements.forEach(btn => btn.addEventListener('click', (e) => {
    const number = e.target.getAttribute('data-numbers')
    if (!number) return
    if (number === 'inverse') {
        display.value = handleButtonInput.processNagetive(display.value)
        return
    }
    if (number === '.' && handleInput.processDecimalNumber()) {
        return
    }
    display.value = handleInput.processInput(display.value + number)
}))

display.addEventListener('input', (e) => {
    display.value = handleInput.processInput(display.value)
})

function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
}

document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle Dark Mode";
    toggleButton.classList.add("toggle-dark-mode");
    toggleButton.addEventListener("click", toggleDarkMode);
    document.body.appendChild(toggleButton);
});

document.addEventListener('DOMContentLoaded', () => {
    const historyButton = document.querySelector('.history-button');
    const historyDiv = document.querySelector('.history');

    historyButton.addEventListener('click', () => {
        historyDiv.classList.toggle('history-show');
    });

    historyDiv.addEventListener('click', (e) => {
        display.value = e.target.innerHTML
        historyDiv.classList.toggle('history-show')
    })
});

document.addEventListener('DOMContentLoaded', () => {
    const history = JSON.parse(localStorage.getItem('history'))
    const ul = document.querySelector(".history-list")
    if (history) {

        history.forEach(value => {
            const li = document.createElement('li')
            li.innerText = value
            ul.appendChild(li)
        })
    }
})
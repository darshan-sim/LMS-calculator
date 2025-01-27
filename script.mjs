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
        const value = getAnswer(display.value)
        display.value = value
    }
    if (e.key === ')' && !handleInput.checkForParenthesis()) {
        e.preventDefault()
    }
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const value = getAnswer(display.value)
    display.value = value
})

operationBtnElements.forEach(btn => btn.addEventListener('click', (e) => {
    const operation = e.target.getAttribute('data-operation')
    if (operation === "eval") {
        return
    }
    if (operation === "del") {
        display.value = display.value.slice(0, -1)
    }
    if (operation === ')' && !handleInput.checkForParenthesis()) {
        return
    }
    const value = handleButtonInput.processClick(display.value, operation)
    display.value = handleInput.processInput(value)
}))

memoryBtnElements.forEach(btn => btn.addEventListener('click', (e) => {
    const action = e.target.getAttribute('data-memory')
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

document.querySelector(".clear-history").addEventListener("click", () => clearHistory())

function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
}

function clearHistory() {
    localStorage.setItem("history", "")
    const historyList = document.querySelector('.history-list');
    historyList.innerText = ""
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
    const historyList = document.querySelector('.history-list');
    const display = document.querySelector('#display');

    historyButton.addEventListener('click', () => {
        historyDiv.classList.toggle('history-show');
    });

    historyList.addEventListener('click', (e) => {
        display.value = e.target.innerHTML;
        historyDiv.classList.toggle('history-show');
    });

    const history = JSON.parse(localStorage.getItem('history') || '[]');
    if (Array.isArray(history)) {
        history.forEach(value => {
            const li = document.createElement('li');
            li.innerText = value;
            historyList.appendChild(li);
        });
    }
})
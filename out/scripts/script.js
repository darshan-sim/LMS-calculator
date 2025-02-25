var _a;
import { getAnswer } from "./eval.js";
import { handleInput } from "./handleInput.js";
import { handleButtonInput } from "./handleButtonClick.js";
import { handleMemory } from "./memory.js";
const numberBtnElements = document.querySelectorAll("[data-numbers]");
const operationBtnElements = document.querySelectorAll("[data-operation]");
const memoryBtnElements = document.querySelectorAll("[data-memory]");
const form = document.getElementById("calculator");
const display = document.getElementById("display");
window.addEventListener("keydown", (e) => {
    if (e.key === "." && handleInput.processDecimalNumber()) {
        e.preventDefault();
    }
    if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        handleInput.resetParenthesis();
        const result = getAnswer(display.value);
        if (!Number.isNaN(result))
            display.value = result.toString();
        else
            display.value = "Error";
    }
    if (e.key === ")" && !handleInput.checkForParenthesis()) {
        e.preventDefault();
    }
});
form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleInput.resetParenthesis();
    display.value = getAnswer(display.value).toString();
});
operationBtnElements.forEach((btn) => btn.addEventListener("click", (e) => {
    var _a;
    const operation = (_a = e.target) === null || _a === void 0 ? void 0 : _a.getAttribute("data-operation");
    if (!operation)
        return;
    if (operation === "eval") {
        return;
    }
    if (operation === "del") {
        display.value = display.value.slice(0, -1);
    }
    if (operation === ")" && !handleInput.checkForParenthesis()) {
        return;
    }
    const value = handleButtonInput.processClick(display.value, operation);
    display.value = handleInput.processInput(value);
}));
memoryBtnElements.forEach((btn) => btn.addEventListener("click", (e) => {
    var _a;
    const action = (_a = e.target) === null || _a === void 0 ? void 0 : _a.getAttribute("data-memory");
    if (!action)
        return;
    const result = handleMemory.update(action, display.value);
    handleInput.resetParenthesis();
    if (!Number.isNaN(result))
        display.value = result.toString();
    else
        display.value = "Error";
}));
numberBtnElements.forEach((btn) => btn.addEventListener("click", (e) => {
    var _a;
    const number = (_a = e.target) === null || _a === void 0 ? void 0 : _a.getAttribute("data-numbers");
    if (!number)
        return;
    if (number === "inverse") {
        display.value = handleButtonInput.processNegative(display.value);
        return;
    }
    if (number === "." && handleInput.processDecimalNumber()) {
        return;
    }
    display.value = handleInput.processInput(display.value + number);
}));
display.addEventListener("input", (e) => {
    display.value = handleInput.processInput(display.value);
});
(_a = document
    .querySelector(".clear-history")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => clearHistory());
function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
}
function clearHistory() {
    localStorage.setItem("history", "");
    const historyList = document.querySelector(".history-list");
    historyList.innerText = "";
}
document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.createElement("button");
    toggleButton.textContent = "Toggle Mode";
    toggleButton.classList.add("toggle-dark-mode");
    toggleButton.addEventListener("click", toggleDarkMode);
    document.body.appendChild(toggleButton);
    display.focus();
});
document.addEventListener("DOMContentLoaded", () => {
    const historyButton = document.querySelector(".history-button");
    const historyDiv = document.querySelector(".history");
    const historyList = document.querySelector(".history-list");
    const display = document.querySelector("#display");
    historyButton.addEventListener("click", () => {
        historyDiv.classList.toggle("history-show");
    });
    historyList.addEventListener("click", (e) => {
        var _a;
        display.value = (_a = e.target) === null || _a === void 0 ? void 0 : _a.innerHTML;
        historyDiv.classList.toggle("history-show");
    });
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    if (Array.isArray(history)) {
        history.forEach((value) => {
            const li = document.createElement("li");
            li.innerText = value;
            historyList.appendChild(li);
        });
    }
});

import { getAnswer } from "./eval.js";
import { handleInput } from "./handleInput.js";
import { handleButtonInput } from "./handleButtonClick.js";
import { handleMemory } from "./memory.js";

const numberBtnElements = document.querySelectorAll("[data-numbers]");
const operationBtnElements = document.querySelectorAll("[data-operation]");
const memoryBtnElements = document.querySelectorAll("[data-memory]");
const conversionBtnElements = document.querySelectorAll("[data-con]");

const form = document.getElementById("calculator") as HTMLFormElement;
const display = document.getElementById("display") as HTMLInputElement;

window.addEventListener("keydown", (e) => {
	if (e.key === "." && handleInput.processDecimalNumber()) {
		e.preventDefault();
	}
	if (e.key === "Enter" || e.key === "=") {
		e.preventDefault();
		handleInput.resetParenthesis();
		const result = getAnswer(display.value);
		if (!Number.isNaN(result)) display.value = result.toString();
		else display.value = "Error";
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

operationBtnElements.forEach((btn) =>
	btn.addEventListener("click", (e) => {
		const operation = (e.target as HTMLElement)?.getAttribute("data-operation");
		if (!operation) return;
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
	})
);

memoryBtnElements.forEach((btn) =>
	btn.addEventListener("click", (e) => {
		const action = (e.target as HTMLElement)?.getAttribute("data-memory");
		if (!action) return;
		const result = handleMemory.update(action, display.value);
		handleInput.resetParenthesis();
		if (!Number.isNaN(result)) display.value = result.toString();
		else display.value = "Error";
	})
);

conversionBtnElements.forEach(btn => {
	btn.addEventListener("click", (e)=> {
		conversionBtnElements.forEach(btn => {
			btn.classList.remove("selected-conversion");
		})
		const target = (e.target as HTMLElement)
		target?.classList.add("selected-conversion")
		const action = target?.getAttribute("data-con");
		if (!action) return;
		handleButtonInput.toggleConversion(action)
	})
})

numberBtnElements.forEach((btn) =>
	btn.addEventListener("click", (e) => {
		const target = (e.target as HTMLElement)
		const number = target?.getAttribute("data-numbers");
		if (!number) return;
		if (number === "inverse") {
			display.value = handleButtonInput.processNegative(display.value);
			return;
		}
		if (number === "." && handleInput.processDecimalNumber()) {
			return;
		}
		display.value = handleInput.processInput(display.value + number);
	})
);

display.addEventListener("input", (e) => {
	display.value = handleInput.processInput(display.value);
});

document
	.querySelector(".clear-history")
	?.addEventListener("click", () => clearHistory());

function toggleDarkMode() {
	const currentTheme = document.documentElement.getAttribute("data-theme");
	const newTheme = currentTheme === "dark" ? "light" : "dark";
	document.documentElement.setAttribute("data-theme", newTheme);
}

function clearHistory() {
	localStorage.setItem("history", "");
	const historyList = document.querySelector(".history-list") as HTMLElement;
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
	const historyButton = document.querySelector(".history-button") as HTMLElement;
	const historyDiv = document.querySelector(".history") as HTMLElement;
	const historyList = document.querySelector(".history-list") as HTMLElement;
	const display = document.querySelector("#display") as HTMLInputElement;

	historyButton.addEventListener("click", () => {
		historyDiv.classList.toggle("history-show");
	});

	historyList.addEventListener("click", (e) => {
		display.value = (e.target as HTMLElement)?.innerHTML;
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

import { handleButtonInput } from "./handleButtonClick.js";

const { getIsDeg } = handleButtonInput;

function isNumber(char: string): boolean {
	return (char >= "0" && char <= "9") || char === ".";
}

function isParenthesis(char: string): boolean {
	return char === "(" || char === ")";
}

function isOperator(char: string): boolean {
	const operators = ["-", "+", "*", "/"];
	return operators.includes(char);
}

function degToRad(degrees: number): number {
	return degrees * (Math.PI / 180);
}

function radToDeg(radians: number): number {
	return radians * (180 / Math.PI);
}

const updateHistory = (value: string): void => {
	const localHistory = localStorage.getItem("history");
	let history = localHistory ? JSON.parse(localHistory) : [];
	history.unshift(value);
	// console.log({history})
	localStorage.setItem("history", JSON.stringify(history));
	const ul = document.querySelector(".history-list");
	const li = document.createElement("li");
	li.innerText = value;
	if (ul?.firstChild) {
		ul.insertBefore(li, ul.firstChild);
	} else {
		ul?.appendChild(li);
	}
};

function sin(x: number): number {
	if (getIsDeg()) x = degToRad(x);
	return Math.sin(x);
}

function cos(x: number): number {
	if (getIsDeg()) x = degToRad(x);
	const result = Math.cos(x);
	return Math.abs(result) < 1e-10 ? 0 : result;
}

function tan(x: number): number {
	if (getIsDeg()) x = degToRad(x);
	const cosValue = Math.cos(x);
	if (Math.abs(cosValue) < 1e-15) {
		throw new Error("Tangent is undefined for this value");
	}
	return Math.sin(x) / cosValue;
}

function asin(x: number): number {
	return radToDeg(Math.asin(x));
}

function acos(x: number): number {
	return radToDeg(Math.acos(x));
}

function atan(x: number): number {
	return radToDeg(Math.atan(x));
}

function cot(x: number): number {
	if (getIsDeg()) x = degToRad(x);
	const tanValue = Math.tan(x);
	if (Math.abs(tanValue) < 1e-15) {
		throw new Error("Cotangent is undefined for this value");
	}
	return 1 / tanValue;
}

function sec(x: number): number {
	if (getIsDeg()) x = degToRad(x);
	const cosValue = Math.cos(x);
	if (Math.abs(cosValue) < 1e-15) {
		throw new Error("Secant is undefined for this value");
	}
	return 1 / cosValue;
}

function csc(x: number): number {
	if (getIsDeg()) x = degToRad(x);
	const sinValue = Math.sin(x);
	if (Math.abs(sinValue) < 1e-15) {
		throw new Error("Cosecant is undefined for this value");
	}
	return 1 / sinValue;
}

type CalculatorFunctions = Record<string, string>;

function isFn(input: string): string | undefined {
	const calculatorFunctions: CalculatorFunctions = {
		sin: "sin",
		cos: "cos",
		tan: "tan",
		asin: "asin",
		acos: "acos",
		atan: "atan",
		cot: "cot",
		sec: "sec",
		csc: "csc",
		log: "Math.log10",
		ln: "Math.log",
		sqrt: "Math.sqrt",
		exp: "Math.exp",
		factorial: "factorial",
		pi: "Math.PI",
		e: "Math.E",
		mod: "%",
		floor: "Math.floor",
		ceil: "Math.ceil",
		round: "Math.round",
	};
	return calculatorFunctions[input] || undefined; 
}

const getFactorial = (number: number): number => {
	if (number <= 1) return 1;
	return number * getFactorial(number - 1);
};

const factorial = (number: number): number => {
	const num = eval("" + number);
	if (!Number.isInteger(num) || num < 0) {
		throw new Error("Factorial only applies to non-negative integers.");
	}
	return getFactorial(num);
};

const getValidInfix = (expression: string): string => {
	expression = expression
		.replace(/%(\d|\()/g, "/100 *$1")
		.replace(/%/g, "/100");
	expression = expression.replace(/\^/g, "**");
	return expression;
};

const completeExpression = (incompleteExpression: string): string => {
	let completeExpression = incompleteExpression;
	let i = 0;
	let parenthesis = 0;
	const n = incompleteExpression.length;
	while (i < n) {
		if (incompleteExpression[i] === "(") parenthesis++;
		if (incompleteExpression[i] === ")") parenthesis--;
		i++;
	}
	while (parenthesis > 0) {
		completeExpression += ")";
		parenthesis--;
	}
	return completeExpression;
};

const handleAbs = (abs: boolean): [string, boolean] => {
	return abs ? [")", false] : ["Math.abs(", true];
};

function formatResult(value: number, decimalPlaces = 10): number {
	return parseFloat(value.toFixed(decimalPlaces)); // Convert string back to number
}

export const getAnswer = function (userExpression: string): number | string {
	const validExpression = completeExpression(userExpression);
	updateHistory(validExpression);
	const tokens = getValidInfix(validExpression);
	const expression = [];
	const n = tokens.length;
	let i = 0;
	let abs = false;

	while (i < n) {
		const char = tokens[i];
		if (char === " ") {
			i++;
			continue;
		}
		if (char === "|") {
			let push;
			[push, abs] = handleAbs(abs);
			expression.push(push);
			i++;
			continue;
		}
		if (isParenthesis(char) || isOperator(char)) {
			expression.push(char);
			i++;
			continue;
		}
		if (isNumber(char)) {
			let num = "";
			while (isNumber(tokens[i])) {
				num += tokens[i];
				i++;
			}
			expression.push(Number(num));
			continue;
		}
		if (char === "!") {
			let last = expression.pop();
			const evaluatedLast = eval("" + last);
			if (!Number.isInteger(evaluatedLast) || evaluatedLast < 0) {
				throw new Error("Factorial only applies to non-negative integers.");
			}
			expression.push(factorial(evaluatedLast));
			i++;
			continue;
		}
		let calFun = "";
		while (true) {
			const c = tokens[i];
			if (c === " ") {
				i++;
				continue;
			}
			if (!c || isParenthesis(c) || isNumber(c) || isOperator(c)) break;
			calFun += c;
			i++;
		}
		if (calFun !== " " && isFn(calFun)) {
			expression.push(isFn(calFun));
			calFun = "";
		}
	}

	try {
		let answer = eval(expression.join(""));
		if (!isNaN(Number(answer))) {
			updateHistory(answer);
			return formatResult(answer);
		} else {
			updateHistory("0");
		}
	} catch (err) {
		updateHistory("0");
		return "Invalid Expression";
	}
	return "Invalid Expression";
};
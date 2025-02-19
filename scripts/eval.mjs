function isNumber(char) {
	return (char >= "0" && char <= "9") || char === ".";
}

function isCloseParen(char) {
	return char === ")";
}

function isOpenParen(char) {
	return char === "(";
}

function isOperator(char) {
	const operators = ["-", "+", "*", "/", "%"];
	return operators.includes(char);
}

function degToRadSin(degrees) {
	return Math.sin(degToRad(degrees));
}

function degToRad(degrees) {
	return degrees * (Math.PI / 180);
}

const updateHistory = (() => {
	const localHistory = localStorage.getItem("history");
	let history = localHistory ? JSON.parse(localHistory) : [];
	console.log(history);
	const update = (value) => {
		history.push(value);
		localStorage.setItem("history", JSON.stringify(history));
		const ul = document.querySelector(".history-list");
		const li = document.createElement("li");
		li.innerText = value;
		ul.appendChild(li);
	};
	return update;
})();

function isFn(string) {
	const calculatorFunctions = {
		"^": "**",
		sin: "degToRadSin",
		cos: "degToRadCos",
		tan: "Math.tanh",
		log: "Math.log10",
		ln: "Math.log",
		sqrt: "Math.sqrt",
		exp: "Math.exp",
		factorial: "factorial",
		pi: "Math.PI",
		e: "Math.E",
		deg: "degToRad",
		rad: "radToDeg",
		mod: "%"
	};
	return calculatorFunctions[string];
}

const getFactorial = (number) => {
	if (number <= 1) return number;
	return number * getFactorial(number - 1);
};

const factorial = (number) => {
	if (!eval(number)) {
		return 0;
	}
	return getFactorial(eval(number));
};

const getValidInfix = (expression) => {
	return expression.replace(/%([^*\/+\-])/g, "/100*$1").replace(/%/g, "/100");
};

const completeExpression = (incompleteExpression) => {
	let completeExpression = incompleteExpression;
	let i = 0;
	const n = incompleteExpression.length;
	let parenthesis = 0;
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

const handleAbs = (abs) => {
	return abs ? [")", false] : ["Math.abs(", true];
};

export const getAnswer = function (userExpression) {
	const validExpression = completeExpression(display.value);
	updateHistory(validExpression);
	const infix = getValidInfix(validExpression);
	const expression = [];

	const n = infix.length;
	let i = 0;
	let abs = false;

	while (i < n) {
		const char = infix[i];
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
		if (isOpenParen(char)) {
			expression.push(char);
			i++;
			continue;
		}
		if (isCloseParen(char)) {
			expression.push(char);
			i++;
			continue;
		}
		if (isOperator(char)) {
			expression.push(char);
			i++;
			continue;
		}
		if (isNumber(char)) {
			let num = "";
			while (isNumber(infix[i])) {
				num += infix[i];
				i++;
			}
			expression.push(Number(num));
			continue;
		}
		if (char === "!") {
			expression.push(factorial(expression.pop()));
			i++;
			continue;
		}
		let calFun = "";
		while (true) {
			const c = infix[i];
			if (c === " ") {
				i++;
				continue;
			}
			if (
				!c ||
				isCloseParen(c) ||
				isOpenParen(c) ||
				isNumber(c) ||
				isOperator(c)
			)
				break;
			calFun += c;
			i++;
		}
		if (calFun !== " " && isFn(calFun)) {
			if (
				["-", "+", "^", "*", "/", "(", ")"].includes(
					expression[expression.length - 1]
				)
			) {
				expression.push(isFn(calFun));
			} else if (expression.length > 0 && calFun !== "^") {
				expression.push("*");
				expression.push(isFn(calFun));
			} else {
				expression.push(isFn(calFun));
			}
			calFun = "";
		}
	}

	try {
		let answer = eval(expression.join(""));
		if (!isNaN(Number(answer))) {
			updateHistory(answer);
			return answer;
		} else {
			updateHistory("0");
		}
	} catch (err) {
		updateHistory("0");
		return "0";
	}
	return "Error";
};

function isNumber(char) {
	return (char >= "0" && char <= "9") || char === ".";
}

function isParenthesis(char) {
	return char === "(" || char === ")";
}

function isOperator(char) {
	const operators = ["-", "+", "*", "/"];
	return operators.includes(char);
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
	return expression.replace(/(\d+)%/g, (_, num) => num / 100);
};

const completeExpression = (incompleteExpression) => {
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

const handleAbs = (abs) => {
	return abs ? [")", false] : ["Math.abs(", true];
};

export const getAnswer = function (userExpression) {
	const validExpression = completeExpression(userExpression);
	//update history with complete expression
	updateHistory(validExpression);

	const tokens = getValidInfix(validExpression);
	console.log({ tokens });
	const expression = [];
	const n = tokens.length;
	let i = 0;
	let abs = false;

	while (i < n) {
		//handle spaces, abs and parenthesis first
		const char = tokens[i];
		if (char === " ") {
			i++;
			continue;
		}
		//handle absolute value based on abs flag
		if (char === "|") {
			let push;
			[push, abs] = handleAbs(abs);
			expression.push(push);
			i++;
			continue;
		}
		if (isParenthesis(char)) {
			expression.push(char);
			i++;
			continue;
		}
		//
		if (isOperator(char)) {
			expression.push(char);
			i++;
			continue;
		}
		//handle operators
		if (isNumber(char)) {
			let num = "";
			while (isNumber(tokens[i])) {
				num += tokens[i];
				i++;
			}
			expression.push(Number(num));
			continue;
		}
		//handle factorial before evaluating
		if (char === "!") {
			expression.push(factorial(expression.pop()));
			i++;
			continue;
		}
		//handle functions
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
		/**
		 * push the correct function to the expression
		 * only the valid functions are pushed
		 * safety for eval function
		 */
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
		console.log(tokens[i]);
	}
	/**
	 * evaluate the expression
	 * if the answer is a number update the history
	 * else update the history with 0
	 */
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
		return "Error";
	}
	return "Error";
};

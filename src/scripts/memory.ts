import { getAnswer } from "./eval.js";

type Operations = Record<string, (value:string) => number|string>;

export const handleMemory = (() => {
	let memory = 0;
	const operations: Operations = {
		"M+": (value:string) => {
			const answer = getAnswer(value);
			if (answer !== undefined && typeof answer === "number") memory += answer;
			return answer;
		},
		"M-": (value:string) => {
			const answer = getAnswer(value);
			if (answer !== undefined && typeof answer === "number") memory -= answer;
			return answer;
		},
		MC: ():number => {
			memory = 0;
			return memory;
		},
		MR: ():number => memory || 0,
		MS: (value:string) => {
			value = value ? value : "0";
			console.log(value);
			const answer = getAnswer(value);
			console.log("ans", answer);
			if (answer !== undefined && typeof answer === "number") memory = answer;
			return answer;
		}
	};
	const updateMemory = (operation:string, value:string) => {
		return operations[operation](value);
	};
	return {
		update: updateMemory
	};
})();

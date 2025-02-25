import { getAnswer } from "./eval.js";
export const handleMemory = (() => {
    let memory = 0;
    const operations = {
        "M+": (value) => {
            const answer = getAnswer(value);
            if (answer !== undefined && typeof answer === "number")
                memory += answer;
            return answer;
        },
        "M-": (value) => {
            const answer = getAnswer(value);
            if (answer !== undefined && typeof answer === "number")
                memory -= answer;
            return answer;
        },
        MC: () => {
            memory = 0;
            return memory;
        },
        MR: () => memory || 0,
        MS: (value) => {
            value = value ? value : "0";
            console.log(value);
            const answer = getAnswer(value);
            console.log("ans", answer);
            if (answer !== undefined && typeof answer === "number")
                memory = answer;
            return answer;
        }
    };
    const updateMemory = (operation, value) => {
        return operations[operation](value);
    };
    return {
        update: updateMemory
    };
})();

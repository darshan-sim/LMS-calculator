import { getAnswer } from "./eval.mjs";

export const handleMemory = (() => {
    let memory = 0

    const operations = {
        "M+": (value) => {
            const answer = getAnswer(value)
            if (answer) memory += answer
            return answer
        },
        "M-": (value) => {
            const answer = getAnswer(value)
            if (answer) memory -= answer
            return answer
        },
        "MC": () => {
            memory = 0
        },
        "MR": () => memory,
        "MS": (value) => {
            const answer = getAnswer(value)
            if (answer) memory = answer
        },
    }
    const updateMemory = (operation, value) => {
        return operations[operation](value)
    }
    return {
        update: updateMemory,
    }
})();
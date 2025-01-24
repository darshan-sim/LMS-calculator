import { getAnswer } from "./eval.mjs";

export const handleMemory = (() => {
    let memory = 0

    const operations = {
        "M+": (value) => {
            const answer = getAnswer(value)
            if (answer) memory += answer
            return answer
            console.log({ "memory": memory })
        },
        "M-": (value) => {
            const answer = getAnswer(value)
            if (answer) memory -= answer
            return answer
            console.log({ "memory": memory })
        },
        "MC": () => {
            memory = 0
            console.log({ "memory": memory })
        },
        "MR": () => memory,
        "MS": (value) => {
            const answer = getAnswer(value)
            if (answer) memory += answer
            console.log({ "memory": memory })
        },
    }
    const updateMemory = (operation, value) => {
        return operations[operation](value)
    }
    return {
        update: updateMemory,
    }
})();
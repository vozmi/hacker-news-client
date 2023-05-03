/**
 * Returns a list of arithmetic progressions.
 * @param from Start number
 * @param to Stop number (not included in result)
 * @param step Optional. An integer number specifying the progression.
 * @returns array of numbers
 */
export const range = (from: number, to: number, step = 1): number[] => {
    const result = [];

    if (from >= to) {
        throw new Error("'from' number cannot be more than 'to'!");
    }

    for (let i = from; i < to; i += step) {
        result.push(i);
    }

    return result;
};

import { range } from "../range";

test("has correct length", () => {
    expect(range(1, 100).length).toBe(99);
});

test("returns a sequence from 1 to 5", () => {
    expect(range(1, 6)).toStrictEqual([1, 2, 3, 4, 5]);
});

test("throwns an error when 'from' is more than 'to", () => {
    expect(() => range(6, 1)).toThrowError(
        new Error("'from' number cannot be more than 'to'!")
    );
});

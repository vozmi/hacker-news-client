const observe = jest.fn();
const unobserve = jest.fn();
const disconnect = jest.fn();
const takeRecords = jest.fn();

const MockIntersectionObserver = jest.fn(() => ({
    observe,
    unobserve,
    disconnect,
    takeRecords,
    root: null,
    rootMargin: "0px 0px 0px 0px",
    thresholds: [0, 0.25, 0.5, 0.75, 1],
}));

Object.defineProperty(window, "IntersectionObserver", {
    writable: true,
    value: MockIntersectionObserver,
});

export {
    MockIntersectionObserver,
    observe,
    unobserve,
    disconnect,
    takeRecords,
};

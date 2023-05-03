export type MockIntersectionObserverResult = {
    instance: jest.Mock<any>;
    mocks: {
        observe: jest.Mock<any>;
        unobserve: jest.Mock<any>;
        disconnect: jest.Mock<any>;
        takeRecords: jest.Mock<any>;
    };
    clearMocks: () => void;
};

export const mockIntersectionObserver = (): MockIntersectionObserverResult => {
    const observe = jest.fn();
    const unobserve = jest.fn();
    const disconnect = jest.fn();
    const takeRecords = jest.fn();

    const MockIntersectionObserver = jest.fn().mockImplementation(() => ({
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

    return {
        instance: MockIntersectionObserver,
        mocks: {
            observe,
            unobserve,
            disconnect,
            takeRecords,
        },
        clearMocks: () => {
            MockIntersectionObserver.mockClear();
            observe.mockClear();
            unobserve.mockClear();
            disconnect.mockClear();
            takeRecords.mockClear();
        },
    };
};

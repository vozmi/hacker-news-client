import { render } from "@testing-library/react";
import { createSharedIntersectionObserver } from "../sharedIntersectionObserver";
import {
    MockIntersectionObserverResult,
    mockIntersectionObserver,
} from "@/mocks/IntersectionObserver";

let MockIntersectionObserver: MockIntersectionObserverResult;
beforeAll(() => {
    MockIntersectionObserver = mockIntersectionObserver();
});
afterEach(() => MockIntersectionObserver.clearMocks());

const renderTargetElement = () => {
    render(
        <div id="root" style={{ height: 500 }}>
            <div id="target" style={{ background: "green", marginTop: 1000 }}>
                Target Component
            </div>
        </div>
    );

    return document.getElementById("target") as HTMLDivElement;
};

test("observe method should call IntersectionObserver.observe", async () => {
    const targetEl = renderTargetElement();

    const sharedObserver = createSharedIntersectionObserver({
        root: document.getElementById("root"),
        rootMargin: "0px 0px 300px 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    const intersectionListener = jest.fn();

    expect(MockIntersectionObserver.mocks.observe).toHaveBeenCalledTimes(0);

    sharedObserver.observe(targetEl, intersectionListener);

    expect(MockIntersectionObserver.mocks.observe).toHaveBeenCalledTimes(1);
    expect(MockIntersectionObserver.mocks.observe).toHaveBeenCalledWith(
        targetEl
    );
});

test("dispose method should call IntersectionObserver.unobserve", async () => {
    const targetEl = renderTargetElement();

    const sharedObserver = createSharedIntersectionObserver({
        root: document.getElementById("root"),
        rootMargin: "0px 0px 300px 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
    });

    const intersectionListener = jest.fn();

    expect(MockIntersectionObserver.mocks.unobserve).toHaveBeenCalledTimes(0);

    const dispose = sharedObserver.observe(targetEl, intersectionListener);
    dispose();

    expect(MockIntersectionObserver.mocks.unobserve).toHaveBeenCalledTimes(1);
});

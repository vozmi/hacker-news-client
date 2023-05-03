import MockIntersectionObserver, {
    observe,
} from "@/mocks/IntersectionObserver";
import { render } from "@testing-library/react";
import { observeRootIntersection } from "../sharedIntersectionObserver";

/* #region Mock values */
const mockDomRectReadOnly: DOMRectReadOnly = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    top: 0,
    right: 100,
    bottom: 100,
    left: 0,
    toJSON: jest.fn(),
};

const mockIntersectionEntry: IntersectionObserverEntry = {
    isIntersecting: true,
    boundingClientRect: mockDomRectReadOnly,
    intersectionRatio: 0.25,
    intersectionRect: mockDomRectReadOnly,
    rootBounds: mockDomRectReadOnly,
    target: document.createElement("div"),
    time: 0,
};
/* #endregion */

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

test("Callback passed to observeRootIntersection should be called", async () => {
    const targetEl = renderTargetElement();

    const intersectionListener = jest.fn();

    observeRootIntersection(targetEl, intersectionListener);

    invokeIntersection();
    expect(intersectionListener).toHaveBeenCalledTimes(1);

    invokeIntersection();
    expect(intersectionListener).toHaveBeenCalledTimes(2);
});

test("Dispose from observeRootIntersection should remove callback from listeners", async () => {
    const targetEl = renderTargetElement();

    const intersectionListener = jest.fn();

    const disposeObserver = observeRootIntersection(
        targetEl,
        intersectionListener
    );

    const invokeIntersection = () => {
        const [callback] = MockIntersectionObserver.mock.calls[0] as Array<
            (entries: IntersectionObserverEntry[]) => any
        >;

        callback([
            {
                ...mockIntersectionEntry,
                isIntersecting: true,
                target: targetEl,
            },
        ]);
    };

    invokeIntersection();
    expect(intersectionListener).toHaveBeenCalledTimes(1);

    invokeIntersection();
    expect(intersectionListener).toHaveBeenCalledTimes(2);

    disposeObserver();

    invokeIntersection();
    expect(intersectionListener).toHaveBeenCalledTimes(2);
});

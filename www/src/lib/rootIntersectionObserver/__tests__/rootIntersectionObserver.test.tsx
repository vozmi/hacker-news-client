import {
    MockIntersectionObserver,
    observe,
} from "@/mocks/IntersectionObserver";
import { render } from "@testing-library/react";
import { observeRootIntersection } from "../rootIntersectionObserver";

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

test("fires callback on interscetion", async () => {
    const targetEl = renderTargetElement();
    expect(targetEl.style.background).toBe("green");

    const intersectionListener = (entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
            targetEl.style.background = "red";
        }
    };

    observeRootIntersection(targetEl, intersectionListener);
    expect(observe).toHaveBeenCalledTimes(1);

    const [entryCallback] = MockIntersectionObserver.mock.calls[0] as Array<
        (entries: IntersectionObserverEntry[]) => any
    >;
    entryCallback([
        {
            ...mockIntersectionEntry,
            isIntersecting: true,
            target: targetEl,
        },
    ]);

    expect(targetEl.style.background).toBe("red");
});

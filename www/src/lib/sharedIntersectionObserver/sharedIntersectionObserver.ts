import { v4 as uuidv4 } from "uuid";

type ObservableCallback = (entry: IntersectionObserverEntry) => void;

type Dispose = () => void;
type Observe = (el: Element, callback: ObservableCallback) => Dispose;

export type SharedIntersectionObserver = {
    observe: Observe;
    dispose: Dispose;
};

export const createSharedIntersectionObserver = (
    options: IntersectionObserverInit
): SharedIntersectionObserver => {
    const observables = new Map<string, ObservableCallback>();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const entryId = entry.target.getAttribute("data-intersection-id");
            if (!entryId) {
                return;
            }

            const callback = observables.get(entryId);
            if (typeof callback === "function") {
                callback(entry);
            }
        });
    }, options);

    const observe: Observe = (el, callback) => {
        const intersectionId = uuidv4();

        el.setAttribute("data-intersection-id", intersectionId);

        observables.set(intersectionId, callback);

        observer.observe(el);

        return function dispose() {
            observables.delete(intersectionId);

            observer.unobserve(el);

            el.removeAttribute("data-intersection-id");
        };
    };

    return {
        observe,
        dispose: () => {
            observables.clear();
        },
    };
};

import { v4 as uuidv4 } from "uuid";

type IntersectionObservable = (entry: IntersectionObserverEntry) => void;
type Disposer = () => void;

export const createSharedIntersectionObserver = (
    options: IntersectionObserverInit
) => {
    const observables = new Map<string, IntersectionObservable>();

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

    const observe = (
        el: Element,
        callback: IntersectionObservable
    ): Disposer => {
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

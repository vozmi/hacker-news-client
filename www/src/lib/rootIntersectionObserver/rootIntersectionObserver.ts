import { v4 as uuidv4 } from "uuid";

type EntryCallback = (entry: IntersectionObserverEntry) => void;

const observers = new Map<string, EntryCallback>();

const rootIntersectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            const entryId = entry.target.getAttribute("data-intersection-id");
            if (!entryId) {
                return;
            }

            const callback = observers.get(entryId);
            if (typeof callback === "function") {
                callback(entry);
            }
        });
    },
    {
        root: document.getElementById("root"),
        rootMargin: "0px 0px 300px 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
    }
);

export const observeRootIntersection = (
    el: Element,
    callback: EntryCallback
) => {
    const intersectionId = uuidv4();

    el.setAttribute("data-intersection-id", intersectionId);

    observers.set(intersectionId, callback);

    rootIntersectionObserver.observe(el);

    return function dispose() {
        observers.delete(intersectionId);

        rootIntersectionObserver.unobserve(el);

        el.removeAttribute("data-intersection-id");
    };
};

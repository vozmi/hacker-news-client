import { useServices } from "@/contexts";
import { Dispose } from "@/lib/sharedIntersectionObserver";
import { useEffect, useState } from "react";

type IntersectionListener = (
    /**
     * IntersectionObserverEntry
     */
    entry: IntersectionObserverEntry,

    /**
     * Method to dispose current observer
     */
    dispose: () => void
) => void;

/**
 * Hook to use rootIntersectionObserver with React.Ref
 * @param listener listener callback
 * @param options hook options to configure observer
 * @returns
 */
export const useRootIntersection = (
    ref: React.RefObject<any>,
    listener: IntersectionListener
) => {
    const { rootIntersectionObserver } = useServices();
    const [dispose, setDispose] = useState<Dispose>(() => undefined);

    useEffect(() => {
        if (ref.current !== null) {
            // Observe element when ref exists
            const disposeObserver = rootIntersectionObserver.observe(
                ref.current,
                async (entry) => {
                    // Notify listener
                    listener(entry, disposeObserver);
                }
            );

            setDispose(disposeObserver);
        }
    }, [ref]);

    return dispose;
};

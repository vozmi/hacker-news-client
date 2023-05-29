import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Layout.module.scss";
import { Header } from "./components";

export const Layout: React.FC<{
    children?: string | JSX.Element | JSX.Element[];
}> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHeaderBlured, setHeaderBlured] = useState(false);

    const scrollEvListener = useCallback(() => {
        if (
            !isHeaderBlured &&
            ref.current?.scrollTop &&
            ref.current.scrollTop > 64
        ) {
            setHeaderBlured(true);
        } else {
            setHeaderBlured(false);
        }
    }, [setHeaderBlured]);

    useEffect(() => {
        ref.current?.addEventListener("scroll", scrollEvListener);

        return () => {
            ref.current?.removeEventListener("scroll", scrollEvListener);
        };
    }, [ref]);

    return (
        <div ref={ref} className={styles.container}>
            <Header blured={isHeaderBlured} />
            <main id="layout-content" className={styles.content}>
                {children}
            </main>
        </div>
    );
};

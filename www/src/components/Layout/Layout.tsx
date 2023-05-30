import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Layout.module.scss";
import { Header, Navigation } from "./components";

export const Layout: React.FC<{
    children?: string | JSX.Element | JSX.Element[];
}> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);

    const scrollToTop = () =>
        ref.current?.scrollTo({ top: 0, behavior: "smooth" });

    const scrollEvListener = useCallback(() => {
        if (
            !isScrolled &&
            ref.current?.scrollTop &&
            ref.current.scrollTop > 64
        ) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    }, [setIsScrolled]);

    useEffect(() => {
        ref.current?.addEventListener("scroll", scrollEvListener);

        return () => {
            ref.current?.removeEventListener("scroll", scrollEvListener);
        };
    }, [ref]);

    return (
        <div ref={ref} className={styles.container}>
            <Header blured={isScrolled} />
            <main id="layout-content" className={styles.content}>
                {children}
            </main>
            <Navigation visible={isScrolled} onClick={scrollToTop} />
        </div>
    );
};

import { Header } from "./components";
import styles from "./Layout.module.scss";

export const Layout: React.FC<{
    children?: string | JSX.Element | JSX.Element[];
}> = ({ children }) => {
    return (
        <div className={styles.container}>
            <Header />
            <main>{children}</main>
        </div>
    );
};

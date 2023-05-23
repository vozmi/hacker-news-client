import { WhatshotTwoTone } from "@mui/icons-material";
import styles from "./Header.module.scss";

export const Header = () => {
    return (
        <header className={styles.container}>
            <h2>
                <WhatshotTwoTone color="warning" />
                <span>Hacker News</span>
            </h2>
        </header>
    );
};

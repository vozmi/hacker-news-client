import { WhatshotTwoTone } from "@mui/icons-material";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();
    const goHome = () => {
        navigate("/");
    };

    return (
        <header className={styles.container}>
            <h2 aria-label="logo" onClick={goHome}>
                <WhatshotTwoTone color="warning" />
                <span>Hacker News</span>
            </h2>
        </header>
    );
};

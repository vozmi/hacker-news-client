import { Bolt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

export const Header = () => {
    const navigate = useNavigate();
    const goHome = () => {
        navigate("/");
    };

    return (
        <header className={styles.container}>
            <h2 aria-label="logo" onClick={goHome}>
                <Bolt color="warning" />
                <span>Hacker News</span>
            </h2>
        </header>
    );
};

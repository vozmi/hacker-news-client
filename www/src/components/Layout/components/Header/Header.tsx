import { Bolt } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

type Props = {
    blured?: boolean;
};

export const Header: React.FC<Props> = ({ blured = false }: Props) => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    };

    return (
        <header
            className={styles.container + (blured ? ` ${styles.blured}` : "")}
        >
            <h2 aria-label="logo" onClick={goHome}>
                <Bolt color="warning" />
                <span>Hacker News</span>
            </h2>
        </header>
    );
};

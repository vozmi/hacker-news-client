import { Navigation as NavigationIcon } from "@mui/icons-material";
import { Fab } from "@mui/material";
import styles from "./Navigation.module.scss";

type Props = {
    visible?: boolean;
    onClick?: () => void;
};

export const Navigation: React.FC<Props> = ({
    visible = true,
    onClick = () => null,
}) => {
    if (!visible) {
        return null;
    }

    return (
        <Fab
            color="primary"
            aria-label="Back to top"
            onClick={onClick}
            className={styles.container}
        >
            <NavigationIcon />
        </Fab>
    );
};

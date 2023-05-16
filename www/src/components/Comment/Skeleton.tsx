import { Skeleton as MuiSkeleton } from "@mui/material";
import styles from "./Comment.module.scss";

export const Skeleton = () => {
    return (
        <div className={styles.container} aria-label="comment">
            <MuiSkeleton className={styles.header} variant="rounded" />
            <MuiSkeleton
                className={styles.content}
                style={{ height: "3rem" }}
                variant="rounded"
            />
        </div>
    );
};

import { Story } from "@/models";
import { Skeleton, Typography } from "@mui/material";
import styles from "./Header.module.scss";

type Props = {
    /**
     * Story data
     */
    data?: Story;
};

export const Header: React.FC<Props> = ({ data }) => {
    if (!data) {
        return (
            <Skeleton
                variant="rectangular"
                sx={{ width: "100%", height: "3rem" }}
            />
        );
    }

    const clickHandler = () => {
        return window.open(data.url, "_blank")?.focus();
    };

    const storyUrl = new URL(data.url);

    return (
        <div aria-label="story" className={styles.container}>
            <Typography
                aria-label="story-title"
                variant="h4"
                sx={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={clickHandler}
            >
                {data.title} ({storyUrl.host})
            </Typography>
            <Typography>
                {data.score} points | by {data.author} | {data.createDate} |{" "}
                {data.allCommentsCount} comments
            </Typography>
        </div>
    );
};

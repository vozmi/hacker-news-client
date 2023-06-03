import { Story } from "@/models";
import { Work } from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./StoryCard.module.scss";

type Props = {
    data: Story;
};

export const StoryCard: React.FC<Props> = ({ data }) => {
    const navigate = useNavigate();

    const goToStoryPage = () => {
        navigate(`/${data.isJob ? "jobs" : "stories"}/${data.id}`);
    };

    return (
        <Card
            aria-label="story"
            sx={{ maxWidth: 500, width: "100%", cursor: "pointer" }}
            onClick={goToStoryPage}
        >
            <CardContent className={styles.content}>
                {data.isJob && (
                    <div className={styles.icon}>
                        <Work fontSize="small" color="primary" />
                    </div>
                )}
                <div className={styles.content__text}>
                    <h4>{data.title}</h4>
                    <p>
                        {data.score} points | by {data.author} |{" "}
                        {data.createDate} | {data.allCommentsCount} comments
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

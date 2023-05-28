import { useParams } from "react-router-dom";
import { CommentTree, Header } from "./components";
import { useEffect, useState } from "react";
import { Story } from "@/models";
import { useServices } from "@/contexts";
import { Skeleton, Typography } from "@mui/material";
import styles from "./PageStory.module.scss";

export const PageStory = () => {
    const { id } = useParams();
    const [story, setStory] = useState<Story>();
    const { apiAdapter } = useServices();

    useEffect(() => {
        if (id) {
            apiAdapter.getStory(+id).then((data) => setStory(data));
        }
    }, []);

    return (
        <div className={styles.container}>
            <Header data={story} />
            <hr />
            <Typography
                sx={{
                    width: "100%",
                    fontSize: "18px",
                    color: "rgb(75, 75, 75)",
                    marginBottom: "10px",
                    textAlign: "center",
                }}
            >
                COMMENTS
            </Typography>
            <div>
                {story?.childCommentIds &&
                    story.childCommentIds.map((id) => (
                        <CommentTree id={id} key={id} />
                    ))}
            </div>
        </div>
    );
};

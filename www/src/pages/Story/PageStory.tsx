import { useParams } from "react-router-dom";
import { CommentTree, Header } from "./components";
import { useEffect, useState } from "react";
import { Story } from "@/models";
import { useServices } from "@/contexts";
import { Skeleton } from "@mui/material";

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
        <div>
            {story ? (
                <Header data={story} />
            ) : (
                <Skeleton
                    variant="rectangular"
                    sx={{ width: "100%", height: "3rem" }}
                />
            )}
            <hr />
            {story?.childCommentIds &&
                story.childCommentIds.map((id) => (
                    <CommentTree id={id} key={id} />
                ))}
        </div>
    );
};

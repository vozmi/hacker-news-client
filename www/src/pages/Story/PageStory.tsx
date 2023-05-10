import { useParams } from "react-router-dom";
import { CommentTree } from "./components";
import { useEffect, useState } from "react";
import { Story } from "@/models";
import { useServices } from "@/contexts";

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
            {story?.childCommentIds &&
                story.childCommentIds.map((id) => (
                    <CommentTree id={id} key={id} />
                ))}
        </div>
    );
};

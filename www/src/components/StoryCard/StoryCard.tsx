import { Story } from "@/models";
import { Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
    data: Story;
};

export const StoryCard: React.FC<Props> = ({ data }) => {
    const navigate = useNavigate();

    const goToStoryPage = () => {
        navigate(`/stories/${data.id}`);
    };

    return (
        <Card
            aria-label="story"
            sx={{ maxWidth: 500, width: "100%", cursor: "pointer" }}
            onClick={goToStoryPage}
        >
            <CardContent>
                <Typography sx={{ fontSize: 14 }}>{data.title}</Typography>
                <Typography sx={{ fontSize: 10 }}>
                    {data.score} points | by {data.author} | {data.createDate} |{" "}
                    {data.allCommentsCount} comments
                </Typography>
            </CardContent>
        </Card>
    );
};

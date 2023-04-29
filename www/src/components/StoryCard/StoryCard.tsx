import { Story } from "@/models";
import { Card, CardContent, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

type Props = {
    data: Story;
};

export const StoryCard: React.FC<Props> = ({ data }) => {
    const navigate = useNavigate();

    const goToStoryPage = () => {
        navigate(`/news/${data.id}`);
    };

    return (
        <Card
            data-testid="storycard"
            sx={{ maxWidth: 500, cursor: "pointer" }}
            onClick={goToStoryPage}
        >
            <CardContent>
                <Typography sx={{ fontSize: 14 }}>{data.title}</Typography>
                <Typography sx={{ fontSize: 10 }}>
                    {data.score} points | by {data.author} | {data.createDate} |{" "}
                    {data.allCommentsCount} comments
                </Typography>
            </CardContent>
            <CardContent>
                <Link to={`/news/${data.id}`}>Read more</Link>
            </CardContent>
        </Card>
    );
};

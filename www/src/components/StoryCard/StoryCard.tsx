import { Story } from "@/models";
import { Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

type Props = {
    data: Story;
};

export const StoryCard: React.FC<Props> = ({ data }) => {
    return (
        <div data-testid="storycard">
            <Card sx={{ maxWidth: 500 }}>
                <CardContent>
                    <Typography
                        sx={{ fontSize: 14 }}
                        data-testid="storycard__title"
                    >
                        {data.title}
                    </Typography>
                    <Typography
                        sx={{ fontSize: 10 }}
                        data-testid="storycard__author"
                    >
                        {data.score} points | by {data.author} |{" "}
                        {data.createDate} | {data.allCommentsCount} comments
                    </Typography>
                </CardContent>
                <CardContent>
                    <Link to={`/news/${data.id}`}>Read more</Link>
                </CardContent>
            </Card>
        </div>
    );
};

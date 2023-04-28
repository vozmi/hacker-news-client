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
                        sx={{ fontSize: 14 }}
                        data-testid="storycard__author"
                    >
                        {data.author}
                    </Typography>
                    <Typography
                        sx={{ fontSize: 14 }}
                        data-testid="storycard__commentsCount"
                    >
                        {data.allCommentsCount}
                    </Typography>
                    <Typography
                        sx={{ fontSize: 14 }}
                        data-testid="storycard__createDate"
                    >
                        {data.createDate}
                    </Typography>
                    <Typography
                        sx={{ fontSize: 14 }}
                        data-testid="storycard__score"
                    >
                        {data.score}
                    </Typography>
                </CardContent>
                <CardContent>
                    <Link to={`/news/${data.id}`}>Read more</Link>
                </CardContent>
            </Card>
        </div>
    );
};

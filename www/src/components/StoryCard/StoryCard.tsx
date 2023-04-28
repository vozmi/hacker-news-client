import { Story } from "@/models";
import { Card, CardContent } from "@mui/material";

type Props = {
    data: Story;
};

export const StoryCard: React.FC<Props> = ({ data }) => {
    return (
        <div data-testid="storycard">
            <Card sx={{ maxWidth: 500 }}>
                <CardContent data-testid="storycard__title">
                    {data.title}
                </CardContent>
                <CardContent data-testid="storycard__author">
                    {data.author}
                </CardContent>
                <CardContent data-testid="storycard__url">
                    {data.url}
                </CardContent>
                <CardContent data-testid="storycard__commentsCount">
                    {data.allCommentsCount}
                </CardContent>
                <CardContent data-testid="storycard__createDate">
                    {data.createDate}
                </CardContent>
                <CardContent data-testid="storycard__score">
                    {data.score}
                </CardContent>
            </Card>
        </div>
    );
};

import { Story } from "@/models";
import { Typography } from "@mui/material";

type Props = {
    /**
     * Story data
     */
    data: Story;
};

export const Header: React.FC<Props> = ({ data }) => {
    const clickHandler = () => {
        return window.open(data.url, "_blank")?.focus();
    };

    const storyUrl = new URL(data.url);

    return (
        <div
            aria-label="story"
            style={{
                width: "100%",
            }}
        >
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

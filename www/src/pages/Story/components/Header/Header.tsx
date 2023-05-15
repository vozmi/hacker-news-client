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
                variant="h5"
                sx={{ cursor: "pointer" }}
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

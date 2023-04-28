import { Story } from "@/models";

type Props = {
    data: Story;
};

export const StoryCard: React.FC<Props> = ({ data }) => {
    return <div data-testid="storycard">{data.title}</div>;
};

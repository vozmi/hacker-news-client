import { Skeleton } from "./Skeleton";
import { StoryCard as OriginStoryCard } from "./StoryCard";

export type StoryCardProps = typeof OriginStoryCard & {
    Skeleton: typeof Skeleton;
};

const StoryCard = OriginStoryCard as StoryCardProps;

StoryCard.Skeleton = Skeleton;

export { StoryCard };

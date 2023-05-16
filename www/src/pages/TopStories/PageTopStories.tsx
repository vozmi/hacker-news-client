import { StoryCard } from "@/components";
import { range } from "@/lib/range";
import { Stack } from "@mui/material";
import styles from "./PageTopStories.module.scss";
import { StoryCardContainer } from "./components";
import { useTopStories } from "./hooks";

export const PAGE_TOP_STORIES_ID = "page-top-stories";

export const PageTopStories = () => {
    const { isLoading, topStoriesIds } = useTopStories();

    return (
        <main id={PAGE_TOP_STORIES_ID} className={styles.content}>
            <Stack spacing={2}>
                {isLoading ? (
                    <>
                        {range(0, 200).map((i) => (
                            <StoryCard.Skeleton key={i} />
                        ))}
                    </>
                ) : (
                    <>
                        {topStoriesIds.map((storyId) => (
                            <StoryCardContainer key={storyId} id={storyId} />
                        ))}
                    </>
                )}
            </Stack>
        </main>
    );
};

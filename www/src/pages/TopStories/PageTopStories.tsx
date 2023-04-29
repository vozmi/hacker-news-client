import { StoryCard } from "@/components";
import { range } from "@/lib/range";
import styled from "@emotion/styled";
import { Stack } from "@mui/material";
import { StoryCardContainer } from "./components";
import { useTopStories } from "./hooks";

const PageContent = styled.main`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    padding-top: 2rem;
`;

export const PAGE_TOP_STORIES_ID = "page-top-stories";

export const PageTopStories = () => {
    const { isLoading, topStoriesIds } = useTopStories();

    return (
        <PageContent id={PAGE_TOP_STORIES_ID}>
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
        </PageContent>
    );
};

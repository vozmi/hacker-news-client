import { StoryCard } from "@/components";
import { useServices } from "@/contexts";
import { useEffect, useState } from "react";
import { StoryCardContainer } from "./components";
import { Stack } from "@mui/material";
import { range } from "@/lib/range";

export const PageTopStories = () => {
    const [isLoading, setLoading] = useState(false);
    const [topStoriesIds, setTopStoriesIds] = useState<number[]>([]);
    const { apiAdapter } = useServices();

    const getData = async () => {
        setLoading(true);

        const topStoriesData = await apiAdapter.getTopStories();

        // show top 200 stories
        setTopStoriesIds(topStoriesData.slice(0, 200));

        setLoading(false);
    };

    useEffect(() => {
        getData();

        return () => {
            setTopStoriesIds([]);
        };
    }, []);

    return (
        <div>
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
        </div>
    );
};

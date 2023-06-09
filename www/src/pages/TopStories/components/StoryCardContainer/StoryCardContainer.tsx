import { StoryCard } from "@/components";
import { useServices } from "@/contexts";
import { useRootIntersection } from "@/hooks/useRootIntersection";
import { Story } from "@/models";
import { useEffect, useRef, useState } from "react";

type Props = {
    id: number;
};

export const StoryCardContainer: React.FC<Props> = ({ id }) => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState<Story | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { apiAdapter } = useServices();

    const getData = async () => {
        setLoading(true);
        try {
            const story = await apiAdapter.getStory(id);
            setData(story);
        } catch (error: any) {
            console.error("Error while loading StoryCard data:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useRootIntersection(containerRef, async (entry, dispose) => {
        if (entry.intersectionRatio > 0 && !data && !isLoading) {
            await getData();
            dispose();
        }
    });

    useEffect(() => {
        return function cleanup() {
            setData(null);
            setLoading(false);
        };
    }, []);

    return (
        <div ref={containerRef}>
            {isLoading || data === null ? (
                <StoryCard.Skeleton sx={{ width: "500px" }} />
            ) : (
                <StoryCard data={data} />
            )}
        </div>
    );
};

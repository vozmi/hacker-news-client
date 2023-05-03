import { StoryCard } from "@/components";
import { useServices } from "@/contexts";
import { Story } from "@/models";
import { useEffect, useRef, useState } from "react";

type Props = {
    id: number;
};

export const StoryCardContainer: React.FC<Props> = ({ id }) => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState<Story | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const { apiAdapter, rootIntersectionObserver } = useServices();

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

    useEffect(() => {
        if (containerRef.current !== null) {
            // Observe current component
            const disposeObserver = rootIntersectionObserver.observe(
                containerRef.current,
                async (entry) => {
                    if (entry.intersectionRatio > 0 && !data && !isLoading) {
                        // Load data when intersects
                        await getData();

                        // Remove observer after loading data
                        disposeObserver();
                    }
                }
            );
        }
    }, [containerRef]);

    useEffect(() => {
        return function cleanup() {
            setData(null);
            setLoading(false);
        };
    }, []);

    return (
        <div ref={containerRef} style={{ width: 500 }}>
            {isLoading || data === null ? (
                <StoryCard.Skeleton />
            ) : (
                <StoryCard data={data} />
            )}
        </div>
    );
};

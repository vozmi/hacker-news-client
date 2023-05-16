import { useServices } from "@/contexts";
import { useState, useEffect } from "react";

export const useTopStories = () => {
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

    return {
        isLoading,
        topStoriesIds,
    };
};

import { StoryCard } from "@/components";
import { useServices } from "@/contexts";
import { Story } from "@/models";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";

type Props = {
    id: number;
};

export const StoryCardContainer: React.FC<Props> = ({ id }) => {
    const [isLoading, setLoading] = useState(false);
    const [data, setData] = useState<Story | null>(null);

    const { apiAdapter } = useServices();

    const getData = async () => {
        setLoading(true);

        const story = await apiAdapter.getStory(id);
        setData(story);

        setLoading(false);
    };

    useEffect(() => {
        getData();

        return () => {
            setData(null);
        };
    }, []);

    if (isLoading || !data) {
        return (
            <Skeleton
                aria-label="skeleton"
                aria-busy="true"
                aria-live="polite"
                variant="rounded"
                sx={{ maxWidth: 500, width: "100%", height: 76 }}
            />
        );
    }

    return <StoryCard data={data} />;
};

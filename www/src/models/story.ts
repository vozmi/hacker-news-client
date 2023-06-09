import { type Story as HNStory } from "@/api";

export type Story = {
    id: number;
    isJob: boolean;
    title: string;
    content?: string | null;
    url: string;
    author: string;
    score: number;
    allCommentsCount: number;
    childCommentIds: number[];
    createDate: string;
};

export const mapFromHNStory = (hnStory: HNStory): Story => {
    return {
        id: hnStory.id,
        isJob: hnStory.type === "job",
        content: hnStory.type === "job" ? hnStory.text : null,
        author: hnStory.by,
        title: hnStory.title,
        url: hnStory.url,
        score: hnStory.score,
        createDate:
            new Date(hnStory.time * 1000).toLocaleDateString() +
            " at " +
            new Date(hnStory.time * 1000).toLocaleTimeString(),
        allCommentsCount: hnStory.descendants,
        childCommentIds: hnStory.kids,
    };
};

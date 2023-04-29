import { type Story as HNStory } from "@/api";

export type Story = {
    id: number;
    title: string;
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
        author: hnStory.by,
        title: hnStory.title,
        url: hnStory.url,
        score: hnStory.score,
        createDate:
            new Date(hnStory.time).toLocaleDateString() +
            " at " +
            new Date(hnStory.time).toLocaleTimeString(),
        allCommentsCount: hnStory.descendants,
        childCommentIds: hnStory.kids,
    };
};

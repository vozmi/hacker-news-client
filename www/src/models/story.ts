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

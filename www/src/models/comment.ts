import { type Comment as HNComment } from "@/api";

export type Comment = {
    id: number;
    parentId: number;
    text: string;
    author: string;
    createDate: string;
    childrenIds: number[];
};

export const mapFromHNComment = (comment: HNComment): Comment => {
    return {
        id: comment.id,
        author: comment.by,
        text: comment.text,
        parentId: comment.parent,
        createDate: new Date(comment.time).toLocaleDateString(),
        childrenIds: comment.kids,
    };
};

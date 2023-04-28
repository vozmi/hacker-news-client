export type Comment = {
    id: number;
    parentId: number;
    text: string;
    author: string;
    createDate: string;
    childrenIds: number[];
};

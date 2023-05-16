import { Comment as OriginComment } from "./Comment";
import { Skeleton } from "./Skeleton";

export type CommentProps = typeof OriginComment & {
    Skeleton: typeof Skeleton;
};

const Comment = OriginComment as CommentProps;

Comment.Skeleton = Skeleton;

export { Comment };

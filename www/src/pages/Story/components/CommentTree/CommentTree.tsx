import { Comment } from "@/components";
import { useServices } from "@/contexts";
import { useRootIntersection } from "@/hooks/useRootIntersection";
import { type Comment as IComment } from "@/models";
import { Collapse } from "@mui/material";
import { useReducer, useRef, useState } from "react";
import styles from "./CommentTree.module.scss";

type Props = {
    id: number;
    defaultOpen?: boolean;
};

export const CommentTree: React.FC<Props> = ({ id, defaultOpen = false }) => {
    const [isLoading, setLoading] = useState(false);
    const [isOpen, toggleOpen] = useReducer((x) => !x, defaultOpen);
    const [data, setData] = useState<IComment>();
    const skeletonRef = useRef<HTMLDivElement>(null);

    const { apiAdapter } = useServices();

    const hasChildren = data?.childrenIds && data.childrenIds.length > 0;

    const getData = async () => {
        setLoading(true);
        try {
            const commentData = await apiAdapter.getComment(id);
            setData(commentData);
        } finally {
            setLoading(false);
        }
    };

    useRootIntersection(skeletonRef, async (entry, dispose) => {
        if (entry.intersectionRatio > 0 && !data && !isLoading) {
            await getData();
            dispose();
        }
    });

    if (!data) {
        return (
            <div ref={skeletonRef}>
                <Comment.Skeleton />
            </div>
        );
    }

    const RootComment = () => (
        <div className={styles.commentContainer}>
            <Comment data={data} style={{ marginBottom: 5 }} />
            {hasChildren && (
                <button className={styles.expandBtn} onClick={toggleOpen}>
                    {isOpen
                        ? "Hide replies"
                        : data.childrenIds.length +
                          ` repl${data.childrenIds.length === 1 ? "y" : "ies"}`}
                </button>
            )}
        </div>
    );

    return (
        <div>
            <RootComment />

            {hasChildren && (
                <Collapse in={isOpen} className={styles.childCommentList}>
                    {data.childrenIds.map((childId) => (
                        <CommentTree key={childId} id={childId} />
                    ))}
                </Collapse>
            )}
        </div>
    );
};

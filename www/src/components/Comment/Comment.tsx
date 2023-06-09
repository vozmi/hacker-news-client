import { type Comment as IComment } from "@/models";
import { CSSProperties } from "react";
import styles from "./Comment.module.scss";
import DOMPurify from "dompurify";

type Props = {
    data: IComment;
    style?: CSSProperties;
};

export const Comment: React.FC<Props> = ({
    data: { author, createDate, text },
    style,
}) => {
    return (
        <div style={style} className={styles.container} aria-label="comment">
            <h5 className={styles.header}>{`${author} | ${createDate}`}</h5>
            <p
                className={styles.content}
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(text) }}
            />
        </div>
    );
};

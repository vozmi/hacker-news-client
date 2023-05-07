import { type Comment as IComment } from "@/models";
import styled from "@emotion/styled";
import { CSSProperties } from "react";

type Props = {
    data: IComment;
    style?: CSSProperties;
};

const Container = styled.div`
    margin-bottom: 10px;
`;

const Header = styled.h5`
    margin: 0 0 0.5rem 0;
`;

const Content = styled.p`
    margin: 0;
`;

export const Comment: React.FC<Props> = ({
    data: { author, createDate, text },
    style,
}) => {
    return (
        <Container style={style} aria-label="comment">
            <Header>{`${author} | ${createDate}`}</Header>
            <Content>{text}</Content>
        </Container>
    );
};

import { renderWithRouter } from "@/lib/testUtils";
import { Comment } from "../Comment";
import { screen } from "@testing-library/dom";

const getByContainedText = (text: string) =>
    screen.getByText(new RegExp(`.*${text}.*`, "i"));

test("contains author, createDate and text", () => {
    const data = {
        author: "testUser",
        childrenIds: [1, 2, 3],
        id: 12,
        createDate: "2012-01-01",
        parentId: 21,
        text: "Hello world!",
    };
    renderWithRouter(<Comment data={data} />);

    expect(getByContainedText(data.author)).toBeInTheDocument();

    expect(getByContainedText(data.createDate)).toBeInTheDocument();
    expect(getByContainedText(data.text)).toBeInTheDocument();
});

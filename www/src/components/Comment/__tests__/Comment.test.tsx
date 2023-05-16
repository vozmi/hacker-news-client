import { renderWithRouter } from "@/lib/testUtils";
import { Comment } from "../Comment";
import { screen } from "@testing-library/dom";

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

    expect(screen.getByText(new RegExp(data.author, "i"))).toBeInTheDocument();

    expect(screen.getByText(data.createDate)).toBeInTheDocument();
    expect(screen.getByText(data.text)).toBeInTheDocument();
});

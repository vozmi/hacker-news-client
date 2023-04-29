import { renderWithRouter } from "@/lib/testUtils";
import { Story } from "@/models";
import { screen } from "@testing-library/react";
import { StoryCard } from "../StoryCard";
import { Route, Routes } from "react-router-dom";

const story: Story = {
    id: 48765231,
    url: "http://www.getdropbox.com/u/2/screencast.html",
    title: "My YC app: Dropbox - Throw away your USB drive",
    score: 111,
    author: "dhouston",
    createDate: "1/14/1970",
    allCommentsCount: 71,
    childCommentIds: [32456782, 32456782, 32456782],
};

const TEST_IDS = {
    STORYCARD: "storycard",
    TITLE: "storycard__title",
    AUTHOR: "storycard__author",
    COMMENTS_COUNT: "storycard__commentsCount",
    SCORE: "storycard__score",
    CREATE_DATE: "storycard__createDate",
};

describe("StoryCard", () => {
    it("Should show main variables (title, author, commentsCount, score, createDate)", async () => {
        renderWithRouter(<StoryCard data={story} />);

        await screen.findByTestId(TEST_IDS.STORYCARD);

        expect(screen.getByTestId(TEST_IDS.TITLE)).toHaveTextContent(
            story.title
        );

        expect(screen.getByTestId(TEST_IDS.AUTHOR)).toHaveTextContent(
            story.author
        );

        expect(screen.getByTestId(TEST_IDS.COMMENTS_COUNT)).toHaveTextContent(
            story.allCommentsCount.toString()
        );

        expect(screen.getByTestId(TEST_IDS.SCORE)).toHaveTextContent(
            story.score.toString()
        );

        expect(screen.getByTestId(TEST_IDS.CREATE_DATE)).toHaveTextContent(
            story.createDate
        );
    });

    it("Should contain link to story page", async () => {
        const { user } = renderWithRouter(
            <Routes>
                <Route path="/news">
                    <Route index element={<StoryCard data={story} />} />
                    <Route path=":id" element={<div>Story page</div>} />
                </Route>
            </Routes>,
            {
                route: "/news",
            }
        );
        const linkText = /read more/i;

        const linkEl = await screen.findByText(linkText);

        await user.click(linkEl);

        expect(screen.getByText(/story page/i)).toBeInTheDocument();
    });
});

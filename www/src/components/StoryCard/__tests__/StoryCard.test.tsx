import { renderWithRouter } from "@/lib/testUtils";
import { mapFromHNStory } from "@/models";
import { screen } from "@testing-library/react";
import { Route, Routes } from "react-router-dom";
import { StoryCard } from "../StoryCard";

const hnStory = {
    by: "dhouston",
    descendants: 71,
    id: 8863,
    kids: [
        8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067,
        8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998,
        8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876,
    ],
    score: 111,
    time: 1175714200,
    title: "My YC app: Dropbox - Throw away your USB drive",
    type: "story",
    url: "http://www.getdropbox.com/u/2/screencast.html",
};
const story = mapFromHNStory(hnStory);

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

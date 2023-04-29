import { render, screen } from "@testing-library/react";
import { StoryCard } from "../StoryCard";
import { ApiAdapter } from "@/services";
import { ApiClient } from "@/api";
import { MOCK_SERVER_URL, MOCK_STORY_ID } from "@/mocks";
import { Story } from "@/models";

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

describe("StoryCard", () => {
    it("Should show main variables (title, author, commentsCount, score, createDate)", async () => {
        render(<StoryCard data={story} />);

        await screen.findByTestId("storycard");

        expect(screen.getByTestId("storycard__title")).toHaveTextContent(
            story.title
        );

        expect(screen.getByTestId("storycard__author")).toHaveTextContent(
            story.author
        );

        expect(
            screen.getByTestId("storycard__commentsCount")
        ).toHaveTextContent(story.allCommentsCount.toString());

        expect(screen.getByTestId("storycard__score")).toHaveTextContent(
            story.score.toString()
        );

        expect(screen.getByTestId("storycard__createDate")).toHaveTextContent(
            story.createDate
        );
    });
});

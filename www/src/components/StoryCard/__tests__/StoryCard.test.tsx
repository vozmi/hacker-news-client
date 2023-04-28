import { render, screen } from "@testing-library/react";
import { StoryCard } from "../StoryCard";
import { ApiAdapter } from "@/services";
import { ApiClient } from "@/api";
import { MOCK_SERVER_URL, MOCK_STORY_ID } from "@/mocks";

describe("StoryCard", () => {
    it("Renders correctly", async () => {
        const apiAdapter = new ApiAdapter(
            new ApiClient({ base: MOCK_SERVER_URL })
        );

        const data = await apiAdapter.getStory(MOCK_STORY_ID);

        render(<StoryCard data={data} />);

        await screen.findByTestId("storycard");

        expect(screen.getByTestId("storycard")).toHaveTextContent(data.title);
    });
});

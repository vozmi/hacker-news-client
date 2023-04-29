import { ApiClient } from "@/api";
import { ServicesContext } from "@/contexts";
import { renderWithRouter } from "@/lib/testUtils";
import { MOCK_SERVER_URL, MOCK_STORY_ID } from "@/lib/constants";
import { ApiAdapter } from "@/services";
import { screen, waitFor } from "@testing-library/react";
import { StoryCardContainer } from "../StoryCardContainer";

const mockApiAdapter = new ApiAdapter(new ApiClient({ base: MOCK_SERVER_URL }));

const renderWithAdapter = (storyId: number) => {
    return renderWithRouter(
        <ServicesContext.Provider value={{ apiAdapter: mockApiAdapter }}>
            <StoryCardContainer id={storyId} />
        </ServicesContext.Provider>
    );
};

test("Should show Skeleton during loading", async () => {
    renderWithAdapter(MOCK_STORY_ID);

    expect(screen.getByLabelText("skeleton")).toBeInTheDocument();

    await waitFor(() => {
        expect(screen.queryByLabelText("skeleton")).not.toBeInTheDocument();
    });

    expect(screen.getByLabelText("story")).toBeInTheDocument();
});

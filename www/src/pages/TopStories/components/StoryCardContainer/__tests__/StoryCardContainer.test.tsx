import { ApiClient } from "@/api";
import { ServicesContext } from "@/contexts";
import { renderWithRouter } from "@/lib/testUtils";
import { MOCK_SERVER_URL, MOCK_STORY_ID } from "@/constants";
import { ApiAdapter } from "@/services";
import { screen, waitFor } from "@testing-library/react";
import { StoryCardContainer } from "../StoryCardContainer";

const mockApiAdapter = new ApiAdapter(new ApiClient({ base: MOCK_SERVER_URL }));

const mockDomRect: DOMRectReadOnly = {
    x: 100,
    y: 100,
    top: 100,
    right: 100,
    bottom: 100,
    left: 100,
    width: 100,
    height: 100,
    toJSON: jest.fn(),
};

const renderWithAdapter = (storyId: number) => {
    return renderWithRouter(
        <ServicesContext.Provider
            value={{
                apiAdapter: mockApiAdapter,
                rootIntersectionObserver: {
                    observe: (el, callback) => {
                        callback({
                            target: el,
                            isIntersecting: true,
                            intersectionRatio: 1,
                            boundingClientRect: mockDomRect,
                            intersectionRect: mockDomRect,
                            rootBounds: mockDomRect,
                            time: 1,
                        });

                        return () => {
                            // dispose
                        };
                    },
                    dispose: jest.fn(),
                },
            }}
        >
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

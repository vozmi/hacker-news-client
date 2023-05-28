import { screen } from "@testing-library/react";
import { renderWithRouter } from "@/lib/testUtils";
import { Header } from "../Header";
import { createMockStory } from "@/mocks";
import { mapFromHNStory } from "@/models";

test("Should open data.url in new tab when title element is clicked", async () => {
    // Align
    window.open = jest.fn();
    const mockStory = mapFromHNStory(createMockStory());
    const { user } = renderWithRouter(<Header data={mockStory} />);
    const titleEl = screen.getByLabelText("story-title");

    // Act
    await user.click(titleEl);

    // Assert
    expect(window.open).toBeCalledTimes(1);
    expect(window.open).toBeCalledWith(mockStory.url, "_blank");
});

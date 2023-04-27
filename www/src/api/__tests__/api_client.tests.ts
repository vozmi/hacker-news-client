import { ApiClient } from "../api_client";

describe("topStories", () => {
    const api = new ApiClient({
        base: "https://hacker-news.firebaseio.com/v0",
    });

    it("Should be instance of Array", async () => {
        const topStories = await api.getTopStories();
        expect(topStories).toBeInstanceOf(Array);
    });

    it("Should have length 500", async () => {
        const topStories = await api.getTopStories();
        expect(topStories.length).toBe(500);
    });

    it("Should be array of Story objects", async () => {
        const topStories = await api.getTopStories();
        const storyKeys = [
            "id",
            "by",
            "descendants",
            "kids",
            "score",
            "time",
            "title",
            "type",
            "url",
        ];

        expect(Object.keys(topStories[0]).sort()).toEqual(storyKeys.sort());
    });
});

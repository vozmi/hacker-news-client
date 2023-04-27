import { MOCK_STORY_ID } from "@/mocks/hackernews_handlers";
import { ApiClient } from "../api_client";

describe("getTopStories", () => {
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

describe("getStory", () => {
    const api = new ApiClient({
        base: "https://hacker-news.firebaseio.com/v0",
    });

    it("Should be with given id", async () => {
        const story = await api.getStory(MOCK_STORY_ID);

        expect(story.id).toBe(MOCK_STORY_ID);
    });

    it("Should contain Story keys", async () => {
        const story = await api.getStory(MOCK_STORY_ID);

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

        expect(Object.keys(story).sort()).toEqual(storyKeys.sort());
    });
});

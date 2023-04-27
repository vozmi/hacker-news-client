import { ApiClient } from "../api_client";
import { hackernewsServer } from "@/mocks/hackernews_server";

beforeAll(() => hackernewsServer.listen());

afterEach(() => hackernewsServer.resetHandlers());

afterAll(() => hackernewsServer.close());

describe("topStories", () => {
    const api = new ApiClient({ base: "https://hacker-news.firebaseio.com/v0" });

    it("getsTopStories", async () => {
        const topStories = await api.getTopStories();

        expect(topStories).toBeInstanceOf(Array);

        expect(topStories.length).toBe(500);

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

import { ApiClient } from "@/api";
import { MOCK_COMMENT_ID, MOCK_STORY_ID } from "@/mocks";
import { ApiAdapter } from "../api_adapter";

describe("getTopStories", () => {
    const api = new ApiClient({
        base: "https://hacker-news.firebaseio.com/v0",
    });
    const adapter = new ApiAdapter(api);

    it("Should be instance of Array", async () => {
        const topStories = await adapter.getTopStories();
        expect(topStories).toBeInstanceOf(Array);
    });

    it("Should have length 500", async () => {
        const topStories = await adapter.getTopStories();
        expect(topStories.length).toBe(500);
    });

    it("Should be array of Story objects", async () => {
        const topStories = await adapter.getTopStories();
        const storyKeys = [
            "id",
            "title",
            "url",
            "author",
            "score",
            "allCommentsCount",
            "childCommentIds",
            "createDate",
        ];

        expect(Object.keys(topStories[0]).sort()).toEqual(storyKeys.sort());
    });
});

describe("getStory", () => {
    const api = new ApiClient({
        base: "https://hacker-news.firebaseio.com/v0",
    });
    const adapter = new ApiAdapter(api);

    it("Should be with given id", async () => {
        const story = await adapter.getStory(MOCK_STORY_ID);

        expect(story.id).toBe(MOCK_STORY_ID);
    });

    it("Should contain Story keys", async () => {
        const story = await adapter.getStory(MOCK_STORY_ID);

        const storyKeys = [
            "id",
            "title",
            "url",
            "author",
            "score",
            "allCommentsCount",
            "childCommentIds",
            "createDate",
        ];

        expect(Object.keys(story).sort()).toEqual(storyKeys.sort());
    });
});

describe("getComment", () => {
    const api = new ApiClient({
        base: "https://hacker-news.firebaseio.com/v0",
    });
    const adapter = new ApiAdapter(api);

    it("Should be with given id", async () => {
        const comment = await adapter.getComment(MOCK_COMMENT_ID);

        expect(comment.id).toBe(MOCK_COMMENT_ID);
    });

    it("Should contain Comment keys", async () => {
        const comment = await adapter.getComment(MOCK_COMMENT_ID);

        const storyKeys = [
            "id",
            "parentId",
            "text",
            "author",
            "createDate",
            "childrenIds",
        ];

        expect(Object.keys(comment).sort()).toEqual(storyKeys.sort());
    });
});

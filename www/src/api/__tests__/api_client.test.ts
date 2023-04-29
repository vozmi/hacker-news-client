import { MOCK_COMMENT_ID, MOCK_STORY_ID } from "@/mocks";
import { ApiClient } from "../api_client";

const api = new ApiClient({
    base: "https://hacker-news.firebaseio.com/v0",
});

/* #region getTopStories */
test("topStories should be instance of Array", async () => {
    const topStories = await api.getTopStories();
    expect(topStories).toBeInstanceOf(Array);
});

test("topStories should have length 500", async () => {
    const topStories = await api.getTopStories();
    expect(topStories.length).toBe(500);
});

test("topStories should be array of numbers", async () => {
    const topStories = await api.getTopStories();

    expect(typeof topStories[0]).toBe("number");
});
/* #endregion */

/* #region getStory */
test("Story should be with correct id", async () => {
    const story = await api.getStory(MOCK_STORY_ID);

    expect(story.id).toBe(MOCK_STORY_ID);
});

test("Story should contain required keys", async () => {
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
/* #endregion */

/* #region getComment */
test("Comment should be with correct id", async () => {
    const comment = await api.getComment(MOCK_COMMENT_ID);

    expect(comment.id).toBe(MOCK_COMMENT_ID);
});

test("Comment should contain required keys", async () => {
    const comment = await api.getComment(MOCK_COMMENT_ID);

    const storyKeys = ["id", "by", "kids", "parent", "text", "time", "type"];

    expect(Object.keys(comment).sort()).toEqual(storyKeys.sort());
});
/* #endregion */

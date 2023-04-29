import { ApiClient } from "@/api";
import { MOCK_COMMENT_ID, MOCK_STORY_ID } from "@/mocks";
import { ApiAdapter } from "../api_adapter";

const api = new ApiClient({
    base: "https://hacker-news.firebaseio.com/v0",
});
const adapter = new ApiAdapter(api);

/* #region getTopStories */
test("topStories should be instance of Array", async () => {
    const topStories = await adapter.getTopStories();
    expect(topStories).toBeInstanceOf(Array);
});

test("topStories should have length 500", async () => {
    const topStories = await adapter.getTopStories();
    expect(topStories.length).toBe(500);
});

test("topStories should be array of numbers", async () => {
    const topStories = await adapter.getTopStories();
    expect(typeof topStories[0]).toBe("number");
});
/* #endregion */

/* #region getStory */
test("Story should be with correct id", async () => {
    const story = await adapter.getStory(MOCK_STORY_ID);

    expect(story.id).toBe(MOCK_STORY_ID);
});

test("Story should contain required keys", async () => {
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
/* #endregion */

/* #region getComment */
test("Comment should be with correct id", async () => {
    const comment = await adapter.getComment(MOCK_COMMENT_ID);

    expect(comment.id).toBe(MOCK_COMMENT_ID);
});

test("Comment contain required keys", async () => {
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
/* #endregion */

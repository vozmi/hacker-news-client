import { Story, Comment } from "@/models";
import { IApiAdapter } from "./api_adapter.types";
import { IApiClient } from "@/api";

/**
 * HackerNews API client Adapter
 */
export class ApiAdapter implements IApiAdapter {
    private _apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this._apiClient = apiClient;
    }

    /**
     * Get top 500 stories
     * @returns array of 500 Story objects
     */
    async getTopStories(): Promise<Story[]> {
        const stories = await this._apiClient.getTopStories();
        return stories.map((x) => ({
            id: x.id,
            author: x.by,
            title: x.title,
            url: x.url,
            score: x.score,
            createDate: new Date(x.time).toLocaleDateString(),
            commentsIds: x.kids,
        }));
    }

    /**
     * Get story by id
     * @param id identifier
     * @returns Story
     */
    async getStory(id: number): Promise<Story> {
        const story = await this._apiClient.getStory(id);
        const { url, title, score } = story;

        return {
            id,
            url,
            title,
            score,
            author: story.by,
            createDate: new Date(story.time).toLocaleDateString(),
            commentsIds: story.kids,
        };
    }

    /**
     * Get comment by id
     * @param id identifier
     * @returns Comment
     */
    async getComment(id: number): Promise<Comment> {
        const comment = await this._apiClient.getComment(id);

        return {
            id: comment.id,
            author: comment.by,
            text: comment.text,
            parentId: comment.parent,
            createDate: new Date(comment.time).toLocaleDateString(),
            childrenIds: comment.kids,
        };
    }
}

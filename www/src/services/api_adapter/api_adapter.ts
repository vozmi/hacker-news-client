import { Story, Comment, mapFromHNStory, mapFromHNComment } from "@/models";
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
    async getTopStories(): Promise<number[]> {
        return await this._apiClient.getTopStories();
    }

    /**
     * Get story by id
     * @param id identifier
     * @returns Story
     */
    async getStory(id: number): Promise<Story> {
        const story = await this._apiClient.getStory(id);

        return mapFromHNStory(story);
    }

    /**
     * Get comment by id
     * @param id identifier
     * @returns Comment
     */
    async getComment(id: number): Promise<Comment> {
        const comment = await this._apiClient.getComment(id);

        return mapFromHNComment(comment);
    }
}

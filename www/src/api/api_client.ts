import {
    Comment,
    IApiClient,
    IApiClientConfiguration,
    Item,
    Story,
} from "./api_client.types";

/**
 * HackerNews API client
 */
export class ApiClient implements IApiClient {
    base: string;

    constructor(config: IApiClientConfiguration) {
        this.base = config.base;
    }

    /**
     * Get top 500 stories
     * @returns array of 500 Story objects
     */
    async getTopStories(): Promise<Story[]> {
        const response = await fetch(`${this.base}/topstories.json`);
        const data = await response.json();
        return data;
    }

    /**
     * Get item by id
     * @param id item identifier
     * @returns Item
     */
    private async _getItem(id: number): Promise<Item> {
        const response = await fetch(`${this.base}/item/${id}.json`);
        const data = await response.json();
        return data;
    }

    /**
     * Get story by id
     * @param id identifier
     * @returns Story
     */
    async getStory(id: number): Promise<Story> {
        const item = await this._getItem(id);

        if (item.type !== "story") {
            throw new Error("Api Error: story with given id not found!");
        }

        return item as Story;
    }

    /**
     * Get comment by id
     * @param id identifier
     * @returns Comment
     */
    async getComment(id: number): Promise<Comment> {
        const item = await this._getItem(id);

        if (item.type !== "comment") {
            throw new Error("Api Error: comment with given id not found!");
        }

        return item as Comment;
    }
}

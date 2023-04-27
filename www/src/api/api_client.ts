import { Comment, IApiClient, IApiClientConfiguration, Item, Story } from "./api_client.types";

export class ApiClient implements IApiClient {
    base: string;

    constructor(config: IApiClientConfiguration) {
        this.base = config.base;
    }

    async getTopStories() {
        const response = await fetch(`${this.base}/topstories.json`);
        const data = await response.json();
        return data;        
    }

    private async _getItem(id: number) {
        const response = await fetch(`${this.base}/item/${id}.json`);
        const data = await response.json();
        return data as Item;
    }

    async getStory(id: number): Promise<Story> {
        const item = await this._getItem(id);

        if (item.type !== "story") {
            throw new Error("Api Error: story with given id not found!");
        }

        return item as Story;
    }

    async getComment(id: number): Promise<Comment> {
        const item = await this._getItem(id);

        if (item.type !== "comment") {
            throw new Error("Api Error: comment with given id not found!");
        }

        return item as Comment;
    }
    
}

import { Comment, IApiClient, IApiClientConfiguration, Story } from "./api_client.types";

export class ApiClient implements IApiClient {
    base: string;

    constructor(config: IApiClientConfiguration) {
        this.base = config.base + "/v0";
    }

    async getTopStories() {
        const response = await fetch(`${this.base}/topstories.json`);
        const data = await response.json();
        return data;        
    }

    private async getItem(id: number) {
        const response = await fetch(`${this.base}/item/${id}.json`);
        const data = await response.json();
        return data;
    }

    getStory(id: number): Promise<Story> {
        throw new Error("Method not implemented.");
    }

    getComment(id: number): Promise<Comment> {
        throw new Error("Method not implemented.");
    }
    
}

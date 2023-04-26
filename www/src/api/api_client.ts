import { Comment, IApiClient, Story } from "./api_client.types";

export class ApiClient implements IApiClient {
    getTopStories(): Promise<Story[]> {
        throw new Error("Method not implemented.");
    }
    getStory(id: number): Promise<Story> {
        throw new Error("Method not implemented.");
    }
    getComment(id: number): Promise<Comment> {
        throw new Error("Method not implemented.");
    }
    
}

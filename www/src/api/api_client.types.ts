type ItemType = "story" | "comment";
export interface Item {
    id: number;
    type: ItemType;
}

export interface Story {
    id: number;
    by: string;
    descendants: number;
    kids: number[];
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
}

export interface Comment {
    by: string;
    id: number;
    kids: number[];
    parent: number;
    text: string;
    time: number;
    type: string;
}

export interface IApiClientConfiguration {
    base: string;
}

/**
 * HackerNews API Client
 */
export interface IApiClient {
    /**
     * Returns last 500 stories
     */
    getTopStories(): Promise<Story[]>;

    /**
     * Returns story by given id
     * @param id story id
     */
    getStory(id: number): Promise<Story>;

    /**
     * Returns comment by given id
     * @param id comment id
     */
    getComment(id: number): Promise<Comment>;
}

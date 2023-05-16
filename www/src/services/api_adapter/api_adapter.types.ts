import { Story, Comment } from "@/models";

/**
 * HackerNews API client adapter
 */
export interface IApiAdapter {
    /**
     * Returns last 500 stories
     */
    getTopStories(): Promise<number[]>;

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

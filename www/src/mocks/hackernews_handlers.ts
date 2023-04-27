import { Comment, Story } from "@/api";
import { rest } from "msw";

const SERVER_URL = "https://hacker-news.firebaseio.com/v0";
export const MOCK_STORY_ID = 48765231;
export const MOCK_COMMENT_ID = 32456782;

const createMockStory = (id?: number): Story => {
    return {
        id: id ?? 8863,
        by: "dhouston",
        descendants: 71,
        kids: [8952, 9224, 8917],
        score: 111,
        time: 1175714200,
        title: "My YC app: Dropbox - Throw away your USB drive",
        type: "story",
        url: "http://www.getdropbox.com/u/2/screencast.html",
    };
};

const createMockComment = (id?: number): Comment => {
    return {
        id: id ?? 2921983,
        by: "norvig",
        kids: [2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141],
        parent: 2921506,
        text: "Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
        time: 1314211127,
        type: "comment",
    };
};

export const hackernewsHandlers = [
    rest.get(`${SERVER_URL}/topstories.json`, (req, res, ctx) => {
        const data = [];

        for (const _ of Array(500).keys()) {
            data.push(createMockStory());
        }

        return res(ctx.json(data));
    }),
    rest.get(`${SERVER_URL}/item/${MOCK_STORY_ID}.json`, (req, res, ctx) => {
        return res(ctx.json(createMockStory(MOCK_STORY_ID)));
    }),
    rest.get(`${SERVER_URL}/item/${MOCK_COMMENT_ID}.json`, (req, res, ctx) => {
        return res(ctx.json(createMockComment(MOCK_COMMENT_ID)));
    }),
];

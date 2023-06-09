import { Comment, Story } from "@/api";
import { MOCK_COMMENT_ID, MOCK_SERVER_URL, MOCK_STORY_ID } from "@/constants";
import { range } from "@/lib/range";
import { rest } from "msw";

export const createMockStory = (id?: number): Story => {
    return {
        id: id ?? MOCK_STORY_ID,
        by: "dhouston",
        descendants: 71,
        kids: [MOCK_COMMENT_ID, MOCK_COMMENT_ID, MOCK_COMMENT_ID],
        score: 111,
        time: 1175714200,
        title: "My YC app: Dropbox - Throw away your USB drive",
        type: "story",
        url: "http://www.getdropbox.com/u/2/screencast.html",
    };
};

export const createMockComment = (id?: number): Comment => {
    return {
        id: id ?? MOCK_COMMENT_ID,
        by: "norvig",
        kids: [
            MOCK_COMMENT_ID,
            MOCK_COMMENT_ID,
            MOCK_COMMENT_ID,
            MOCK_COMMENT_ID,
            MOCK_COMMENT_ID,
        ],
        parent: MOCK_STORY_ID,
        text: "Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
        time: 1314211127,
        type: "comment",
    };
};

export const hackernewsHandlers = [
    rest.get(`${MOCK_SERVER_URL}/topstories.json`, (req, res, ctx) => {
        const data: number[] = [];

        range(0, 500).forEach(() => {
            data.push(MOCK_STORY_ID);
        });

        return res(ctx.json(data));
    }),
    rest.get(
        `${MOCK_SERVER_URL}/item/${MOCK_STORY_ID}.json`,
        (req, res, ctx) => {
            return res(ctx.json(createMockStory(MOCK_STORY_ID)));
        }
    ),
    rest.get(
        `${MOCK_SERVER_URL}/item/${MOCK_COMMENT_ID}.json`,
        (req, res, ctx) => {
            return res(ctx.json(createMockComment(MOCK_COMMENT_ID)));
        }
    ),
];

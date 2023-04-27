import { Story } from "@/api";
import { rest } from "msw";

const SERVER_URL = "https://hacker-news.firebaseio.com/v0";

const createMockStory = (id?: number): Story => {
    return {
        id: id ?? 8863,
        by: "dhouston",
        descendants: 71,
        kids: [ 8952, 9224, 8917 ],
        score: 111,
        time: 1175714200,
        title: "My YC app: Dropbox - Throw away your USB drive",
        type: "story",
        url: "http://www.getdropbox.com/u/2/screencast.html"
    };
};

export const hackernewsHandlers = [
    rest.get(`${SERVER_URL}/topstories.json`, (req, res, ctx) => {
        const data = [];

        for (const _ of Array(500).keys()) {
            data.push(createMockStory());
        }

        return res(ctx.json(data));
    })
];
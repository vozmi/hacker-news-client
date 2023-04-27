import { setupServer } from "msw/node";
import { hackernewsHandlers } from "./hackernews_handlers";

export const hackernewsServer = setupServer(...hackernewsHandlers);

import "@testing-library/jest-dom";
import * as jestFetchMock from "jest-fetch-mock";
import { hackernewsServer } from "@/mocks/hackernews_server";

jestFetchMock.enableMocks();

beforeAll(() => hackernewsServer.listen());

afterEach(() => hackernewsServer.resetHandlers());

afterAll(() => hackernewsServer.close());

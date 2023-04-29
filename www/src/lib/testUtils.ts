import { ApiClient } from "@/api";
import { MOCK_SERVER_URL } from "@/lib/constants";
import { ApiAdapter } from "@/services";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

type RenderWithRouterOptions = {
    route?: string;
};

export const renderWithRouter = (
    component: JSX.Element,
    { route }: RenderWithRouterOptions = { route: "/" }
) => {
    window.history.pushState({}, "Test page", route);

    return {
        user: userEvent.setup(),
        ...render(component, { wrapper: BrowserRouter }),
    };
};

export const createMockApiAdapter = () => {
    return new ApiAdapter(new ApiClient({ base: MOCK_SERVER_URL }));
};

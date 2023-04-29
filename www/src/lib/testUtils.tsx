import { ApiClient } from "@/api";
import { ServicesContext } from "@/contexts";
import { MOCK_SERVER_URL } from "@/mocks";
import { ApiAdapter } from "@/services";
import { render } from "@testing-library/react";
import { HashRouter } from "react-router-dom";

export const renderInApp = (component: JSX.Element) => {
    const apiAdapter = new ApiAdapter(new ApiClient({ base: MOCK_SERVER_URL }));

    render(
        <HashRouter>
            <ServicesContext.Provider
                value={{
                    apiAdapter,
                }}
            >
                {component}
            </ServicesContext.Provider>
        </HashRouter>
    );
};

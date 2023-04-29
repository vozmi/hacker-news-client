import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ApiClient } from "./api";
import { appConfig } from "./app.config";
import { ServicesContext } from "./contexts";
import { PageTopStories, Story } from "./pages";
import { ApiAdapter, IApiAdapter } from "./services";

const App = () => {
    const [apiAdapter, setApiAdapter] = useState<IApiAdapter>();

    const initialize = async () => {
        if (apiAdapter) {
            return;
        }

        const { hackerNewsApiUrl } = appConfig;

        const apiClient = new ApiClient({ base: hackerNewsApiUrl });
        const adapter = new ApiAdapter(apiClient);
        setApiAdapter(adapter);
    };

    useEffect(() => {
        initialize();
    }, []);

    if (!apiAdapter) {
        return <div>Loading...</div>;
    }

    return (
        <ServicesContext.Provider
            value={{
                apiAdapter,
            }}
        >
            <Routes>
                <Route path="/stories">
                    <Route path=":id" element={<Story />} />
                    <Route index element={<PageTopStories />} />
                </Route>
                <Route path="*" element={<Navigate to="/stories" />} />
            </Routes>
        </ServicesContext.Provider>
    );
};

export default App;

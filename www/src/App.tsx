import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ApiClient } from "./api";
import { appConfig } from "./app.config";
import { ServicesContext } from "./contexts";
import { PageTopStories, PageStory } from "./pages";
import { ApiAdapter, IApiAdapter } from "./services";
import { Sandbox } from "./Sandbox";
import { createSharedIntersectionObserver } from "./lib/sharedIntersectionObserver";

const rootIntersectionObserver = createSharedIntersectionObserver({
    root: document.getElementById("root"),
    rootMargin: "0px 0px 300px 0px",
    threshold: [0, 0.25, 0.5, 0.75, 1],
});

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
                rootIntersectionObserver,
            }}
        >
            <Routes>
                <Route path="/stories">
                    <Route path=":id" element={<PageStory />} />
                    <Route index element={<PageTopStories />} />
                </Route>
                <Route path="*" element={<Navigate to="/stories" />} />
            </Routes>
        </ServicesContext.Provider>
    );
};

export default App;

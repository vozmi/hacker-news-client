import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ApiClient } from "./api";
import { appConfig } from "./app.config";
import { Layout } from "./components";
import { ServicesContext } from "./contexts";
import { createSharedIntersectionObserver } from "./lib/sharedIntersectionObserver";
import { PageStory, PageTopStories } from "./pages";
import { ApiAdapter, IApiAdapter } from "./services";

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
            <Layout>
                <Routes>
                    <Route path="/stories">
                        <Route path=":id" element={<PageStory />} />
                        <Route index element={<PageTopStories />} />
                    </Route>
                    <Route path="*" element={<PageTopStories />} />
                </Routes>
            </Layout>
        </ServicesContext.Provider>
    );
};

export default App;

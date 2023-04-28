import { Navigate, Route, Routes } from "react-router-dom";
import { StoriesList } from "@/pages";
import { useEffect, useState } from "react";
import { ApiClient } from "./api";
import { AppConfig } from "./app.types";
import { ApiAdapter, IApiAdapter } from "@/services";

const App = () => {
    const [apiAdapter, setApiAdapter] = useState<IApiAdapter>();

    const initialize = async () => {
        if (apiAdapter) {
            return;
        }

        const configText = await fetch("/app.config.json");
        const config: AppConfig = await configText.json();

        const apiClient = new ApiClient({ base: config.hackerNewsApiUrl });
        const adapter = new ApiAdapter(apiClient);
        setApiAdapter(adapter);
    };

    useEffect(() => {
        initialize();
    }, []);

    return (
        <Routes>
            <Route path="/news" element={<StoriesList />}>
                <Route path=":id" element={<StoriesList />} />
            </Route>
            <Route path="*" element={<Navigate to="/news" />} />
        </Routes>
    );
};

export default App;

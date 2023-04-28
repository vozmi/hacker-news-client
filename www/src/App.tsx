import { Navigate, Route, Routes } from "react-router-dom";
import { StoriesList } from "@/pages";

const App = () => {
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

import { renderWithRouter } from "@/lib/testUtils";
import { Header } from "../Header";
import { screen } from "@testing-library/dom";
import { Route, Routes } from "react-router-dom";

test("Should redirect on homepage when logo is clicked", async () => {
    // Assert
    const { user } = renderWithRouter(
        <Routes>
            <Route path="/" element={<div>RootPage</div>} />
            <Route path="/story/123" element={<Header />} />
        </Routes>,
        {
            route: "/story/123",
        }
    );
    const logoEl = screen.getByLabelText("logo");

    // Act
    await user.click(logoEl);

    // Assert
    expect(screen.getByText("RootPage")).toBeInTheDocument();
});

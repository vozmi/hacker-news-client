import { createTheme } from "@mui/material";

export const muiTheme = createTheme({
    palette: {
        primary: {
            // light: will be calculated from palette.primary.main,
            main: "#f5761a",
            dark: "#c45e15",
            contrastText: "#fcfcfc",
        },
        secondary: {
            // light: will be calculated from palette.primary.main,
            main: "#246eb9",
            dark: "#1d5994",
            // contrastText: will be calculated to contrast with palette.primary.main,
        },
    },
});

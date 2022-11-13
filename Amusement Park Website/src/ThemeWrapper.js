import React from "react";
import App from "src/App";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { GlobalStyles } from "@mui/material";
import globalStylesCSS from "./theme/GlobalStyles";

export default function ThemeWrapper() {
    const theme = createTheme({
        typography: {
            fontFamily: "Signika Negative",
            fontSize: 16, //1.2rem=19.2px for header. 16px for normal text
        },
        palette: {
            background: {
                paper: "#403D4E", //color of drawer
                body: { main: "#FFFFFF", secondary: "#24BD9D 58%" },
                header: { main: "#F2F1F8", chosenText: "#FFFFFF" },
            },
            primary: { main: "#099D7E" },
            secondary: { main: "#403D4E" },
            light: { main: "#24BD9D" },
            shadow: { main: "0px 3px 10px rgba(0, 0, 0, 0.25)" },
            shadowLarge: { main: "0px 3px 10px rgba(0, 0, 0, 0.7)" },
            footer: "#403D4E",
            commonText: {
                black: "#000000",
                white: "#FFFFFF",
                grayWhite: "#F4EEEE",
            },
            hover: { white: "#a3a2a2" },
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 576,
                md: 768,
                lg: 992,
                xl: 1200,
                xxl: 1400,
            },
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: "none",
                    },
                },
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={globalStylesCSS} />
            <App />
        </ThemeProvider>
    );
}

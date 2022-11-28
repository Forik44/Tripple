import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ThemeProvider, createTheme } from "@mui/material";
// изменяем исходные цвета в MUI
const theme = createTheme({
  palette: {
    success: {
      main: "#66FCF1",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ThemeProvider theme = {theme}>
        <App />
    </ThemeProvider>
);

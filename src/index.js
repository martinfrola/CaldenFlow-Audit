import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalContextProvider } from "./context/GlobalContext";
import App from "./App";
import theme from "./context/ThemeContext";
import { ThemeProvider } from "@mui/material/styles";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalContextProvider>
        <App />
      </GlobalContextProvider>
    </ThemeProvider>
  </StrictMode>
);

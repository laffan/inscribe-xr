import React from "react";
import ReactDOM from "react-dom/client";
import { createStore, action, StoreProvider } from "easy-peasy";
import App from "./App";
import { AuthProvider } from "./components/Auth";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import "@fontsource/public-sans";
import "./scss/main.scss";

import { store } from "./state-manager.js";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <CssVarsProvider>
      <CssBaseline />
      <StoreProvider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </StoreProvider>
    </CssVarsProvider>
  </React.StrictMode>
);


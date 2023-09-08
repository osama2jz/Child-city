import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { SpotlightProvider } from "@mantine/spotlight";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: "Poppins, sans-serif",
          colors: {
            primary: [
              "#81d1e5",
              "#81d1e5",
              "#81d1e5",
              "#81d1e5",
              "#81d1e5",
              "#81d1e5",
              "#81d1e5",
            ],
          },
          primaryColor: "primary",
          globalStyles: (theme) => ({
            ".mantine-Modal-title": {
              marginLeft: "auto",
              fontWeight: "bold",
              color: "rgb(0,0,0,0.5)",
            },
          }),
        }}
      >
        <SpotlightProvider actions={[]}>

        <App />
        </SpotlightProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);

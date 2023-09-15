import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { SpotlightProvider } from "@mantine/spotlight";
import { UserProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      cacheTime: 30000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
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
        <QueryClientProvider client={queryClient}>
          <UserProvider>
        <Toaster />

            <App />
          </UserProvider>
        </QueryClientProvider>
      </MantineProvider>
    </BrowserRouter>
  </React.StrictMode>
);

import { ThemeProvider } from "@singlestore/fusion/theme-context";
import React from "react";
import { createRoot } from "react-dom/client";

import { NotificationsPreviewApp } from "./app";

import "@singlestore/fusion/styles/base.scss";
import "@singlestore/fusion/styles/main.scss";
import "./app.scss";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Root element not found");
}

createRoot(rootElement).render(
    <React.StrictMode>
        <ThemeProvider themePreference="light">
            <div
                style={{
                    minHeight: "100vh",
                    background: "var(--sui-color-background-app)",
                }}
            >
                <NotificationsPreviewApp />
            </div>
        </ThemeProvider>
    </React.StrictMode>
);

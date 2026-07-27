import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import ResumeProvider from "./Resume/Context/ResumeProvider";
import AuthProvider from "./User/Context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>

        <AuthProvider>

            <ResumeProvider>

                <App />

            </ResumeProvider>

        </AuthProvider>

    </React.StrictMode>
);
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import ResumeProvider from "./resume/context/ResumeProvider";
import AuthProvider from "./user/context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>

        <AuthProvider>

            <ResumeProvider>

                <App />

            </ResumeProvider>

        </AuthProvider>

    </React.StrictMode>
);
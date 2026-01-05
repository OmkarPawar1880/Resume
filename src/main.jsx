import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ResumeProvider from "./context/ResumeProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ResumeProvider>
      <App />
    </ResumeProvider>
  </React.StrictMode>
);

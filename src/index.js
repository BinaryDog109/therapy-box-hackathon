import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NewsContextProvider } from "./context/NewsContext";
import { TasksContextProvider } from "./context/TasksContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <NewsContextProvider>
      <TasksContextProvider>
        <App />
      </TasksContextProvider>
    </NewsContextProvider>
  </AuthContextProvider>
);

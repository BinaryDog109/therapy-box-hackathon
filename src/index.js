import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NewsContextProvider } from "./context/NewsContext";
import { TasksContextProvider } from "./context/TasksContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NewsContextProvider>
    <TasksContextProvider>
      <App />
    </TasksContextProvider>
  </NewsContextProvider>
);

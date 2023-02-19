import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { NewsContextProvider } from "./context/NewsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NewsContextProvider>
    <App />
  </NewsContextProvider>
);

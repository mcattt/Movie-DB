import React from "react";
import ReactDOM from "react-dom/client";
// import App from './src/components/App.jsx'
import AppRouter from "./routers/AppRouter";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);

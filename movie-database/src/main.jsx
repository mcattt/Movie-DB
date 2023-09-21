import React from "react";
import ReactDOM from "react-dom/client";
// import App from './src/components/App.jsx'

import '../normalize-fwd.css';
import AppRouter from "./routers/AppRouter";
import { store } from "./store/store";
import { Provider } from "react-redux";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);

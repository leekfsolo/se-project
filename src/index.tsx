import React from "react";

import store from "./app/store";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import Routers from "./routers";

import "./utils/i18n";
import "./_styles.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routers />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

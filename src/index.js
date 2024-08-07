import React from "react";
import ReactDOM from "react-dom/client";
import PageRouter from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";
import Layout from "./components/Layout.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <PageRouter />
      </Layout>
    </BrowserRouter>
  </Provider>
);

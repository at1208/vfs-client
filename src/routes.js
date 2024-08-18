import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";

import authguard from "./authguard/authguard.js";
import Router from "./components/Router.js";
import { HOME_PATH, DASHBOARD_PATH } from "./constants/path.js";

import Applications from "./pages/Dashboard.js";

export default function PageRouter() {
  return (
    <Routes>
      <Route
        path={HOME_PATH}
        element={<Router component={Home} executor={[]} />}
      />
      <Route
        path={DASHBOARD_PATH}
        element={<Router component={Applications} executor={[authguard]} />}
      />
    </Routes>
  );
}

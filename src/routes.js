import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Dashboard from "./pages/Dashboard.js";
import authguard from "./authguard/authguard.js";
import Router from "./components/Router.js";
import {
  HOME_PATH,
  DASHBOARD_PATH,
  BOOK_BULK_VISA_PATH,
  BOOK_VISA_PATH,
  APPLICATION_PATH,
} from "./constants/path.js";
import BookVisa from "./pages/BookVisa.js";
import BookBulkVisa from "./pages/BookBulkVisa.js";
import Applications from "./pages/Applications";

export default function PageRouter() {
  return (
    <Routes>
      <Route
        path={HOME_PATH}
        element={<Router component={Home} executor={[]} />}
      />
      <Route
        path={DASHBOARD_PATH}
        element={<Router component={Dashboard} executor={[authguard]} />}
      />

      <Route
        path={BOOK_VISA_PATH}
        element={<Router component={BookVisa} executor={[authguard]} />}
      />
      <Route
        path={BOOK_BULK_VISA_PATH}
        element={<Router component={BookBulkVisa} executor={[authguard]} />}
      />
      <Route
        path={APPLICATION_PATH}
        element={<Router component={Applications} executor={[authguard]} />}
      />
    </Routes>
  );
}

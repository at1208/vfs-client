import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Router = ({ component: Component, executor }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    executor.forEach(async (guard) => {
      await guard(pathname);
    });
  }, [pathname, executor]);

  return <Component />;
};

export default Router;

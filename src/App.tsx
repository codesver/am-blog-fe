import React from "react";
import { BrowserRouter } from "react-router-dom";

import AuthRouter from "./router/AuthRouter";
import BaseRouter from "./router/BaseRouter";

import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <BaseRouter />
      <AuthRouter />
    </BrowserRouter>
  );
};

export default React.memo(App);

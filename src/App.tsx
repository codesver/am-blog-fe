import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AuthRouter from "./router/AuthRouter";

const App = () => {
  return (
    <BrowserRouter>
      <AuthRouter />
    </BrowserRouter>
  );
};

export default React.memo(App);

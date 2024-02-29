import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import TestPage from "./pages/TestPage";
import { Role } from "./core/Auth";
import { ThemeType, useTheme } from "./core/Theme";

import "./App.css";
import useAuth from "./core/Auth";

const App = () => {
  const onChange = useTheme((state) => state.onChange);
  const authorized = useAuth((state) => state.authorized);

  useEffect(() => {
    const theme: ThemeType = ThemeType[localStorage.getItem("theme") as ThemeType] || ThemeType.LIGHT;
    onChange(theme);
    localStorage.setItem("theme", theme);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<TestPage />} />
        <Route path="/admin" element={authorized(Role.ADMIN) ? <></> : <Navigate to={"/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default React.memo(App);

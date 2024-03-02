import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { Role } from "./core/Auth";
import useTheme, { ThemeType } from "./core/Theme";
import useAuth from "./core/Auth";

import "./App.css";

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
        <Route path="/admin" element={authorized(Role.ADMIN) ? <></> : <Navigate to={"/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default React.memo(App);

import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { create } from "zustand";

import TestPage from "./pages/TestPage";
import Auth, { Role } from "./core/Auth";

import "./App.css";

export enum Theme {
  LIGHT = "LIGHT", // #FFFFFF
  DARK = "DARK", // #191919
}

interface ThemeState {
  theme: Theme;
  onSwitch: () => void;
  onChange: (theme: Theme) => void;
}

export const useTheme = create<ThemeState>((set) => ({
  theme: Theme.LIGHT,
  onSwitch: () => set((state) => ({ theme: state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT })),
  onChange: (theme: Theme) => set({ theme }),
}));

const App = () => {
  const onChange = useTheme((state) => state.onChange);

  useEffect(() => {
    let theme: Theme = Theme.LIGHT;

    try {
      theme = Theme[localStorage.getItem("theme") as Theme];
    } catch (err) {
      theme = Theme.LIGHT;
    }

    onChange(theme);
    localStorage.setItem("theme", theme);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<TestPage />} />
        <Route path="/admin" element={Auth.authorized(Role.ADMIN) ? <></> : <Navigate to={"/login"} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default React.memo(App);

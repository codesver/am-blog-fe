import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import AuthRouter from "./router/AuthRouter";
import BaseRouter from "./router/BaseRouter";

import "./App.css";
import { create } from "zustand";

export enum Theme {
  LIGHT = "LIGHT", // #FFFFFF
  DARK = "DARK", // #191919
}

interface ThemeState {
  theme: Theme;
  onSwitch: () => void;
  onChange: (theme: Theme) => void;
}

const useTheme = create<ThemeState>((set) => ({
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
      <BaseRouter />
      <AuthRouter />
    </BrowserRouter>
  );
};

export default React.memo(App);

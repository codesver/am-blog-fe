import { create } from "zustand";

export enum ThemeType {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

export interface Theme {
  type: ThemeType;
  colors: {
    [key in "base" | "unbase" | "red" | "green" | "blue"]: `#${string}`;
  };
}

export const LightTheme: Theme = {
  type: ThemeType.LIGHT,
  colors: {
    base: "#d0d0d0",
    unbase: "#2f2f2f",
    red: "#d44c47",
    green: "#448361",
    blue: "#337ea9",
  },
};

export const DarkTheme: Theme = {
  type: ThemeType.DARK,
  colors: {
    base: "#2f2f2f",
    unbase: "#d0d0d0",
    red: "#df5452",
    green: "#529e72",
    blue: "#5e87c9",
  },
};

interface ThemeState {
  theme: Theme;
  onSwitch: () => void;
  onChange: (theme: ThemeType) => void;
}

const useTheme = create<ThemeState>((set) => ({
  theme: LightTheme,
  onSwitch: () =>
    set((state) => {
      switch (state.theme.type) {
        case ThemeType.LIGHT:
          return { theme: DarkTheme };
        case ThemeType.DARK:
          return { theme: LightTheme };
      }
    }),
  onChange: (theme: ThemeType) => {
    switch (theme) {
      case ThemeType.LIGHT:
        set({ theme: LightTheme });
        break;
      case ThemeType.DARK:
        set({ theme: DarkTheme });
        break;
    }
  },
}));

export default useTheme;

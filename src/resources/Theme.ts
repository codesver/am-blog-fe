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
    base: "#ffffff",
    unbase: "#191919",
    red: "#d44c47",
    green: "#448361",
    blue: "#337ea9",
  },
};

export const DarkTheme: Theme = {
  type: ThemeType.DARK,
  colors: {
    base: "#191919",
    unbase: "#ffffff",
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

export const useTheme = create<ThemeState>((set) => ({
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

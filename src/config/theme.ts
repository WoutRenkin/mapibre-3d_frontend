import {
  createTheme,
  SimplePaletteColorOptions,
  ThemeOptions,
} from "@mui/material/styles";
import { CommonColors } from "@mui/material/styles/createPalette";

interface TextColors {
  primary: string;
  secondary: string | undefined;
  disabled: string;
  hint: string;
}

export const theme = (() => {
  const sansFont =
    "Avenir LT Std, avenir next, avenir,-apple-system, BlinkMacSystemFont, segoe ui, helvetica neue, helvetica, Ubuntu, roboto, noto, arial, sans-serif";

  const borderRadius: number = 4;

  const commonColors: CommonColors = {
    black: "#000",
    white: "#fff",
  };
  const primary: SimplePaletteColorOptions = {
    main: "#000000",
  };
  const themeColors: SimplePaletteColorOptions = {
    main: "#292929",
  };
  const secondary: SimplePaletteColorOptions = {
    main: "#f68121",
  };
  const success: SimplePaletteColorOptions = {
    main: "rgb(75 ,161 ,68)",
  };
  const error: SimplePaletteColorOptions = {
    main: "#ff9292",
  };
  const warning: SimplePaletteColorOptions = {
    light: "rgb(183 ,171 ,31)",
    main: "rgb(150 ,140 ,25)",
    dark: "rgb(108 ,101 ,18)",
    contrastText: commonColors.white,
  };
  const text: TextColors = {
    primary: "rgba(0, 0, 0, 1)",
    secondary: "rgba(0, 0, 0, 0.8)",
    disabled: "rgba(0, 0, 0, 0.4)",
    hint: "rgba(0, 0, 0, 0.4)",
  };

  const defaultTheme = createTheme({
    palette: {
      primary,
      secondary,
      text,
      success,
      warning,
      error,
    },
    typography: {
      fontFamily: sansFont,
    },
  });

  const overrides: ThemeOptions = {
    palette: {
      primary,
      secondary,
      text,
      success,
      warning,
      error,
      background: {},
      common: commonColors,
    },
    typography: {
      fontFamily: sansFont,
    },
    shape: {
      borderRadius: borderRadius,
    },
    components: {
      MuiCssBaseline: {},
      MuiSkeleton: {
        styleOverrides: {
          root: {
            backgroundColor: themeColors.main,
            transform: "scale(1, 1)",
          },
        },
      },
    },
  };

  return createTheme(defaultTheme, overrides);
})();

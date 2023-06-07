import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useAppSelector } from "shared/libs/redux";

export const withTheme = (Component: React.ComponentType) => () => {
  const state = useAppSelector((state) => state.theme);
  const theme = createTheme({
    palette: {
      mode: state.mode,
      ...(state.mode === "light"
        ? {
            primary: {
              main: "#ff335f",
            },
            background: {
              default: "#f7c1b5",
            },
            text: {
              primary: "#d64659",
              secondary: "#ffffffb7",
              disabled: "#ffffff54",
            },
          }
        : null),
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component />
    </ThemeProvider>
  );
};

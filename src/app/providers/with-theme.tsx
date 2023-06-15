import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useAppSelector } from "shared/libs/redux";
import { ruRU } from "@mui/x-data-grid";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    mobile: true;
  }
}

export const withTheme = (Component: React.ComponentType) => () => {
  const state = useAppSelector((state) => state.theme);
  const theme = createTheme(
    {
      breakpoints: {
        values: {
          xs: 0,
          mobile: 400,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
        },
      },
      palette: {
        mode: state.mode,
        ...(state.mode === "light"
          ? {
              primary: {
                main: "#ff335f",
                // main: "#ffffff",
              },
              background: {
                // default: "#f7c1b5a9",
                // paper: "#ffffff",
                default: "#f2f2f2",
                paper: "#ffffff",
                // default: "#ffffff",
                // paper: "#c2c2c2",
              },
              action: {
                active: "#595959",
              },
              text: {
                // primary: "#f51634",
                // secondary: "#ff6e6e",
                // disabled: "#f56b6b99",
                primary: "#202020",
                secondary: "#595959",
                disabled: "#747474",
              },
            }
          : {
              background: {
                paper: "#272626",
              },
            }),
      },
    },
    ruRU
  );
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component />
      </ThemeProvider>
    </LocalizationProvider>
  );
};

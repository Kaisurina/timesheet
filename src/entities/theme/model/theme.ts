import { PaletteMode } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";

export interface IThemeState {
  mode: PaletteMode;
}

export const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: "dark" as PaletteMode },
  reducers: {
    themeSwitch(state) {
      if (state.mode === "dark") {
        state.mode = "light";
      } else {
        state.mode = "dark";
      }
    },
  },
});

export const { themeSwitch } = themeSlice.actions;
export default themeSlice.reducer;

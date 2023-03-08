import Switch from "@mui/material/Switch";
import { themeSwitch } from "entities/theme/model";
import { useAppDispatch, useAppSelector } from "shared/libs/redux";

const ThemeSwitch = () => {
  const mode = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  return (
    <Switch
      checked={mode.mode === "dark" ? true : false}
      onChange={() => dispatch(themeSwitch())}
    />
  );
};

export default ThemeSwitch;

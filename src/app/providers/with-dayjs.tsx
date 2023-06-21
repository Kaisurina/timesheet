import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";

dayjs.extend(utc);

export const withDayjs = (Component: React.ComponentType) => () =>
  (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
      <Component />
    </LocalizationProvider>
  );

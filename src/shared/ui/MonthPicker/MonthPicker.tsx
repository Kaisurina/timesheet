import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
type Props = {
  value: Dayjs | null;
  setValue: (v: Dayjs | null) => void;
};
export const MonthPicker = ({ value, setValue }: Props) => {
  return (
    <DatePicker
      sx={{ width: "fit-content" }}
      onAccept={(v) => {
        setValue(v);
      }}
      value={value}
      label={"Показать данные за"}
      views={["month", "year"]}
    />
  );
};

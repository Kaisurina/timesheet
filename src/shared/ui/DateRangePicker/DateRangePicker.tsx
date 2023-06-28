import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
interface DateRangePickerProps {
  endDate: Dayjs | null;
  startDate: Dayjs | null;
  setStartDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
  setEndDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}
export const DateRangePicker = ({
  endDate,
  startDate,
  setStartDate,
  setEndDate,
}: DateRangePickerProps) => {
  const hoursConverterStartDate = (
    startDate: Dayjs | null,
    endDate: Dayjs | null
  ): void => {
    if (dayjs.utc(endDate).diff(startDate, "days") > 31) {
      setEndDate(
        dayjs
          .utc(endDate)
          .add(-dayjs.utc(endDate).diff(startDate, "days") + 7, "day")
      );
    }
    return setStartDate(startDate);
  };
  const hoursConverterEndDate = (
    startDate: Dayjs | null,
    endDate: Dayjs | null
  ): void => {
    if (dayjs.utc(endDate).diff(startDate, "days") > 31) {
      setStartDate(
        dayjs
          .utc(startDate)
          .add(-dayjs.utc(startDate).diff(endDate, "days") - 7, "day")
      );
    }
    return setEndDate(endDate);
  };

  return (
    <Stack whiteSpace="pre" alignItems="center" direction="row">
      <DatePicker
        sx={{ width: "160px" }}
        maxDate={endDate}
        value={startDate}
        onChange={(newValue) => hoursConverterStartDate(newValue, endDate)}
        slotProps={{ textField: { inputProps: { readOnly: true } } }}
      />
      &nbsp; — &nbsp;
      <DatePicker
        sx={{ width: "160px" }}
        minDate={startDate}
        value={endDate}
        onChange={(newValue) => hoursConverterEndDate(startDate, newValue)}
        slotProps={{ textField: { inputProps: { readOnly: true } } }}
      />
    </Stack>
  );
};

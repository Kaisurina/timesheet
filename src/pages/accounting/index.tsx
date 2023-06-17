import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { MonthPicker } from "shared/ui";
import dayjs, { Dayjs } from "dayjs";
import { usersApi } from "entities/user/api/userService";

const Accounting = () => {
  const [date, setDate] = useState<Dayjs | null>(dayjs.utc());
  const [downloadFile, result] = usersApi.useGetExcelMutation();
  return (
    <Stack gap={10} direction="row">
      <MonthPicker value={date} setValue={setDate} />
      <Button
        onClick={() => {
          downloadFile({
            startDate: `${dayjs(date).format("YYYY-MM")}-01`,
            endDate: `${dayjs(date).add(1, "month").format("YYYY-MM")}-01`,
          });
          console.log(result);
        }}
      >
        Скачать
      </Button>
    </Stack>
  );
};

export default Accounting;

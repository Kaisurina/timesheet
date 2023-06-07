import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Table } from "shared/ui";
import { MonthPicker } from "shared/ui";
import dayjs, { Dayjs } from "dayjs";
import { recordsApi } from "entities/record/api/recordService";
import { useAppSelector } from "shared/libs/redux";

const Timesheet = () => {
  const user = useAppSelector((state) => state.user);
  const [month, setMonth] = useState<Dayjs | null>(dayjs());
  const { data, error, isLoading } = recordsApi.useGetRecordsByUserQuery({
    userId: user.userId,
    startDate: `${dayjs(month).format("YYYY-MM")}-01`,
    endDate: `${dayjs(month).add(1, "month").format("YYYY-MM")}-01`,
  });
  if (isLoading) {
    return <div>Загрузка</div>;
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <Box sx={{ bgcolor: "background.paper", p: 1, borderRadius: "5px" }}>
      <Table user={user} data={data} />
      <Stack mt={1} justifyContent="space-between" direction="row" spacing={1}>
        <MonthPicker value={month} setValue={setMonth} />
      </Stack>
    </Box>
  );
};
export default Timesheet;

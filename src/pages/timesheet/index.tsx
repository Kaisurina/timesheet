import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { DateRangePicker, Table } from "shared/ui";
import dayjs, { Dayjs } from "dayjs";
import { recordsApi } from "entities/record/api/recordService";
import { useAppSelector } from "shared/libs/redux";
import { RecordsHours } from "entities/record/ui";

const Timesheet = () => {
  const user = useAppSelector((state) => state.user);
  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs.utc().add(-7, "day")
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(
    dayjs.utc().add(7, "day")
  );
  const { data, error, isFetching, isLoading, isUninitialized } =
    recordsApi.useGetRecordsByUserQuery({
      userId: user.userId,
      startDate: `${startDate?.format("YYYY-MM-DD")}`,
      endDate: `${endDate?.format("YYYY-MM-DD")}`,
    });
  if (isLoading || isUninitialized) {
    return (
      <div>
        <CircularProgress
          sx={{
            position: "absolute",
            top: "33%",
            left: "50%",
            ml: "-3rem",
            mt: "-3rem",
          }}
          size={"6rem"}
        />
      </div>
    );
  }
  if (error) {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <Box sx={{ bgcolor: "background.paper", p: 1, borderRadius: "5px" }}>
      <Stack mb={1} justifyContent="space-between" direction="row" spacing={1}>
        <DateRangePicker
          endDate={endDate}
          startDate={startDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
        />
        <RecordsHours records={data} />
      </Stack>
      <Table loading={isFetching} user={user} data={data} />
    </Box>
  );
};
export default Timesheet;

import { useState } from "react";
import Box from "@mui/material/Box";
import { UsersGrid } from "widgets";
import { DateRangePicker } from "shared/ui";
import dayjs, { Dayjs } from "dayjs";
const Teams = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs.utc().add(-7, "day")
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(
    dayjs.utc().add(7, "day")
  );
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <Box
        sx={{ bgcolor: "background.paper", p: 1, borderRadius: "5px", mb: 1 }}
      >
        <DateRangePicker
          endDate={endDate}
          startDate={startDate}
          setEndDate={setEndDate}
          setStartDate={setStartDate}
        />
      </Box>
      <UsersGrid endDate={endDate} startDate={startDate} />
    </Box>
  );
};

export default Teams;

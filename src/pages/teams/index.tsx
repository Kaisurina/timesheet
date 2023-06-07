import { useState } from "react";
import Box from "@mui/material/Box";
import { UsersGrid } from "widgets";
import { MonthPicker } from "shared/ui";
import dayjs, { Dayjs } from "dayjs";

const Teams = () => {
  const [value, setValue] = useState<Dayjs | null>(dayjs());
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
        <MonthPicker value={value} setValue={setValue} />
      </Box>
      {value && (
        <UsersGrid
          value={{
            startDate: `${dayjs(value).format("YYYY-MM")}-01`,
            endDate: `${dayjs(value).add(1, "month").format("YYYY-MM")}-01`,
          }}
        />
      )}
    </Box>
  );
};

export default Teams;

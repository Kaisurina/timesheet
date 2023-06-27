import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { Table } from "shared/ui";
import { MonthPicker } from "shared/ui";
import dayjs, { Dayjs } from "dayjs";
import { recordsApi } from "entities/record/api/recordService";
import { useAppSelector } from "shared/libs/redux";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";

const Timesheet = () => {
  const user = useAppSelector((state) => state.user);
  const [month, setMonth] = useState<Dayjs | null>(dayjs());
  const { data, error, isFetching, isLoading, isUninitialized } =
    recordsApi.useGetRecordsByUserQuery({
      userId: user.userId,
      startDate: `${dayjs(month).format("YYYY-MM")}-01`,
      endDate: `${dayjs(month).add(1, "month").format("YYYY-MM")}-01`,
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
      <Table loading={isFetching} user={user} data={data} />
      <Stack mt={1} justifyContent="space-between" direction="row" spacing={1}>
        <MonthPicker value={month} setValue={setMonth} />
        <Stack
          height={56}
          // border={card.confirmed ? "1px solid#73db6ad8" : "1px solid #DBAE6A"}
          borderRadius="5px"
          p={1}
          gap={1}
          direction="row"
          bgcolor={(theme) =>
            theme.palette.mode === "dark" ? "#404040" : "background.default"
          }
        >
          <Tooltip title="Всего часов">
            <Box
              sx={{ cursor: "pointer" }}
              p={1}
              borderRadius="5px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bgcolor={"background.paper"}
            >
              <Typography
                lineHeight={1}
                textAlign="center"
                fontWeight={900}
                variant="h5"
              >
                {data.reduce(
                  (sum, records) => (records.hours ? sum + records.hours : sum),
                  0
                )}
              </Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Подтверждено">
            <Box
              color="#73db6ad8"
              sx={{ cursor: "pointer" }}
              p={1}
              borderRadius="5px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bgcolor={"background.paper"}
            >
              <Typography
                lineHeight={1}
                textAlign="center"
                fontWeight={900}
                variant="h5"
              >
                {data.reduce(
                  (sum, records) =>
                    records.hours && records.isConfirmed
                      ? sum + records.hours
                      : sum,
                  0
                )}
              </Typography>
            </Box>
          </Tooltip>
          <Tooltip title="Не подтверждено">
            <Box
              color="#DBAE6A"
              sx={{ cursor: "pointer" }}
              p={1}
              borderRadius="5px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bgcolor={"background.paper"}
            >
              <Typography
                lineHeight={1}
                textAlign="center"
                fontWeight={900}
                variant="h5"
              >
                {data.reduce(
                  (sum, records) =>
                    records.hours && !records.isConfirmed
                      ? sum + records.hours
                      : sum,
                  0
                )}
              </Typography>
            </Box>
          </Tooltip>
        </Stack>
      </Stack>
    </Box>
  );
};
export default Timesheet;

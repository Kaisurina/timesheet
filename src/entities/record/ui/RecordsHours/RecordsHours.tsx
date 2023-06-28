import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { ITimesheetRecord } from "entities/record/model";
export const RecordsHours = ({
  records,
}: {
  records: Array<ITimesheetRecord>;
}) => {
  return (
    <Stack
      height={56}
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
            {records.reduce(
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
            {records.reduce(
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
            {records.reduce(
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
  );
};

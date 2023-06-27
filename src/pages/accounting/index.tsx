import { useState } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { recordsApi } from "entities/record/api/recordService";

const Accounting = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs.utc().add(-7, "day")
  );
  const [endDate, setEndDate] = useState<Dayjs | null>(
    dayjs.utc().add(-1, "day")
  );
  const { data, error, isLoading, isUninitialized, isFetching } =
    recordsApi.useGetAccountingQuery({
      startDate: `${startDate?.format("YYYY-MM-DD")}`,
      endDate: `${endDate?.format("YYYY-MM-DD")}`,
    });
  if (isLoading || isUninitialized || isFetching) {
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
    <Box p={1} borderRadius="5px" bgcolor={"background.paper"}>
      <Stack
        alignItems="center"
        mb={1}
        justifyContent="space-between"
        direction="row"
      >
        <Stack whiteSpace="pre" alignItems="center" direction="row">
          <DatePicker
            sx={{ width: "160px" }}
            minDate={dayjs.utc(endDate).add(-15, "day")}
            maxDate={endDate}
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            slotProps={{ textField: { inputProps: { readOnly: true } } }}
          />
          &nbsp; — &nbsp;
          <DatePicker
            sx={{ width: "160px" }}
            minDate={startDate}
            maxDate={dayjs.utc(startDate).add(15, "day")}
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            slotProps={{ textField: { inputProps: { readOnly: true } } }}
          />
        </Stack>
        <Button
          variant="outlined"
          sx={{ height: "fit-content" }}
          onClick={() => {
            fetch(
              "http://128.140.91.138:9000/api/timesheet_records/accounting/download",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  startDate: `${startDate?.format("YYYY-MM-DD")}`,
                  endDate: `${endDate?.format("YYYY-MM-DD")}`,
                }),
              }
            )
              .then((response) => response.blob())
              .then((blob) => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "Отчётность.xlsx";
                link.click();
                URL.revokeObjectURL(url);
              });
          }}
        >
          Скачать
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="accounting table">
          <TableHead>
            <TableRow>
              <TableCell>ФИО</TableCell>
              <TableCell align="right">Позиция</TableCell>
              <TableCell align="right">Рабочая почта</TableCell>
              <TableCell align="right">Контракт</TableCell>
              <TableCell align="right">Ставка</TableCell>
              <TableCell align="right">Часы</TableCell>
              <TableCell align="right">Наставничество</TableCell>
              <TableCell align="right">Переработка</TableCell>
              <TableCell align="right">х1.5</TableCell>
              <TableCell align="right">х2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!data.length && (
              <TableRow
                key="nodata"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  Нет данных
                </TableCell>
              </TableRow>
            )}
            {data.map((row) => (
              <TableRow
                key={row.email}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.fullName}
                </TableCell>
                <TableCell align="right">{row.position}</TableCell>
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.contract}</TableCell>
                <TableCell align="right">{row.positionRate}</TableCell>
                <TableCell align="right">{row.hours}</TableCell>
                <TableCell align="right">{row.mentoringHours}</TableCell>
                <TableCell align="right">{row.overworkedHours}</TableCell>
                <TableCell align="right">{row.hours15x}</TableCell>
                <TableCell align="right">{row.hours20x}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Accounting;

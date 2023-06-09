import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import CustomPagination from "./TablePagination";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { PositionSelect } from "../PositionSelect/PositionSelect";
import dayjs, { Dayjs } from "dayjs";
import { recordsApi } from "entities/record/api/recordService";
import { styled } from "@mui/material/styles";
import { IUsersState } from "entities/user/model";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
interface CustomFooterProps {
  user: IUsersState;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const CustomFooter = ({ user }: CustomFooterProps) => {
  const [expanded, setExpanded] = useState(false);
  const [is15x, setIs15x] = useState(false);
  const [is20x, setIs20x] = useState(false);
  const [position, setPosition] = useState(user.positionId);
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs.utc());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs.utc());
  const [create] = recordsApi.useCreateRecordMutation();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setStartDate(startDate?.add(1, "day") as Dayjs);
    setEndDate(endDate?.add(1, "day") as Dayjs);
    create({
      userId: user.userId,
      positionId: position || 6,
      updated: `${dayjs.utc()}`,
      startDate: startDate,
      endDate: endDate,
      isConfirmed: false,
      isDeleted: false,
      is15x: Boolean(data.get("is15x")),
      is20x: Boolean(data.get("is20x")),
      comment: String(data.get("comment")),
    });
  };
  return (
    <Box sx={{ position: "relative" }}>
      <ExpandMore
        sx={{
          position: "absolute",
          bottom: "6px",
          left: "6px",
          zIndex: "1",
        }}
        expand={expanded}
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon />
      </ExpandMore>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Stack
          onSubmit={handleSubmit}
          component="form"
          height="52px"
          sx={{
            ":hover": {
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.08)"
                  : "rgba(0, 0, 0, 0.04)",
            },
            padding: "6px 0px 6px 6px",
            ".MuiFormControlLabel-label": { fontSize: "0.7rem" },
            borderBottom: (theme) =>
              theme.palette.mode === "dark"
                ? "1px solid rgba(81, 81, 81, 1)"
                : "1px solid rgba(224, 224, 224, 1)",
            overflow: "auto",
          }}
          direction="row"
        >
          <Box
            sx={{
              minWidth: "54px",
              width: "54px",
              py: 1,
            }}
          ></Box>
          <DateTimePicker
            slotProps={{
              textField: { size: "small" },
              openPickerButton: {
                disabled: !dayjs.utc(startDate).isValid(),
              },
            }}
            sx={{
              fieldset: { border: "0" },
              width: "195px",
              mr: "20px",
              minWidth: "195px",
            }}
            onChange={(value) => {
              setStartDate(value);
              setEndDate(value);
            }}
            value={startDate}
          />
          <Box
            sx={{
              width: "105px",
              minWidth: "105px",
              mr: "20px",
            }}
          >
            <TimePicker
              minTime={startDate}
              slotProps={{
                textField: { size: "small" },
                openPickerButton: {
                  disabled: !dayjs.utc(endDate).isValid(),
                },
              }}
              sx={{
                fieldset: { border: "0" },
              }}
              value={endDate}
              onChange={(value) => {
                if (
                  value &&
                  dayjs.utc(value).format("hh:mm") === "12:00" &&
                  value.diff(startDate, "minutes") < 0
                ) {
                  setEndDate(dayjs.utc(value.format("YYYY-MM-DDT23:59:59Z")));
                } else {
                  setEndDate(value);
                }
              }}
            />
          </Box>

          <Box
            sx={{
              outline: endDate
                ? endDate.diff(startDate, "minutes") < 0
                  ? "solid #ff335f 1px"
                  : null
                : null,
              textAlign: "center",
              minWidth: "56px",
              width: "56px",
              py: 1,
              pl: "10px",
            }}
          >
            {endDate?.diff(startDate, "minutes")
              ? (endDate?.diff(startDate, "minutes") / 60).toFixed(1)
              : 0}
          </Box>
          <FormGroup
            sx={{ minWidth: "100px", mr: "5px" }}
            aria-label="rate"
            row
          >
            <Tooltip title="1.5x">
              <Checkbox
                onChange={(e) => setIs15x(e.target.checked)}
                disabled={is20x}
                checked={is15x}
                sx={{ m: 0 }}
                value={true}
                name="is15x"
                size="small"
              />
            </Tooltip>
            <Tooltip title="2x">
              <Checkbox
                onChange={(e) => setIs20x(e.target.checked)}
                disabled={is15x}
                checked={is20x}
                sx={{ m: 0, ml: "12px" }}
                value={true}
                name="is20x"
                size="small"
              />
            </Tooltip>
          </FormGroup>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "200px",
              mr: "20px",
              minWidth: "200px",
              label: { display: "none" },
              "& :before": { display: "none" },
              div: { mt: "0 !important" },
            }}
          >
            <PositionSelect
              position={position || 6}
              setPosition={setPosition}
            />
          </Box>
          <TextField
            fullWidth
            name="comment"
            size="small"
            sx={{
              input: {
                padding: 0,
                mt: "10px",
              },
              mr: "20px",
              minWidth: "260px",
              label: {
                "&.Mui-focused": { display: "none" },
                "&.MuiFormLabel-filled": { display: "none" },
                top: "-10px",
              },
              "& :before": {
                display: "none",
              },
              "& :after": {
                display: "none",
              },
              div: { mt: "0 !important", fontSize: "0.875rem" },
            }}
            label="Комменатрий"
            variant="standard"
          />
          <Button
            disabled={endDate ? endDate?.diff(startDate, "minutes") < 0 : false}
            sx={{ minWidth: 102, ml: 1, mr: "5px" }}
            type="submit"
          >
            Сохранить
          </Button>
        </Stack>
      </Collapse>
      <CustomPagination />
    </Box>
  );
};

export default CustomFooter;

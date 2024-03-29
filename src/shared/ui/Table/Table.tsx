import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import CustomFooter from "./TableFooter";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import { DataGrid, GridRowModel } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { recordsApi } from "entities/record/api/recordService";
import { ITimesheetRecord } from "entities/record/model";
import { PositionSelect } from "../PositionSelect/PositionSelect";
import { IUsersState } from "entities/user/model";
import { hoursConverter } from "shared/libs/hooks/hoursConverter";
import { useAppSelector } from "shared/libs/redux";

declare module "@mui/x-data-grid" {
  interface FooterPropsOverrides {
    user: IUsersState | null;
  }
}

type TableProps = {
  loading: boolean;
  data: ITimesheetRecord[];
  user: IUsersState | null;
  density?: "compact" | "standard" | "comfortable";
};

export const Table = ({ data, density, user, loading }: TableProps) => {
  const currentUser = useAppSelector((state) => state.user);
  const [updatePost, updateResult] = recordsApi.useUpdateRecordMutation();
  const [deletePost, deleteResult] = recordsApi.useDeleteRecordMutation();
  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    if (
      dayjs.utc(newRow.endDate).isValid() &&
      dayjs.utc(newRow.startDate).isValid()
    ) {
      newRow = {
        ...newRow,
        endDate: hoursConverter(newRow.startDate, newRow.endDate),
      };
      updatePost(newRow as ITimesheetRecord);
      return newRow;
    }
    return oldRow;
  };
  const processRowApproveOrDelete = (params: any, event: any) => {
    if (params.field === "delete") {
      !params.row.isConfirmed && deletePost(params.row.id);
    }
    if (event.target.name === "approve") {
      (currentUser.role === "SUPERVISOR" || currentUser.role === "TEAMLEAD") &&
        params.row.userId !== currentUser.userId &&
        (params.row.isConfirmed
          ? updatePost({
              ...params.row,
              isConfirmed: false,
              confirmedBy: null,
              confirmationTime: null,
            })
          : updatePost({
              ...params.row,
              isConfirmed: true,
              confirmedBy: currentUser.fullName,
              confirmationTime: dayjs.utc(),
            }));
    }
  };
  const handleProcessRowUpdateError = (error: Error) => {
    console.log(error);
  };
  return (
    <DataGrid
      onCellClick={processRowApproveOrDelete}
      loading={loading || updateResult.isLoading || deleteResult.isLoading}
      slots={{
        footer: CustomFooter,
        noRowsOverlay: () => null,
      }}
      slotProps={{ footer: { user: user } }}
      sx={{
        // maxHeight: "70vh",
        bgcolor: "background.paper",
        "& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator": {
          display: "none",
        },
        "& .MuiDataGrid-cell": {
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#376331" : "rgb(217 243 190)",
        },
        "& .MuiDataGrid-cell--editable": {
          bgcolor: "background.paper",
        },
        "& .MuiDataGrid-cell:last-child": { p: 0 },
        "& .MuiDataGrid-row--lastVisible .MuiDataGrid-cell": {
          borderBottomColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(81, 81, 81, 1) !important"
              : " rgba(224, 224, 224, 1) !important",
        },
        "& .MuiDataGrid-virtualScroller": {
          height: data?.length ? null : "0px", // убираем norowsoverlay полностью
        },
      }}
      density={density ? density : "standard"}
      rows={data}
      columns={[
        {
          type: "boolean",
          field: "isConfirmed",
          headerName: "Виза",
          width: 53,
          editable: false,
          disableColumnMenu: true,
          cellClassName: (params) =>
            params.row.isConfirmed ? "" : "MuiDataGrid-cell--editable",
          renderCell(params) {
            return (
              <Tooltip
                title={
                  params.row.isConfirmed &&
                  `${params.row.confirmedBy} подтвердил смену в ${dayjs(
                    params.row.confirmationTime
                  )
                    .locale("ru")
                    .format("HH:mm DD-MM-YYYY")}`
                }
              >
                <Checkbox name="approve" size="small" checked={params.value} />
              </Tooltip>
            );
          },
        },
        {
          renderCell(params) {
            return (
              // <div>
              //   {dayjs
              //     .utc(params.row.startDate)
              //     .locale("ru")
              //     .format("DD MMMM |  HH:mm")}
              // </div>
              <DateTimePicker
                format={"DD.MM |  HH:mm"}
                sx={{ fieldset: { border: "0" } }}
                disabled
                value={dayjs.utc(dayjs.utc(params.row.startDate).locale("ru"))}
                slotProps={{ textField: { size: "small" } }}
              />
            );
          },
          renderEditCell(params) {
            const { id, field } = params;
            return (
              <DateTimePicker
                sx={{ fieldset: { border: "0" } }}
                slotProps={{
                  openPickerButton: {
                    disabled: !dayjs.utc(params.row.startDate).isValid(),
                  },
                }}
                format={"DD.MM |  HH:mm"}
                onChange={(value) => {
                  params.api.setEditCellValue({
                    id,
                    field,
                    value,
                  });
                }}
                value={dayjs.utc(params.value)}
              />
            );
          },
          field: "startDate",
          headerName: "Начало",
          width: 185,
          editable: true,
          disableColumnMenu: true,
        },
        {
          renderCell(params) {
            return (
              <TimePicker
                sx={{ fieldset: { border: "0" } }}
                disabled
                value={
                  dayjs.utc(params.row.endDate).isValid() &&
                  dayjs.utc(params.row.endDate).format("HH:mm:ss") ===
                    "23:59:59"
                    ? dayjs("2019-01-25")
                    : dayjs(dayjs.utc(params.row.endDate))
                }
                slotProps={{ textField: { size: "small" } }}
              />
            );
          },
          renderEditCell(params) {
            const { id, field } = params;
            return (
              <TimePicker
                slotProps={{
                  textField: { size: "small" },
                  openPickerButton: {
                    disabled: !dayjs.utc(params.row.endDate).isValid(),
                  },
                }}
                sx={{ fieldset: { border: "0" } }}
                onChange={(value) => {
                  params.api.setEditCellValue({ id, field, value });
                }}
                value={dayjs.utc(params.value)}
                views={["hours", "minutes"]}
              />
            );
          },
          field: "endDate",
          headerName: "Конец",
          editable: true,
          width: 125,
          disableColumnMenu: true,
        },
        {
          renderCell: (params) => (
            <Box color="text.disabled" mt={0.2} fontSize="1rem">
              {params.value}
            </Box>
          ),
          cellClassName: (params) =>
            params.row.isConfirmed ? "" : "MuiDataGrid-cell--editable",
          sortable: false,
          field: "hours",
          headerName: "Часы",
          type: "number",
          width: 60,
          disableColumnMenu: true,
        },
        {
          sortable: false,
          field: "is15x",
          type: "boolean",
          headerName: "1.5х",
          width: 50,
          editable: true,
          renderEditCell(params) {
            const { id, field } = params;
            return (
              <Checkbox
                disabled={params.row.is20x}
                size="small"
                checked={params.value}
                onChange={(e) => {
                  params.api.setEditCellValue({
                    id,
                    field,
                    value: e.target.checked,
                  });
                }}
              />
            );
          },
          disableColumnMenu: true,
        },
        {
          sortable: false,
          field: "is20x",
          type: "boolean",
          headerName: "2х",
          width: 50,
          editable: true,
          renderEditCell(params) {
            const { id, field } = params;
            return (
              <Checkbox
                disabled={params.row.is15x}
                size="small"
                checked={params.value}
                onChange={(e) => {
                  params.api.setEditCellValue({
                    id,
                    field,
                    value: e.target.checked,
                  });
                }}
              />
            );
          },
          disableColumnMenu: true,
        },
        {
          sortable: false,
          field: "positionId",
          headerName: "Позиция",
          width: 160,
          editable: true,
          disableColumnMenu: true,
          renderCell: (params) => (
            <Box
              width="100%"
              sx={{
                label: { display: "none" },
                "& :before": { display: "none" },
                div: { mt: "0 !important" },
              }}
            >
              <Chip
                size="small"
                sx={{
                  span: { pr: 0, pl: "8px" },
                  width: "200px",
                  outline:
                    (params.row.is15x ||
                      params.row.is20x ||
                      params.row.positionId !== user?.positionId) &&
                    "2px solid #DBAE6A",
                }}
                label={
                  <PositionSelect disabled={true} position={params.value} />
                }
              />
            </Box>
          ),
          renderEditCell: (params) => {
            return (
              <Box
                width="97%"
                sx={{
                  pl: 1,
                  label: { display: "none" },
                  "& :before": { display: "none" },
                  div: { mt: "0 !important" },
                }}
              >
                <PositionSelect
                  setPosition={(e) =>
                    params.api.setEditCellValue({
                      id: params.id,
                      field: params.field,
                      value: e,
                    })
                  }
                  position={params.value}
                />
              </Box>
            );
          },
        },
        {
          sortable: false,
          field: "comment",
          headerName: "Комментарий",
          minWidth: 150,
          flex: 1,
          editable: true,
          renderCell: (params) => (
            <Tooltip enterDelay={700} followCursor title={params.value}>
              <Box sx={{ color: "text.disabled" }}>{params.value}</Box>
            </Tooltip>
          ),
        },
        {
          cellClassName: (params) =>
            params.row.isConfirmed ? "" : "MuiDataGrid-cell--editable",
          field: "delete",
          width: 50,
          sortable: false,
          disableColumnMenu: true,
          renderHeader: () => null,
          renderCell: (params) => {
            return (
              <IconButton
                size="large"
                disabled={params.row.isConfirmed}
                name="delete"
              >
                <DeleteIcon />
              </IconButton>
            );
          },
        },
      ]}
      isCellEditable={(params) => {
        return !params.row.isConfirmed;
      }}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={handleProcessRowUpdateError}
      initialState={{
        sorting: {
          sortModel: [{ field: "startDate", sort: "asc" }],
        },
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10]}
      autoHeight
    />
  );
};

import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import CustomFooter from "./TableFooter";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridColDef, GridRowModel } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { recordsApi } from "entities/record/api/recordService";
import { ITimesheetRecord } from "entities/record/model";
import { PositionSelect } from "../PositionSelect/PositionSelect";
import { IUsersState } from "entities/user/model";
import { hoursConverter } from "shared/libs/hooks/hoursConverter";

declare module "@mui/x-data-grid" {
  interface FooterPropsOverrides {
    user: IUsersState;
  }
}

type TableProps = {
  loading: boolean;
  data: ITimesheetRecord[] | undefined;
  user: IUsersState;
  density?: "compact" | "standard" | "comfortable";
};

const columns: GridColDef[] = [
  {
    type: "boolean",
    field: "isConfirmed",
    headerName: "$",
    width: 50,
    editable: false,
    disableColumnMenu: true,
    renderCell(params) {
      return <Checkbox name="approve" size="small" checked={params.value} />;
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
          format={"DD MMMM |  HH:mm"}
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
    headerName: "Начало смены",
    width: 215,
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
            dayjs.utc(params.row.endDate).format("HH:mm:ss") === "23:59:59"
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
    headerName: "Конец смены",
    editable: true,
    width: 125,
    disableColumnMenu: true,
  },
  {
    renderCell: (params) => (
      <Box sx={{ color: "text.disabled" }}>
        {dayjs.utc(params.row.endDate).diff(params.row.startDate, "minutes")
          ? (
              dayjs
                .utc(params.row.endDate)
                .diff(params.row.startDate, "minutes") / 60
            ).toFixed(1)
          : 0}
      </Box>
    ),
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
            params.api.setEditCellValue({ id, field, value: e.target.checked });
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
            params.api.setEditCellValue({ id, field, value: e.target.checked });
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
    width: 220,
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
        <PositionSelect disabled={true} position={params.value} />
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
    minWidth: 350,
    flex: 1,
    editable: true,
    renderCell: (params) => (
      <Tooltip enterDelay={700} followCursor title={params.value}>
        <Box sx={{ color: "text.disabled" }}>{params.value}</Box>
      </Tooltip>
    ),
  },
  {
    field: "delete",
    width: 50,
    sortable: false,
    disableColumnMenu: true,
    renderHeader: () => null,
    renderCell: () => {
      return (
        <IconButton name="delete">
          <DeleteIcon sx={{ zIndex: -1 }} />
        </IconButton>
      );
    },
  },
];

export const Table = ({ data, density, user, loading }: TableProps) => {
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
    if (event.target.name === "delete") {
      deletePost(params.row.id);
    }
    if (event.target.name === "approve") {
      updatePost({ ...params.row, isConfirmed: !params.value });
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
        minHeight: 100,
        "& .MuiDataGrid-columnHeader:last-child .MuiDataGrid-columnSeparator": {
          display: "none",
        },
        "& .MuiDataGrid-cell:last-child": { padding: "0 5px" },
        "& .MuiDataGrid-row--lastVisible .MuiDataGrid-cell": {
          borderBottomColor: (theme) =>
            theme.palette.mode === "dark"
              ? "rgba(81, 81, 81, 1) !important"
              : " rgba(224, 224, 224, 1) !important",
        },
        "& .MuiDataGrid-virtualScroller": {
          height: data?.length ? null : "0px",
        },
      }}
      density={density ? density : "standard"}
      rows={data || []}
      columns={columns}
      isCellEditable={(params) => {
        return !params.row.isConfirmed;
      }}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={handleProcessRowUpdateError}
      initialState={{
        sorting: {
          sortModel: [{ field: "startDate", sort: "desc" }],
        },
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10]}
      autoHeight
    />
  );
};

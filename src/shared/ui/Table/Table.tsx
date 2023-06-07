import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import CustomFooter from "./TableFooter";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowModel,
} from "@mui/x-data-grid";
import dayjs from "dayjs";
import { recordsApi } from "entities/record/api/recordService";
import { ITimesheetRecord } from "entities/record/model";
import { PositionSelect } from "../PositionSelect/PositionSelect";
import { IUsersState } from "entities/user/model";

type TableProps = {
  data: ITimesheetRecord[] | undefined;
  user: IUsersState;
  density?: "compact" | "standard" | "comfortable";
};

type ParamsProp = {
  params: GridRenderCellParams;
};

declare module "@mui/x-data-grid" {
  interface FooterPropsOverrides {
    user: IUsersState;
  }
}

const TableDeleteIcon = ({ params }: ParamsProp) => {
  const [deletePost] = recordsApi.useDeleteRecordMutation();
  return (
    <IconButton
      onClick={() => {
        params.api.updateRows([{ id: params.id, _action: "delete" }]);
        deletePost(params.id as string);
      }}
    >
      <DeleteIcon />
    </IconButton>
  );
};
const TableCheckbox = ({ params }: ParamsProp) => {
  const [updatePost] = recordsApi.useUpdateRecordMutation();
  return (
    <Checkbox
      checked={params.value}
      onChange={() => {
        params.api.updateRows([
          {
            id: params.id,
            isConfirmed: !params.value,
          },
        ]);
        updatePost({ ...params.row, isConfirmed: !params.value });
      }}
    />
  );
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
      return <TableCheckbox params={params} />;
    },
  },
  {
    renderCell(params) {
      return (
        <DateTimePicker
          sx={{ fieldset: { border: "0" } }}
          disabled
          value={dayjs.utc(params.value)}
          slotProps={{ textField: { size: "small" } }}
        />
      );
    },
    renderEditCell(params) {
      const { id, field } = params;
      return (
        <DateTimePicker
          sx={{ fieldset: { border: "0" } }}
          onChange={(value) => {
            params.api.setEditCellValue({
              id,
              field,
              value,
            });
            if (dayjs.utc(value).toDate().toString() !== "Invalid Date") {
              params.api.updateRows([
                {
                  id,
                  endDate: value,
                },
              ]);
            }
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
          value={dayjs.utc(params.value)}
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
          }}
          sx={{ fieldset: { border: "0" } }}
          onChange={(value) =>
            params.api.setEditCellValue({ id, field, value })
          }
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
    disableColumnMenu: true,
  },
  {
    sortable: false,
    field: "is20x",
    type: "boolean",
    headerName: "2х",
    width: 50,
    editable: true,
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
      <Box sx={{ color: "text.disabled" }}>{params.value}</Box>
    ),
  },
  {
    field: "delete",
    width: 50,
    sortable: false,
    disableColumnMenu: true,
    renderHeader: () => null,
    renderCell: (params) => {
      return <TableDeleteIcon params={params} />;
    },
  },
];

export const Table = ({ data, density, user }: TableProps) => {
  const [updatePost] = recordsApi.useUpdateRecordMutation();
  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    console.log(newRow);
    if (dayjs.utc(newRow.endDate).toDate().toString() === "Invalid Date") {
      return oldRow;
    }
    if (dayjs.utc(newRow.startDate).toDate().toString() === "Invalid Date") {
      return oldRow;
    }
    updatePost(newRow as ITimesheetRecord);
    return newRow;
  };
  const handleProcessRowUpdateError = (error: Error) => {
    console.log(error);
  };
  return (
    <DataGrid
      slots={{
        footer: CustomFooter,
        noRowsOverlay: () => null,
      }}
      slotProps={{ footer: { user: user } }}
      sx={{
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
          sortModel: [{ field: "startDate", sort: "asc" }],
        },
        pagination: { paginationModel: { pageSize: 10 } },
      }}
      pageSizeOptions={[10]}
      autoHeight
    />
  );
};

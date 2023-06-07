import MuiPagination from "@mui/material/Pagination";
import { TablePaginationProps } from "@mui/material/TablePagination";
import {
  gridPageCountSelector,
  GridPagination,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

const Pagination = ({
  page,
  onPageChange,
  className,
}: Pick<TablePaginationProps, "page" | "onPageChange" | "className">) => {
  const apiRef = useGridApiContext();
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <MuiPagination
      color="primary"
      className={className}
      count={pageCount}
      page={!pageCount || pageCount <= 0 ? 0 : page + 1}
      onChange={(event, newPage) => {
        onPageChange(event as any, newPage - 1);
      }}
    />
  );
};

const CustomPagination = (props: any) => {
  return (
    <GridPagination
      sx={{
        ".MuiTablePagination-displayedRows": {
          display: { xs: "none", sm: "inline" },
        },
      }}
      ActionsComponent={Pagination}
      {...props}
    />
  );
};

export default CustomPagination;

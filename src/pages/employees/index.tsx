import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";
import { PositionsList, UsersList } from "widgets";
import { usersApi } from "entities/user/api/userService";

const Employees = () => {
  const users = usersApi.useGetAllUsersQuery();
  const positions = usersApi.useGetAllUsersPositionsQuery("");
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(1);
  if (users.isLoading || positions.isLoading) {
    return <div>Загрузка</div>;
  }
  return (
    <>
      <BottomNavigation
        sx={{
          left: {
            xs: "38%",
            mobile: "32%",
            sm: "44%",
            md: "31%",
            lg: "25%",
            xl: "33%",
          },
          borderRadius: "5px",
          mb: 2,
          height: "56px",
          position: "absolute",
          width: {
            xs: "60px",
            mobile: "130px",
            sm: "180px",
            md: "450px",
            lg: "700px",
            xl: "800px",
          },
        }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          sx={{
            maxWidth: "50%",
            minWidth: "1px",
            span: { display: { xs: "none", mobile: "inline-flex" } },
          }}
          label="Аккаунты"
          icon={<ManageAccountsIcon />}
        />
        <BottomNavigationAction
          sx={{
            maxWidth: "50%",
            minWidth: "1px",
            span: { display: { xs: "none", mobile: "inline-flex" } },
          }}
          label="Позиции"
          icon={<FormatListNumberedRtlIcon />}
        />
      </BottomNavigation>
      {value === 0 && [
        <UsersList
          key="list"
          users={
            users.data
              ? users.data.slice(page === 1 ? 0 : page * 50 - 50, page * 50)
              : []
          }
          allusers={users.data || []}
        />,
        <Pagination
          size="small"
          sx={{
            bgcolor: "background.paper",
            width: "auto",
            p: 1,
            mt: 1,
            borderRadius: "5px",
          }}
          key="pagination"
          count={Math.ceil(users.data?.length ? users.data?.length / 50 : 1)}
          page={page}
          onChange={(e, value) => setPage(value)}
        />,
      ]}
      {value === 1 && <PositionsList positions={positions.data || []} />}
    </>
  );
};

export default Employees;

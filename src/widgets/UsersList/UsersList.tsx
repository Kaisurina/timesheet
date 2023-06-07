import { useState, useEffect } from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { UserCreate, UserEdit } from "entities/user/ui";
import { IUsersState } from "entities/user/model";

type UsersListProps = {
  users: IUsersState[];
  allusers: IUsersState[];
};

export const UsersList = ({ users, allusers }: UsersListProps) => {
  const [data, setData] = useState(users);
  useEffect(() => {
    setData(users);
  }, [users]);
  return (
    <Box>
      <Box
        sx={{
          borderRadius: "5px",
          bgcolor: "background.paper",
          p: 1,
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          onChange={(e) => {
            if (e.target.value.length >= 3) {
              setData(
                allusers.filter((item) =>
                  item.fullName
                    ?.toLowerCase()
                    .includes(e.target.value.toLowerCase())
                )
              );
            } else {
              setData(users);
            }
          }}
          sx={{ mr: 2, width: { xs: "80px", sm: "auto" } }}
          size="small"
          label="ФИО"
          variant="outlined"
        />
        <UserCreate />
      </Box>
      <List
        dense
        sx={{
          display: data.length === 0 ? "none" : null,
          p: 1,
          borderRadius: "5px",
          bgcolor: "background.paper",
          maxHeight: "64vh",
          overflow: "auto",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {data.map((user) => {
          return <UserEdit key={user.userId} user={user} />;
        })}
      </List>
    </Box>
  );
};

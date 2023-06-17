import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import AddCircle from "@mui/icons-material/AddCircle";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import CheckIcon from "@mui/icons-material/Check";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";
import { usersApi } from "entities/user/api/userService";
import { IUsersState } from "entities/user/model";
import { teamApi } from "entities/team/api/teamService";

export const UserCardAdd = ({ teamleaderId }: { teamleaderId: string }) => {
  const { data } = usersApi.useGetAllUsersQuery();
  const [addUser] = teamApi.useAddUserToTeamMutation();
  const [open, setOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<IUsersState[]>([]);
  const isFullNameRepeated = (data: IUsersState[], fullName: string) => {
    const count = data.filter((option) => option.fullName === fullName).length;
    return count > 1;
  };

  return (
    <Card sx={{ borderRadius: "15px" }} variant="outlined">
      <SwipeableDrawer
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        anchor="right"
        open={open}
        PaperProps={{
          sx: { width: 300, border: "none", overflow: "hidden" },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 1, py: 2 }}
        >
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Добавить в команду
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider sx={{ mb: 1 }} />

        <Box sx={{ p: 2 }}>
          <Autocomplete
            value={selectedUsers}
            onChange={(e, value) => {
              setSelectedUsers(value);
            }}
            limitTags={23}
            disableCloseOnSelect
            multiple={true}
            disablePortal
            id="team-users-add"
            options={data || []}
            renderOption={(props, option) => (
              <li key={option.username} {...props}>
                {data && isFullNameRepeated(data, option.fullName) ? (
                  <Tooltip title={option.username}>
                    <span>{option.fullName}</span>
                  </Tooltip>
                ) : (
                  `${option.fullName}`
                )}
              </li>
            )}
            filterOptions={(options, { inputValue }) => {
              return options.filter((option) =>
                option.fullName.toLowerCase().includes(inputValue.toLowerCase())
              );
            }}
            getOptionLabel={(option) => option.username}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  size="small"
                  label={option.fullName}
                  {...getTagProps({ index })}
                />
              ))
            }
            size="small"
            renderInput={(params) => (
              <TextField
                sx={{ maxHeight: "50%" }}
                {...params}
                label="Пользователи"
              />
            )}
          />
        </Box>

        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="success"
            variant="outlined"
            onClick={() =>
              selectedUsers.map((user) =>
                addUser({ userId: user.userId, teamleaderId: teamleaderId })
              )
            }
          >
            <CheckIcon />
          </Button>
        </Box>
      </SwipeableDrawer>
      <CardActionArea onClick={() => setOpen(true)}>
        <CardContent
          sx={{
            height: "180px",
            width: "282px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AddCircle sx={{ width: "60px", height: "60px" }} color="disabled" />
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

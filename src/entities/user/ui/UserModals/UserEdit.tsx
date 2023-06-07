import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { PositionSelect, RoleSelect } from "shared/ui";
import { useEditUserMutation } from "entities/user/api/userService";
import { IUsersState } from "entities/user/model";
type UserEditProps = {
  user: IUsersState;
};
export const UserEdit = ({ user }: UserEditProps) => {
  const [editUser] = useEditUserMutation();
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(user.positionId || "");
  const labelId = `checkbox-list-secondary-label-${user.userId}`;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data);
    editUser({
      userId: user.userId,
      positionId: position,
      fullName: data.get("fullname"),
      updated: `${Date.now()}`,
      contract: data.get("contract"),
      username: data.get("email"),
      password: "firstpw\n",
      role: data.get("role"),
      positionName: null,
      positionRate: null,
      isDisabled: user.isDisabled,
    })
      .then(() => setOpen(false))
      .catch((error) => console.log(error));
  };

  return (
    <ListItem
      sx={{
        borderRadius: "5px",
        mb: 1,
        ":last-child": { mb: 0 },
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#404040" : "#e0e0e0",
      }}
      key={user.userId}
      secondaryAction={
        <Chip
          sx={{ display: { xs: "none", sm: "inline-flex" } }}
          onClick={() => editUser({ ...user, isDisabled: !user.isDisabled })}
          label={user.isDisabled ? "Отключена" : "Активная"}
          color={user.isDisabled ? "error" : "success"}
        />
      }
      disablePadding
    >
      <ListItemButton
        sx={{
          ":hover": {
            borderRadius: "5px",
          },
        }}
        onClick={() => setOpen(true)}
      >
        <ListItemAvatar>
          <Avatar sx={{ width: 30, height: 30 }} variant="rounded" />
        </ListItemAvatar>
        <ListItemText
          id={labelId}
          primary={user.fullName}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {user.username}
              </Typography>
              {` — ${user.role}`}
            </React.Fragment>
          }
        />
      </ListItemButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ textAlign: "center", pr: 7, pl: 7 }}>
            Редактирование учётки
          </DialogTitle>
          <DialogContent>
            <TextField
              required
              sx={{ mt: 1 }}
              defaultValue={user.username}
              autoFocus
              label="Почта"
              type="email"
              fullWidth
              variant="standard"
              name="email"
            />
            <TextField
              required
              sx={{ mt: 1 }}
              defaultValue={user.fullName}
              label="ФИО"
              type="text"
              fullWidth
              variant="standard"
              name="fullname"
            />
            <TextField
              required
              sx={{ mt: 1, mb: 1 }}
              defaultValue={user.contract}
              label="Контракт"
              type="text"
              fullWidth
              variant="standard"
              name="contract"
            />
            <PositionSelect position={position} setPosition={setPosition} />
            <RoleSelect defaultRole={user.role || ""} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Закрыть</Button>
            <Button type="submit">Сохранить</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </ListItem>
  );
};

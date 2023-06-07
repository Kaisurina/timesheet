import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { RoleSelect } from "shared/ui";
import { PositionSelect } from "shared/ui";
import { usersApi } from "entities/user/api/userService";
import { useState } from "react";

export const UserCreate = () => {
  const [position, setPosition] = useState("");
  const [open, setOpen] = useState(false);
  const [createUser] = usersApi.useCreateNewUserMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    createUser({
      positionId: data.get("position"),
      fullName: data.get("fullname"),
      updated: `${Date.now()}`,
      username: data.get("email"),
      password: data.get("password"),
      role: data.get("role"),
      contract: data.get("contract"),
      isDisabled: false,
    })
      .then(() => setOpen(false))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Button size="small" variant="contained" onClick={() => setOpen(true)}>
        + Аккаунт
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ textAlign: "center" }}>
            Создание учётной записи
          </DialogTitle>
          <DialogContent>
            <TextField
              required
              sx={{ mt: 1 }}
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
              label="ФИО"
              type="text"
              fullWidth
              variant="standard"
              name="fullname"
            />
            <TextField
              required
              sx={{ mt: 1 }}
              label="Контракт"
              type="text"
              fullWidth
              variant="standard"
              name="contract"
            />
            <TextField
              required
              sx={{ mt: 1, mb: 1 }}
              label="Пароль"
              type="text"
              fullWidth
              variant="standard"
              name="password"
            />
            <PositionSelect position={position} setPosition={setPosition} />
            <RoleSelect />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Закрыть</Button>
            <Button type="submit">Создать</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

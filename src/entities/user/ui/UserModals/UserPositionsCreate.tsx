import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { usersApi } from "entities/user/api/userService";

export const UserPositionsCreate = () => {
  const [open, setOpen] = useState(false);
  const [createPosition] = usersApi.useCreateNewPositionMutation();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    createPosition({
      positionDepartment: data.get("department") as string,
      positionName: data.get("name") as string,
      positionRate: +`${data.get("rate")}`,
    })
      .then(() => setOpen(false))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <Button size="small" variant="contained" onClick={() => setOpen(true)}>
        + Позиция
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ textAlign: "center" }}>
            Создание позиции
          </DialogTitle>
          <DialogContent>
            <TextField
              required
              sx={{ mt: 1 }}
              autoFocus
              label="Название позиции"
              type="text"
              fullWidth
              variant="standard"
              name="name"
            />
            <TextField
              required
              sx={{
                mt: 1,
                "input::-webkit-outer-spin-button": {
                  WebkitAppearance: "none",
                  margin: 0,
                },
              }}
              label="Ставка"
              type="number"
              fullWidth
              variant="standard"
              name="rate"
            />
            <TextField
              required
              sx={{ mt: 1 }}
              label="Департамент"
              type="text"
              fullWidth
              variant="standard"
              name="department"
            />
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

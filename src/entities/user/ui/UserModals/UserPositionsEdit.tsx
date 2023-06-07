import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { IPositionsState } from "entities/user/model";
import { usersApi } from "entities/user/api/userService";
type UserPositionsEditProps = {
  position: IPositionsState;
};
export const UserPositionsEdit = ({ position }: UserPositionsEditProps) => {
  const [open, setOpen] = useState(false);
  const [editPosition] = usersApi.useEditPositionMutation();
  const labelId = `checkbox-list-secondary-label-${position.id}`;
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    editPosition({
      id: position.id,
      positionDepartment: data.get("department") as string,
      positionName: data.get("name") as string,
      positionRate: +`${data.get("rate")}`,
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
      key={position.id}
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
        <ListItemText
          id={labelId}
          primary={position.positionName}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {position.positionDepartment}
              </Typography>
              {` — ${position.positionRate} р/ч`}
            </React.Fragment>
          }
        />
      </ListItemButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogTitle sx={{ textAlign: "center", pr: 7, pl: 7 }}>
            Редактирование позиции
          </DialogTitle>
          <DialogContent>
            <TextField
              required
              sx={{ mt: 1 }}
              defaultValue={position.positionName}
              autoFocus
              label="Название позиции"
              type="text"
              fullWidth
              variant="standard"
              name="name"
            />
            <TextField
              required
              sx={{ mt: 1 }}
              defaultValue={position.positionRate}
              label="Ставка"
              type="number"
              fullWidth
              variant="standard"
              name="rate"
            />
            <TextField
              required
              sx={{ mt: 1 }}
              defaultValue={position.positionDepartment}
              label="Департамент"
              type="text"
              fullWidth
              variant="standard"
              name="department"
            />
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

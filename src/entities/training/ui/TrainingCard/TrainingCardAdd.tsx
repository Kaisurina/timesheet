import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import AddCircle from "@mui/icons-material/AddCircle";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

export const TrainingCardAdd = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // createUser({
    //   positionId: data.get("position"),
    //   fullName: data.get("fullname"),
    //   updated: `${Date.now()}`,
    //   username: data.get("email"),
    //   password: data.get("password"),
    //   role: data.get("role"),
    //   contract: data.get("contract"),
    //   isDisabled: false,
    // })
    //   .then(() => setOpen(false))
    //   .catch((error) => console.log(error));
  };

  return (
    <>
      <Card sx={{ borderRadius: "15px" }} variant="outlined">
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
            <AddCircle
              sx={{ width: "60px", height: "60px" }}
              color="disabled"
            />
          </CardContent>
        </CardActionArea>
      </Card>
      <Dialog
        fullWidth
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="training-dialog-title"
        aria-describedby="training-dialog-description"
      >
        <DialogTitle sx={{ pb: 0 }} textAlign="center">
          Создание тренинга
        </DialogTitle>
        <Box onSubmit={handleSubmit} component="form">
          <DialogContent sx={{ pb: 0 }}>
            <Stack justifyContent="space-between" direction="row">
              <Box
                flexDirection="column"
                display="flex"
                justifyContent="space-between"
                gap={2}
                width="100%"
                p={1}
              >
                <TextField
                  required
                  fullWidth
                  id="training-create-name"
                  label="Название"
                  maxRows={2}
                  multiline
                  variant="filled"
                />
                <TextField
                  fullWidth
                  id="training-create-description"
                  label="Описание"
                  multiline
                  maxRows={4}
                  variant="filled"
                />
                <TextField
                  required
                  fullWidth
                  type="url"
                  id="training-create-linkMeet"
                  label="Ссылка на встречу"
                  variant="filled"
                />
                <TextField
                  required
                  type="url"
                  fullWidth
                  id="training-create-linkTg"
                  label="Ссылка на группу тг"
                  variant="filled"
                />
                <Stack gap={1} direction="row">
                  <TextField
                    required
                    type="number"
                    fullWidth
                    id="training-create-level"
                    label="Неделя тренинга"
                    variant="filled"
                  />
                  <TextField
                    required
                    type="number"
                    fullWidth
                    id="training-create-maxParticipants"
                    label="Кол-во участников"
                    variant="filled"
                  />
                </Stack>
                <TextField
                  required
                  fullWidth
                  id="training-create-group"
                  label="Группа тренинга"
                  variant="filled"
                />
                <DateTimePicker
                  slotProps={{ textField: { variant: "filled" } }}
                  value={dayjs.utc()}
                  label="Дата тренинга *"
                />
              </Box>
            </Stack>
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

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
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { Dayjs } from "dayjs";
import { useCreateTrainingMutation } from "entities/training/api/trainingService";
import { IUsersState } from "entities/user/model";
import { usersApi } from "entities/user/api/userService";

export const TrainingCardAdd = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [createTraining] = useCreateTrainingMutation();
  const [mentor, setMentor] = useState<IUsersState | null>(null);
  const { data } = usersApi.useGetAllUsersQuery();
  const isFullNameRepeated = (data: IUsersState[], fullName: string) => {
    const count = data.filter((option) => option.fullName === fullName).length;
    return count > 1;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    createTraining({
      trainingId: "",
      name: `${data.get("trainingName")}`,
      description: `${data.get("trainingDescription")}`,
      trainingDate: date,
      mentorId: `${mentor?.userId}`,
      maxParticipants: +`${data.get("trainingMaxParticipants")}`,
      linkTelegram: `${data.get("trainingTgLink")}`,
      level: +`${data.get("trainingLevel")}`,
      group: `${data.get("trainingGroup")}`,
    })
      .then(() => setOpen(false))
      .catch((error) => console.log(error));
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
                  name="trainingName"
                  required
                  fullWidth
                  id="training-create-name"
                  label="Название"
                  maxRows={2}
                  multiline
                  variant="filled"
                />
                <TextField
                  name="trainingDescription"
                  fullWidth
                  id="training-create-description"
                  label="Описание"
                  multiline
                  maxRows={4}
                  variant="filled"
                />

                <Stack gap={1} direction="row">
                  <TextField
                    name="trainingLevel"
                    required
                    type="number"
                    fullWidth
                    id="training-create-level"
                    label="Неделя тренинга"
                    variant="filled"
                  />
                  <TextField
                    name="trainingMaxParticipants"
                    required
                    type="number"
                    fullWidth
                    id="training-create-maxParticipants"
                    label="Кол-во участников"
                    variant="filled"
                  />
                </Stack>
                <Stack gap={1} direction="row">
                  <TextField
                    name="trainingTgLink"
                    required
                    type="url"
                    fullWidth
                    id="training-create-linkTg"
                    label="Ссылка на группу тг"
                    variant="filled"
                  />
                  <TextField
                    name="trainingGroup"
                    required
                    fullWidth
                    id="training-create-group"
                    label="Группа тренинга"
                    variant="filled"
                  />
                </Stack>

                <DateTimePicker
                  slotProps={{ textField: { variant: "filled" } }}
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  label="Дата тренинга *"
                />
                <Autocomplete
                  value={mentor}
                  onChange={(e, value: IUsersState | null) => {
                    setMentor(value);
                  }}
                  disablePortal
                  id="training-user-select"
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
                      option.fullName
                        .toLowerCase()
                        .includes(inputValue.toLowerCase())
                    );
                  }}
                  getOptionLabel={(option) => option.username}
                  size="small"
                  renderInput={(params) => (
                    <TextField
                      required
                      variant="filled"
                      sx={{ maxHeight: "50%" }}
                      {...params}
                      label="Наставник"
                    />
                  )}
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

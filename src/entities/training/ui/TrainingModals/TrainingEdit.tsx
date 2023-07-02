import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import FaceIcon from "@mui/icons-material/Face";
import Chip from "@mui/material/Chip";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import {
  useDeleteTrainingMutation,
  useEditTrainingMutation,
  useRemoveUserFromTrainingMutation,
} from "entities/training/api/trainingService";
import { ITraining } from "entities/training/model";
import { useState } from "react";
interface TrainingEditProps {
  training: ITraining;
  open: boolean;
  handleClose: () => void;
}

export const TrainingEdit = ({
  open,
  handleClose,

  training,
}: TrainingEditProps) => {
  const [deletedUsers, setDeletedUsers] = useState<Array<string>>([]);
  const [editTraining] = useEditTrainingMutation();
  const [deleteTraining] = useDeleteTrainingMutation();
  const [removeUser] = useRemoveUserFromTrainingMutation();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    deletedUsers.map((item) =>
      removeUser({
        userId: item,
        trainingId: training.trainingId,
      })
    );
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    editTraining({
      ...training,
      name: `${data.get("trainingName")}`,
      description: `${data.get("trainingDescription")}`,
      trainingDate: dayjs.utc(`${data.get("date")}`),
      maxParticipants: +`${data.get("trainingMaxParticipants")}`,
      linkTelegram: `${data.get("trainingTgLink")}`,
      mentorId: training.mentor.userId,
      // participants: training.participants.filter(
      //   (user) => !deletedUsers.some((excUsr) => user.userId.includes(excUsr))
      // ),
    })
      .then(() => {
        handleClose();
        setDeletedUsers([]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="training-edit-dialog-title"
      aria-describedby="training-edit-dialog-description"
    >
      <DialogTitle sx={{ pb: 0 }} textAlign="center">
        Управление тренингом
      </DialogTitle>
      <Box onSubmit={handleSubmit} component="form">
        <DialogContent sx={{ pb: 0 }}>
          <Stack justifyContent="space-between" direction="row">
            <Box
              flexDirection="column"
              display="flex"
              justifyContent="space-between"
              gap={2}
              width="50%"
              p={1}
            >
              <TextField
                name="trainingName"
                required
                fullWidth
                id="training-edit-name"
                label="Название"
                maxRows={3}
                multiline
                variant="filled"
                defaultValue={training.name}
              />
              <TextField
                name="trainingDescription"
                fullWidth
                id="training-edit-description"
                label="Описание"
                multiline
                maxRows={5}
                variant="filled"
                defaultValue={training.description}
              />
              <TextField
                name="trainingTgLink"
                required
                type="url"
                fullWidth
                id="training-edit-linkTg"
                label="Ссылка на группу тг"
                variant="filled"
                defaultValue={training.linkTelegram}
              />
              <TextField
                name="trainingMaxParticipants"
                required
                type="number"
                fullWidth
                id="training-create-maxParticipants"
                label="Кол-во участников"
                variant="filled"
                defaultValue={training.maxParticipants}
              />
              <DateTimePicker
                format="YYYY-MM-DD HH:mm"
                slotProps={{ textField: { variant: "filled", name: "date" } }}
                value={dayjs.utc(training.trainingDate)}
                label="Дата тренинга *"
              />
            </Box>
            <Box
              flexDirection="column"
              display="flex"
              gap={2}
              width="50%"
              p={1}
            >
              {training.participants.map((participant) => (
                <Chip
                  onDelete={() => {
                    deletedUsers.includes(participant.userId)
                      ? setDeletedUsers(
                          deletedUsers.filter((id) => id !== participant.userId)
                        )
                      : setDeletedUsers([...deletedUsers, participant.userId]);
                  }}
                  sx={{
                    textDecoration: deletedUsers.includes(participant.userId)
                      ? "line-through"
                      : "none",
                    "& .MuiChip-icon": { position: "absolute", left: 0 },
                    "& .MuiChip-deleteIcon": {
                      position: "absolute",
                      right: 0,
                    },
                  }}
                  key={participant.username}
                  clickable
                  icon={<FaceIcon />}
                  label={participant.fullName}
                />
              ))}
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", px: 2 }}>
          <Button
            onClick={() => {
              training && deleteTraining(training);
              handleClose();
            }}
            color="error"
          >
            Удалить тренинг
          </Button>
          <Box display="flex" gap={1}>
            <Button onClick={handleClose}>Закрыть</Button>
            <Button type="submit">Изменить</Button>
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

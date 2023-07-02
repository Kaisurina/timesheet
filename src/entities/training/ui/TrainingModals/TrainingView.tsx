import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Link from "@mui/material/Link";
import TelegramIcon from "@mui/icons-material/Telegram";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import { ITraining } from "entities/training/model";
import dayjs from "dayjs";
import {
  useAddUserToTrainingMutation,
  useRemoveUserFromTrainingMutation,
} from "entities/training/api/trainingService";
import { useAppSelector } from "shared/libs/redux";
interface TrainingViewProps {
  training: ITraining;
  open: boolean;
  handleClose: () => void;
}

export const TrainingView = ({
  open,
  handleClose,
  training,
}: TrainingViewProps) => {
  const [addUser] = useAddUserToTrainingMutation();
  const [removeUser] = useRemoveUserFromTrainingMutation();
  const user = useAppSelector((state) => state.user);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="training-view-dialog-title"
      aria-describedby="training-view-dialog-description"
    >
      <Box>
        <DialogContent sx={{ pb: 0 }}>
          <Typography align="center" gutterBottom variant="h5">
            {training.name}
          </Typography>
          <Typography variant="body2">{training.description}</Typography>
          <Typography variant="caption">
            Свободных мест:
            {training.maxParticipants - training.participants.length}
          </Typography>
          <Box sx={{ flexGrow: 1, pt: 1 }} />
          <Divider />
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={2}
            sx={{ p: 2 }}
          >
            <Stack direction="column" spacing={1}>
              <Stack alignItems="center" direction="row" spacing={1}>
                <AccessTimeIcon />
                <Typography
                  textAlign="start"
                  color="text.secondary"
                  display="inline"
                  variant="body2"
                >
                  {dayjs
                    .utc(training.trainingDate)
                    .locale("ru")
                    .format("DD MMMM в HH:mm")}
                </Typography>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={1}>
                <TelegramIcon />
                <Link
                  target="_blank"
                  href={training.linkTelegram}
                  underline="hover"
                  color="text.secondary"
                  rel="noopener"
                  variant="body2"
                >
                  Телеграм тренинга
                </Link>
              </Stack>
            </Stack>
            <Stack alignItems="center" direction="row" spacing={1}>
              <Avatar sx={{ height: 28, width: 28 }} />
              <Typography
                color="text.secondary"
                display="inline"
                variant="body2"
              >
                Наставник: <br /> {training.mentor.fullName}
              </Typography>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Box display="flex" gap={1}>
            <Button onClick={handleClose}>Закрыть</Button>
            {training.participants.some(
              (elem) => elem.userId === user.userId
            ) ? (
              <Button
                onClick={() => {
                  removeUser({
                    userId: user.userId,
                    trainingId: training.trainingId,
                  });
                  handleClose();
                }}
                color="error"
              >
                Не приду!
              </Button>
            ) : (
              <Button
                disabled={
                  training.maxParticipants <= training.participants.length
                }
                onClick={() => {
                  addUser({
                    userId: user.userId,
                    trainingId: training.trainingId,
                  });
                  handleClose();
                }}
                color="success"
              >
                Записаться на тренинг
              </Button>
            )}
          </Box>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

import { useState } from "react";
import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import FaceIcon from "@mui/icons-material/Face";
import Chip from "@mui/material/Chip";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { ITraining } from "entities/training/model";

interface TrainingCardProps {
  training: ITraining;
}

export const TrainingCard = ({ training }: TrainingCardProps) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ borderRadius: "15px" }} variant="outlined">
      <CardActionArea
        component="div"
        sx={{ position: "relative" }}
        onClick={() => {
          handleClickOpen();
        }}
      >
        <CardContent
          sx={{
            height: "180px",
            width: "282px",
            p: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            textOverflow="elipsis"
            maxHeight="80px"
            height="80px"
            width="85%"
            lineHeight="1.2"
            variant="subtitle1"
            component="div"
          >
            {training.name}
          </Typography>
          <IconButton
            size="small"
            sx={{ position: "absolute", right: 0, top: 0 }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <SettingsIcon />
          </IconButton>
          <Stack
            justifyContent="space-between"
            borderRadius="5px"
            p={0.5}
            gap={0.5}
            direction="row"
          >
            <Box
              minWidth={90}
              borderRadius="5px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bgcolor={(theme) =>
                theme.palette.mode === "dark" ? "#404040" : "background.default"
              }
            >
              <Typography
                p={0.5}
                lineHeight={1}
                textAlign="center"
                variant="subtitle2"
              >
                {training.participants.length > 4
                  ? `${training.participants.length} учеников`
                  : training.participants.length > 1
                  ? `${training.participants.length} ученика`
                  : "1 ученик"}
                <br />
                {dayjs.utc().locale("ru").format("DD MMMM HH:MM")}
              </Typography>
            </Box>
            <Box
              borderRadius="5px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bgcolor={(theme) =>
                theme.palette.mode === "dark" ? "#404040" : "background.default"
              }
            >
              <Typography
                p={0.5}
                lineHeight={1}
                textAlign="center"
                variant="subtitle2"
              >
                Наставник: {training.mentor.fullName}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
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
        <Box component="form">
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
                  fullWidth
                  id="training-edit-description"
                  label="Описание"
                  multiline
                  maxRows={5}
                  variant="filled"
                  defaultValue={training.description}
                />
                <TextField
                  required
                  fullWidth
                  type="url"
                  id="training-edit-linkMeet"
                  label="Ссылка на встречу"
                  variant="filled"
                  defaultValue={training.linkMeet}
                />
                <TextField
                  required
                  type="url"
                  fullWidth
                  id="training-edit-linkTg"
                  label="Ссылка на группу тг"
                  variant="filled"
                  defaultValue={training.linkTelegram}
                />
                <DateTimePicker
                  slotProps={{ textField: { variant: "filled" } }}
                  value={dayjs.utc()}
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
                    onDelete={() => {}}
                    sx={{
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
            <Button onClick={() => setOpen(false)} color="error">
              Удалить тренинг
            </Button>
            <Box display="flex" gap={1}>
              <Button onClick={() => setOpen(false)}>Закрыть</Button>
              <Button type="submit">Изменить</Button>
            </Box>
          </DialogActions>
        </Box>
      </Dialog>
    </Card>
  );
};

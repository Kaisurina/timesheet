import dayjs from "dayjs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import { ITraining } from "entities/training/model";
import { useAppSelector } from "shared/libs/redux";

interface TrainingCardProps {
  training: ITraining;
  handleEditOpen: (training: ITraining) => void;
  handleViewOpen: (training: ITraining) => void;
}

export const TrainingCard = ({
  training,
  handleEditOpen,
  handleViewOpen,
}: TrainingCardProps) => {
  const user = useAppSelector((state) => state.user);

  return (
    <Card sx={{ borderRadius: "15px" }} variant="outlined">
      <CardActionArea
        onClick={() => handleViewOpen(training)}
        component="div"
        sx={{ position: "relative" }}
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
          {(user.role === "SUPERVISOR" ||
            user.role === "MENTOR" ||
            user.role === "S4S") && (
            <IconButton
              size="small"
              sx={{ position: "absolute", right: 0, top: 0 }}
              onClick={(e) => {
                e.stopPropagation();
                handleEditOpen(training);
              }}
            >
              <SettingsIcon />
            </IconButton>
          )}
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
                  : training.participants.length === 0
                  ? "0 учеников"
                  : "1 ученик"}
                <br />
                {dayjs
                  .utc(training.trainingDate)
                  .locale("ru")
                  .format("DD MMMM HH:mm")}
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
    </Card>
  );
};

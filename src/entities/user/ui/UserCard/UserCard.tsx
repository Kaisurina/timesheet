import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import IconButton from "@mui/material/IconButton";
import { Table } from "shared/ui";
import { recordsApi } from "entities/record/api/recordService";
import { teamApi } from "entities/team/api/teamService";
import { ITeam } from "entities/team/model";

interface UserCardProps {
  card: ITeam;
  dates: { startDate: string; endDate: string };
  teamleaderId: string;
}

export const UserCard = ({ card, dates, teamleaderId }: UserCardProps) => {
  const { data, isFetching, isLoading, isUninitialized } =
    recordsApi.useGetRecordsByUserQuery({
      ...dates,
      userId: card.user.userId,
    });
  const [removeUser] = teamApi.useRemoveUserFromTeamMutation();
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
            height="80px"
            width="85%"
            lineHeight="1.2"
            variant="h6"
            component="div"
          >
            {card.user.fullName}
          </Typography>
          <IconButton
            size="small"
            sx={{ position: "absolute", right: 0, top: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              removeUser({ userId: card.user.userId, teamleaderId });
            }}
          >
            <CancelTwoToneIcon />
          </IconButton>
          <Stack
            border={card.confirmed ? "1px solid#73db6ad8" : "1px solid #DBAE6A"}
            borderRadius="5px"
            p={0.5}
            gap={0.5}
            direction="row"
            bgcolor={(theme) =>
              theme.palette.mode === "dark" ? "#404040" : "background.default"
            }
          >
            <Box
              width={62}
              p={0.5}
              borderRadius="5px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bgcolor={"background.paper"}
            >
              <Typography
                mb={1}
                lineHeight={1.1}
                textAlign="center"
                variant="body2"
              >
                Всего часов
              </Typography>
              <Typography
                lineHeight={1}
                textAlign="center"
                fontWeight={900}
                variant="h5"
              >
                {card.hours ? card.hours : "-"}
              </Typography>
            </Box>
            <Box
              width={62}
              p={0.5}
              borderRadius="5px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bgcolor={"background.paper"}
            >
              <Typography
                mb={1}
                lineHeight={1.1}
                textAlign="center"
                variant="body2"
              >
                Не своя позиция
              </Typography>
              <Typography
                lineHeight={1}
                textAlign="center"
                fontWeight={900}
                variant="h5"
              >
                {card.sideHours ? card.sideHours : "-"}
              </Typography>
            </Box>
            <Box
              width={62}
              p={0.5}
              borderRadius="5px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bgcolor={"background.paper"}
            >
              <Typography
                mb={1}
                lineHeight={1.1}
                textAlign="center"
                variant="body2"
                color={card.confirmed ? "#73db6ad8" : "#DBAE6A"}
              >
                Нет визы
              </Typography>
              <Typography
                lineHeight={1}
                textAlign="center"
                fontWeight={900}
                variant="h5"
                color={card.confirmed ? "#73db6ad8" : "#DBAE6A"}
              >
                {card.unconfirmedRecords ? card.unconfirmedRecords : "-"}
              </Typography>
            </Box>
            <Box
              width={62}
              p={0.5}
              borderRadius="5px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              bgcolor={"background.paper"}
            >
              <Typography
                noWrap
                lineHeight={1.1}
                textAlign="center"
                variant="body2"
              >
                1.5x
              </Typography>
              <Typography
                noWrap
                mb={1}
                lineHeight={1.1}
                textAlign="center"
                variant="body2"
              >
                2x
              </Typography>
              <Typography
                lineHeight={1}
                textAlign="center"
                fontWeight={900}
                variant="h5"
              >
                {card.overworkedHours ? card.overworkedHours : "-"}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
      <Dialog
        sx={{
          p: 1,
          "& .MuiDataGrid-virtualScroller": {
            overflowY: "auto !important",
            "::-webkit-scrollbar": {
              display: "none",
            },
          },
        }}
        maxWidth="xl"
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="user-dialog-title"
        aria-describedby="user-dialog-description"
      >
        <Typography textAlign="center" variant="h6">
          {card.user.fullName}
        </Typography>
        <Table
          loading={isFetching || isLoading || isUninitialized}
          user={card.user}
          data={data}
        />
      </Dialog>
    </Card>
  );
};

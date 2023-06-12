import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { Table } from "shared/ui";
import { recordsApi } from "entities/record/api/recordService";
import { teamApi } from "entities/team/api/teamService";
import { ITeam } from "entities/team/model";

interface UserCardProps {
  card: ITeam;
  value: { startDate: string; endDate: string };
  teamleaderId: string;
}

export const UserCard = ({ card, value, teamleaderId }: UserCardProps) => {
  const { data } = recordsApi.useGetRecordsByUserQuery({
    ...value,
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
    <Card>
      <CardActionArea
        sx={{ position: "relative" }}
        onClick={() => {
          handleClickOpen();
        }}
      >
        <CardContent
          sx={{
            height: "220px",
            width: "234px",
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
            sx={{ position: "absolute", right: 0, top: 0 }}
            onClick={(e) => {
              e.stopPropagation();
              removeUser({ userId: card.user.userId, teamleaderId });
            }}
          >
            <CloseIcon />
          </IconButton>
          <List
            sx={{
              m: 0,
              p: 0,
            }}
          >
            <ListItem
              sx={{
                p: 0,
                ".MuiListItemSecondaryAction-root": {
                  right: 0,
                },
              }}
              secondaryAction={
                <Chip
                  size="small"
                  label={card.hours === 0 ? "0" : card.hours}
                />
              }
            >
              <ListItemText secondary="Всего часов" />
            </ListItem>
            <ListItem
              sx={{
                p: 0,
                ".MuiListItemSecondaryAction-root": {
                  right: 0,
                },
              }}
              secondaryAction={
                <Chip
                  size="small"
                  label={card.sideHours === 0 ? "0" : card.sideHours}
                />
              }
            >
              <ListItemText secondary="Не своя позиция" />
            </ListItem>
          </List>
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
        <Table user={card.user} data={data} />
      </Dialog>
    </Card>
  );
};

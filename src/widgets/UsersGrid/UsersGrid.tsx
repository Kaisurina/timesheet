import { useState } from "react";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { MonthPicker } from "shared/ui";
import { Table } from "shared/ui";
import { UserCard } from "entities/user/ui";
import { UserCardAdd } from "entities/user/ui";
import dayjs, { Dayjs } from "dayjs";
import { teamApi } from "entities/team/api/teamService";
import { useAppSelector } from "shared/libs/redux";
import { recordsApi } from "entities/record/api/recordService";
import { IUsersState } from "entities/user/model";

export const UsersGrid = () => {
  const [cardUser, setCardUser] = useState<IUsersState | null>(null);
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState<Dayjs | null>(dayjs());
  const user = useAppSelector((state) => state.user);
  const team = teamApi.useGetTeamByUserQuery({
    startDate: `${dayjs(dates).format("YYYY-MM")}-01`,
    endDate: `${dayjs(dates).add(1, "month").format("YYYY-MM")}-01`,
    teamleaderId: user.userId,
  });
  const userRecord = recordsApi.useGetRecordsByUserQuery({
    startDate: `${dayjs(dates).format("YYYY-MM")}-01`,
    endDate: `${dayjs(dates).add(1, "month").format("YYYY-MM")}-01`,
    userId: cardUser?.userId || user.userId,
  });
  const handleClickOpen = (user: IUsersState) => {
    setCardUser(user);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  if (userRecord.error || team.error) {
    return (
      <div>
        {(JSON.stringify(userRecord.error), JSON.stringify(team.error))}
      </div>
    );
  }
  if (
    userRecord.isLoading ||
    userRecord.isUninitialized ||
    team.isLoading ||
    team.isUninitialized
  ) {
    return (
      <div>
        <CircularProgress
          sx={{
            position: "absolute",
            top: "33%",
            left: "50%",
            ml: "-3rem",
            mt: "-3rem",
          }}
          size={"6rem"}
        />
      </div>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Box
          sx={{ bgcolor: "background.paper", p: 1, borderRadius: "5px", mb: 1 }}
        >
          <MonthPicker value={dates} setValue={setDates} />
        </Box>
        <Grid justifyContent="center" container spacing={2}>
          {team.data.map((card) => (
            <Grid key={card.user.userId} item>
              <UserCard
                handleClickOpen={handleClickOpen}
                card={card}
                teamleaderId={user.userId}
              />
            </Grid>
          ))}
          <Grid item>
            <UserCardAdd teamleaderId={user.userId} />
          </Grid>
        </Grid>
      </Box>
      <Dialog
        sx={{
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
        <Typography
          bgcolor={"background.paper"}
          textAlign="center"
          variant="h6"
        >
          {cardUser?.fullName || ""}
        </Typography>
        <Table
          loading={userRecord.isFetching}
          user={cardUser}
          data={userRecord.data}
        />
      </Dialog>
    </>
  );
};

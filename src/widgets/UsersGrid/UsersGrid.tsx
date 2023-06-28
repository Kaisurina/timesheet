import { useState } from "react";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Table } from "shared/ui";
import { Dayjs } from "dayjs";
import { UserCard } from "entities/user/ui";
import { UserCardAdd } from "entities/user/ui";
import { teamApi } from "entities/team/api/teamService";
import { useAppSelector } from "shared/libs/redux";
import { recordsApi } from "entities/record/api/recordService";
import { IUsersState } from "entities/user/model";
interface UsersGridProps {
  endDate: Dayjs | null;
  startDate: Dayjs | null;
}
export const UsersGrid = ({ startDate, endDate }: UsersGridProps) => {
  const [cardUser, setCardUser] = useState<IUsersState | null>(null);
  const [open, setOpen] = useState(false);

  const user = useAppSelector((state) => state.user);
  const team = teamApi.useGetTeamByUserQuery({
    startDate: `${startDate?.format("YYYY-MM-DD")}`,
    endDate: `${endDate?.format("YYYY-MM-DD")}`,
    teamleaderId: user.userId,
  });
  const userRecord = recordsApi.useGetRecordsByUserQuery({
    startDate: `${startDate?.format("YYYY-MM-DD")}`,
    endDate: `${endDate?.format("YYYY-MM-DD")}`,
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
      {team.isFetching ? (
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
      ) : (
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
      )}
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

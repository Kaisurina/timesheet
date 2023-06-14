import Grid from "@mui/material/Grid";
import { teamApi } from "entities/team/api/teamService";
import { UserCard } from "entities/user/ui";
import { UserCardAdd } from "entities/user/ui";
import { useAppSelector } from "shared/libs/redux";

interface UsersGridProps {
  dates: {
    startDate: string;
    endDate: string;
  };
}

export const UsersGrid = ({ dates }: UsersGridProps) => {
  const user = useAppSelector((state) => state.user);
  const { data } = teamApi.useGetTeamByUserQuery({
    ...dates,
    teamleaderId: user.userId,
  });
  return (
    <Grid justifyContent="center" container spacing={2}>
      {data &&
        data.map((card) => [
          <Grid key={card.user.userId} item>
            <UserCard card={card} dates={dates} teamleaderId={user.userId} />
          </Grid>,
        ])}
      <Grid item>
        <UserCardAdd teamleaderId={user.userId} />
      </Grid>
    </Grid>
  );
};

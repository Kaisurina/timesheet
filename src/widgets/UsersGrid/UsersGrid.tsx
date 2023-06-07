import Grid from "@mui/material/Grid";
import { teamApi } from "entities/team/api/teamService";
import { UserCard } from "entities/user/ui";
import { UserCardAdd } from "entities/user/ui";
import { useAppSelector } from "shared/libs/redux";

export const UsersGrid = ({ value }: any) => {
  const user = useAppSelector((state) => state.user);
  const { data } = teamApi.useGetTeamByUserQuery({
    ...value,
    teamleaderId: user.userId,
  });
  return (
    <Grid justifyContent="center" container spacing={2}>
      {data &&
        data.map((card) => [
          <Grid key={card.user.userId} item>
            <UserCard card={card} value={value} teamleaderId={user.userId} />
          </Grid>,
        ])}
      <Grid item>
        <UserCardAdd teamleaderId={user.userId} />
      </Grid>
    </Grid>
  );
};

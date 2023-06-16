import { Dispatch, SetStateAction } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { usersApi } from "entities/user/api/userService";

type PositionSelectProps = {
  position: number | string;
  setPosition?: Dispatch<SetStateAction<any>>;
  disabled?: Boolean;
};

export const PositionSelect = ({
  position = "",
  setPosition,
  disabled,
}: PositionSelectProps) => {
  const positions = usersApi.useGetAllUsersPositionsQuery("");
  return positions.data ? (
    <FormControl required variant="standard" fullWidth>
      <InputLabel id="position-select-label">Позиция</InputLabel>
      <Select
        disabled={Boolean(disabled)}
        name="position"
        labelId="position-select-label"
        id="position-select"
        value={position}
        label="Позиция"
        onChange={(e) => setPosition && setPosition(e.target.value)}
      >
        {positions.data?.map((position) => (
          <MenuItem key={position.id} value={position.id}>
            <Tooltip
              enterDelay={700}
              followCursor
              title={position.positionName}
            >
              <Typography noWrap textOverflow="ellipsis">
                {position.positionName}
              </Typography>
            </Tooltip>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  ) : (
    <Skeleton height={32} width={200}></Skeleton>
  );
};

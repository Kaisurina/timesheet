import { useState } from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { UserPositionsCreate, UserPositionsEdit } from "entities/user/ui";
import { IPositionsState } from "entities/user/model";

interface PositionsListProps {
  positions: IPositionsState[];
}

export const PositionsList = ({ positions }: PositionsListProps) => {
  const [data, setData] = useState(positions);

  return (
    <Box>
      <Box
        sx={{
          borderRadius: "5px",
          bgcolor: "background.paper",
          p: 1,
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          onChange={(e) => {
            setData(
              positions.filter((item) =>
                item.positionName
                  ?.toLowerCase()
                  .includes(e.target.value.toLowerCase())
              )
            );
          }}
          sx={{ mr: 2, width: { xs: "80px", sm: "auto" } }}
          size="small"
          label="Позиция"
          variant="outlined"
        />
        <UserPositionsCreate />
      </Box>
      <List
        dense
        sx={{
          display: data.length === 0 ? "none" : null,
          p: 1,
          borderRadius: "5px",
          bgcolor: "background.paper",
          maxHeight: "64vh",
          overflow: "auto",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {data.map((position) => {
          return <UserPositionsEdit key={position.id} position={position} />;
        })}
      </List>
    </Box>
  );
};

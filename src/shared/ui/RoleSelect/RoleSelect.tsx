import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

interface RoleSelectProps {
  defaultRole?: string;
}

export const RoleSelect = ({ defaultRole = "" }: RoleSelectProps) => {
  const [role, setRole] = useState(defaultRole);
  return (
    <FormControl required sx={{ mt: 1, mb: 1 }} variant="standard" fullWidth>
      <InputLabel id="select-role-label">Роль</InputLabel>
      <Select
        name="role"
        labelId="select-role-label"
        id="select-role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        label="role"
      >
        <MenuItem value="USER">Оператор</MenuItem>
        <MenuItem value="TEAMLEAD">Тимлид</MenuItem>
        <MenuItem value="SUPERVISOR">Супервайзер</MenuItem>
        <MenuItem value="S4S">Sup4Sup</MenuItem>
      </Select>
    </FormControl>
  );
};

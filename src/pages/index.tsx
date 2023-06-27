import Employees from "./employees";
import Accounting from "./accounting";
import Faq from "./faq";
import Auth from "./auth";
import Teams from "./teams";
import Timesheet from "./timesheet";
import Trainings from "./trainings";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";
import { IUsersState } from "entities/user/model";
import { useAppSelector } from "shared/libs/redux";

export const Routing = () => {
  const user = useAppSelector((state: { user: IUsersState }) => state.user);

  return (
    <Box sx={{ m: 2, display: "flex" }}>
      <Container maxWidth="xl">
        <Routes>
          {Boolean(user.token) ? (
            <>
              <Route path="/" element={<Faq></Faq>} />
              {(user.role === "SUPERVISOR" || user.role === "S4S") && (
                <>
                  <Route
                    path="/accounting"
                    element={<Accounting></Accounting>}
                  />
                  <Route path="/employees" element={<Employees></Employees>} />
                </>
              )}
              <Route path="/teams" element={<Teams></Teams>} />
              <Route path="/trainings" element={<Trainings></Trainings>} />
              <Route path="/:id" element={<Timesheet></Timesheet>} />
            </>
          ) : (
            <Route path="*" element={<Auth></Auth>} />
          )}
        </Routes>
      </Container>
    </Box>
  );
};

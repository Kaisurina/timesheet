import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { IUsersState } from "entities/user/model";
import { useAppSelector } from "shared/libs/redux";

const Timesheet = lazy(() => import("./timesheet"));
const Operators = lazy(() => import("./operators"));
const Faq = lazy(() => import("./faq"));
const Accounting = lazy(() => import("./accounting"));
const Auth = lazy(() => import("./auth"));
const Employees = lazy(() => import("./employees"));
const Teams = lazy(() => import("./teams"));

export const Routing = () => {
  const user = useAppSelector((state: { user: IUsersState }) => state.user);

  return (
    <Box sx={{ m: 2, display: "flex" }}>
      <Container maxWidth="xl">
        <Routes>
          {Boolean(user.token) ? (
            <>
              <Route path="/" element={<Faq></Faq>} />
              <Route path="/accounting" element={<Accounting></Accounting>} />
              <Route path="/operators" element={<Operators></Operators>} />
              <Route path="/employees" element={<Employees></Employees>} />
              <Route path="/teams" element={<Teams></Teams>} />
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

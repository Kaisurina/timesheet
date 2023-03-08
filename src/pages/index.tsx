import { IUsersState } from "entities/user/model";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "shared/libs/redux";

const Timesheet = lazy(() => import("./timesheet"));
const Operators = lazy(() => import("./operators"));
const Faq = lazy(() => import("./faq"));
const Accounting = lazy(() => import("./accounting"));
const Auth = lazy(() => import("./auth"));

export const Routing = () => {
  const user = useAppSelector((state: { user: IUsersState }) => state.user);

  return (
    <Routes>
      {Boolean(user.token) ? (
        <>
          <Route path="/" element={<Faq></Faq>} />
          <Route path="/accounting" element={<Accounting></Accounting>} />
          <Route path="/operators" element={<Operators></Operators>} />
          <Route path="/:id" element={<Timesheet></Timesheet>} />
        </>
      ) : (
        <Route path="*" element={<Auth></Auth>} />
      )}
    </Routes>
  );
};

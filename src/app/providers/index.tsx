import compose from "compose-function";
import { withDayjs } from "./with-dayjs";
import { withRouter } from "./with-router";
import { withStore } from "./with-store";
import { withTheme } from "./with-theme";

export const withProviders = compose(
  withStore,
  withDayjs,
  withTheme,
  withRouter
);

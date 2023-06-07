import compose from "compose-function";
import { withRouter } from "./with-router";
import { withStore } from "./with-store";
import { withTheme } from "./with-theme";

export const withProviders = compose(withStore, withTheme, withRouter);

import { IUsersState } from "./../../user/model/user";

export interface ITeam {
  user: IUsersState;
  hours: number;
  sideHours: number;
  overworkedHours: number;
  unconfirmedRecords: number;
  confirmed: boolean;
}

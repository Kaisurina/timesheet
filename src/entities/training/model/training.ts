import { IUsersState } from "./../../user/model/user";
import { Dayjs } from "dayjs";

export interface ITraining {
  id: string;
  name: string;
  description: string;
  date: Dayjs | null;
  mentor: IUsersState;
  participants: Array<IUsersState>;
  maxParticipants: number;
  linkTelegram: string;
  level: number;
  group: string;
}

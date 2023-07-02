import { IUsersState } from "./../../user/model/user";
import { Dayjs } from "dayjs";

export interface ITraining {
  trainingId: string;
  name: string;
  description: string;
  trainingDate: Dayjs | null | string;
  mentorId: string;
  mentor: IUsersState;
  participants: Array<IUsersState>;
  maxParticipants: number;
  linkTelegram: string;
  level: number;
  group: string;
}

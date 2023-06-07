import { Dayjs } from "dayjs";

export interface ITimesheetRecord {
  updated: string;
  userId: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  positionName?: string;
  positionRate?: string;
  positionId: number;
  isConfirmed: Boolean;
  isDeleted: Boolean;
  is15x: Boolean;
  is20x: Boolean;
  id?: string;
  comment?: string | null;
}

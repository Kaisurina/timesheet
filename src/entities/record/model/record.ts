import { Dayjs } from "dayjs";

export interface ITimesheetRecord {
  updated: string;
  userId: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  positionId: number;
  isConfirmed: Boolean;
  isDeleted: Boolean;
  is15x: Boolean;
  is20x: Boolean;
  positionName?: string;
  positionRate?: string;
  id?: string;
  comment?: string | null;
}

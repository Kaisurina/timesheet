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
  hours?: number;
  confirmationTime?: string;
  confirmedBy?: string;
  positionName?: string;
  positionRate?: string;
  id?: string;
  comment?: string | null;
}

export interface IAccounting {
  fullName: string;
  position: string;
  email: string;
  contract: string;
  positionRate: number;
  hours: number;
  mentoringHours: number;
  overworkedHours: number;
  hours15x: number;
  hours20x: number;
}

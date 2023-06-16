import dayjs, { Dayjs } from "dayjs";

export const hoursConverter = (startDate: Dayjs, endDate: Dayjs): Dayjs => {
  if (dayjs.utc(endDate).diff(startDate, "minutes") > 1440) {
    endDate = dayjs
      .utc(endDate)
      .add(-dayjs.utc(endDate).diff(startDate, "days"), "day");
  }
  if (dayjs.utc(endDate).diff(startDate, "minutes") < 0) {
    endDate = dayjs
      .utc(endDate)
      .add(-dayjs.utc(endDate).diff(startDate, "days") + 1, "day");
  }
  return endDate;
};

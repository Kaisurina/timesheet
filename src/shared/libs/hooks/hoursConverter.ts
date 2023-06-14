import dayjs, { Dayjs } from "dayjs";

export const hoursConverter = (startDate: Dayjs, endDate: Dayjs): Dayjs => {
  // if (dayjs.utc(endDate).format("hh:mm") === "12:00") {
  //   endDate = dayjs.utc(dayjs.utc(endDate).format("YYYY-MM-DDT23:59:59Z"));
  // }
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
  // if (dayjs.utc(endDate).add(1, "second").isBefore(dayjs.utc(startDate))) {
  //   endDate = dayjs.utc(endDate).add(1, "day");
  // }
  // if (
  //   dayjs.utc(endDate).diff(startDate, "hours") > 23 ||
  //   dayjs.utc(endDate).diff(startDate, "hours") < 0
  // ) {
  //   console.log(
  //     dayjs.utc(
  //       `${dayjs.utc(startDate).format("YYYY-MM-DDT")}${dayjs
  //         .utc(endDate)
  //         .format("HH:mm:ss")}-00:00`
  //     )
  //   );
  //   endDate = dayjs.utc(
  //     `${dayjs.utc(startDate).format("YYYY-MM-DDT")}${dayjs
  //       .utc(endDate)
  //       .format("HH:mm:ss")}`
  //   );
  // }
  return endDate;
};

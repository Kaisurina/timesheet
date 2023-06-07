import { fetchRecordById } from "entities/timesheetrecord/model";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "shared/libs/redux";

const Timesheet = () => {
  const dispatch = useAppDispatch();
  const record = useAppSelector((state) => state.record);
  useEffect(() => {
    dispatch(fetchRecordById());
  }, [dispatch]);

  return <div>{JSON.stringify(record)}</div>;
};
export default Timesheet;

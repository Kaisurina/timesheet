import { ITimesheetRecord } from "../model";
import { baseApi } from "shared/api";

export const recordsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecordsByUser: builder.query<Array<ITimesheetRecord>, any>({
      query: (value) => ({
        url: `/timesheet_records`,
        method: "POST",
        body: {
          ...value,
        },
      }),
      providesTags: ["Record"],
    }),
    createRecord: builder.mutation<ITimesheetRecord, ITimesheetRecord>({
      query: (record) => ({
        url: `/timesheet_records/create_record`,
        method: "POST",
        body: {
          ...record,
        },
      }),
      invalidatesTags: ["Record", "Team"],
    }),
    updateRecord: builder.mutation<Array<ITimesheetRecord>, ITimesheetRecord>({
      query: (body) => ({
        url: `/timesheet_records/${body.id}`,
        method: "PATCH",
        body: {
          ...body,
        },
      }),
      invalidatesTags: ["Record", "Team"],
    }),
    deleteRecord: builder.mutation<null, string>({
      query: (id) => ({
        url: `/timesheet_records/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Record", "Team"],
    }),
  }),
});

export const {
  useGetRecordsByUserQuery,
  useUpdateRecordMutation,
  useCreateRecordMutation,
  useDeleteRecordMutation,
} = recordsApi;

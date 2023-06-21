import { ITimesheetRecord } from "../model";
import { baseApi } from "shared/api";

export const recordsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRecordsByUser: builder.query<
      Array<ITimesheetRecord>,
      {
        userId: string;
        startDate: string;
        endDate: string;
      }
    >({
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
      invalidatesTags: ["Record"],
    }),
    updateRecord: builder.mutation<Array<ITimesheetRecord>, ITimesheetRecord>({
      query: (record) => ({
        url: `/timesheet_records/${record.id}`,
        method: "PATCH",
        body: {
          ...record,
        },
      }),
      invalidatesTags: ["Record", "Team"],
    }),
    deleteRecord: builder.mutation<void, string>({
      query: (id) => ({
        url: `/timesheet_records/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Record"],
    }),
    getExcel: builder.mutation<
      void,
      {
        startDate: string;
        endDate: string;
      }
    >({
      query: (dates) => ({
        url: `/timesheet_records/accounting`,
        method: "POST",
        body: {
          ...dates,
        },
      }),
    }),
  }),
});

export const {
  useGetRecordsByUserQuery,
  useUpdateRecordMutation,
  useCreateRecordMutation,
  useGetExcelMutation,
  useDeleteRecordMutation,
} = recordsApi;

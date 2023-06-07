import { baseApi } from "shared/api";
import { ITeam } from "../model";

export const teamApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeamByUser: builder.query<Array<ITeam>, any>({
      query: (value) => ({
        url: `/teams/get`,
        method: "POST",
        body: {
          ...value,
        },
      }),
      providesTags: ["Team"],
    }),
    addUserToTeam: builder.mutation<
      void,
      { userId: string; teamleaderId: string }
    >({
      query: (record) => ({
        url: `/teams/add`,
        method: "POST",
        body: {
          ...record,
        },
      }),
      invalidatesTags: ["Team"],
    }),
    removeUserFromTeam: builder.mutation<
      void,
      { userId: string; teamleaderId: string }
    >({
      query: (record) => ({
        url: `/teams/remove`,
        method: "POST",
        body: {
          ...record,
        },
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});

export const {
  useGetTeamByUserQuery,
  useAddUserToTeamMutation,
  useRemoveUserFromTeamMutation,
} = teamApi;

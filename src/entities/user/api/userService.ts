import { baseApi } from "shared/api";
import { IPositionsState } from "./../model/user";
import { IUsersState } from "../model";
export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query<Array<IUsersState>, void>({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    createNewUser: builder.mutation<Array<IUsersState>, any>({
      query: (user) => ({
        url: `/users/registration`,
        method: "POST",
        body: {
          ...user,
        },
      }),
      invalidatesTags: ["Users"],
    }),

    editUser: builder.mutation<Array<IUsersState>, any>({
      query: (user) => ({
        url: `/users/edit/${user.userId}`,
        method: "POST",
        body: {
          ...user,
        },
      }),
      invalidatesTags: ["Users", "Team"],
    }),
    getAllUsersPositions: builder.query<Array<IPositionsState>, void>({
      query: () => ({
        url: `/users/positions/all`,
        method: "GET",
      }),
      providesTags: ["Positions"],
    }),
    createNewPosition: builder.mutation<
      Array<IPositionsState>,
      IPositionsState
    >({
      query: (position) => ({
        url: `/users/positions/add`,
        method: "POST",
        body: {
          ...position,
        },
      }),
      invalidatesTags: ["Positions"],
    }),
    editPosition: builder.mutation<Array<IPositionsState>, any>({
      query: (position) => ({
        url: `/users/positions/edit`,
        method: "POST",
        body: {
          ...position,
        },
      }),
      invalidatesTags: ["Positions"],
    }),
    deletePosition: builder.mutation<Array<IPositionsState>, string>({
      query: (positionId) => ({
        url: `/users/positions/delete/${positionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Positions"],
    }),
  }),
});
export const {
  useGetAllUsersQuery,
  useGetAllUsersPositionsQuery,
  useCreateNewUserMutation,
  useEditUserMutation,
  useEditPositionMutation,
} = usersApi;

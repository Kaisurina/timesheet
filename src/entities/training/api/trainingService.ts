import { baseApi } from "shared/api";
import { ITraining } from "../model";

export const trainingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrainings: builder.query<Array<ITraining>, void>({
      query: () => ({
        url: `/training`,
        method: "GET",
      }),
      providesTags: ["Training"],
    }),
    createTraining: builder.mutation<
      ITraining,
      Omit<ITraining, "participants" | "mentor">
    >({
      query: (training) => ({
        url: `/training/create`,
        method: "POST",
        body: {
          ...training,
        },
      }),
      invalidatesTags: ["Training"],
    }),
    editTraining: builder.mutation<
      ITraining,
      Omit<ITraining, "mentor" | "level" | "group" | "trainingId">
    >({
      query: (training) => ({
        url: `/training/edit`,
        method: "POST",
        body: {
          ...training,
        },
      }),
      invalidatesTags: ["Training"],
    }),
    addUserToTraining: builder.mutation<null, any>({
      query: (training) => ({
        url: `/training/add_user`,
        method: "POST",
        body: {
          ...training,
        },
      }),
      invalidatesTags: ["Training"],
    }),
    removeUserFromTraining: builder.mutation<null, any>({
      query: (training) => ({
        url: `/training/remove_user`,
        method: "DELETE",
        body: {
          ...training,
        },
      }),
      invalidatesTags: ["Training"],
    }),
    deleteTraining: builder.mutation<null, ITraining>({
      query: (training) => ({
        url: `/training/delete/${training.trainingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Training"],
    }),
  }),
});

export const {
  useGetTrainingsQuery,
  useCreateTrainingMutation,
  useEditTrainingMutation,
  useDeleteTrainingMutation,
  useAddUserToTrainingMutation,
  useRemoveUserFromTrainingMutation,
} = trainingApi;

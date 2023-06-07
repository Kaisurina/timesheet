import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRecordById = createAsyncThunk(
  "record/fetchById",
  async () => {
    const response = await fetch(
      `http://116.203.51.68/api/collections/touvre/records?filter=(id_users='407n1xj266hxass')`,
      {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2xsZWN0aW9uSWQiOiJfcGJfdXNlcnNfYXV0aF8iLCJleHAiOjE2Nzk0NzU1MzUsImlkIjoidDI1dmdzbmRjczJ1MXFvIiwidHlwZSI6ImF1dGhSZWNvcmQifQ.LGbLWOWEoYPd00Y6ftBxQ70hckffus8jv0BGbCHCT0E",
        },
      }
    );
    return await response.json();
  }
);

export interface ITimesheetRecord {
  updated: Date;
  id: string;
  userId: string;
  hours: number;
  comment: string | null;
  startDate: Date;
  endDate: Date;
  positionName: string;
  positionRate: string;
  isConfirmed: Boolean;
  isDeleted: Boolean;
  is15x: Boolean;
  is20x: Boolean;
  loading: "loading" | "finished" | "error";
}

const initialState: Array<ITimesheetRecord> = [];

export const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRecordById.pending, (state, action) => {
      state.map((item) => (item.loading = "loading"));
    });
    builder.addCase(fetchRecordById.fulfilled, (state, action) => {
      action.payload.items.map((item: ITimesheetRecord) => state.push(item));
      state.map((item) => (item.loading = "finished"));
    });
    builder.addCase(fetchRecordById.rejected, (state, action) => {
      state.map((item) => (item.loading = "error"));
    });
  },
});

export const {} = recordSlice.actions;
export default recordSlice.reducer;

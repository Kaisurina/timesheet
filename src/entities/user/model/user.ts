import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginByFormData = createAsyncThunk(
  "users/login",
  async (data: FormData) => {
    const response = await fetch(
      `http://116.203.51.68/api/collections/users/auth-with-password`,
      {
        method: `post`,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identity: data.get("email"),
          password: data.get("password"),
        }),
      }
    );
    return await response.json();
  }
);

export interface IUsersState {
  updated: Date | null;
  full_name: string | null;
  token: string | null;
  id: string | null;
  role: string | null;
  position_name: string | null;
  position_rate: number | null;
  contract: string | null;
  loading: "loading" | "finished" | "error";
}

const initialState: IUsersState = {
  updated: null,
  full_name: null,
  token: null,
  id: null,
  role: null,
  position_name: null,
  position_rate: null,
  contract: null,
  loading: "finished",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setActiveUser(state, action) {
      state.updated = action.payload.updated;
      state.full_name = action.payload.full_name;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.role = action.payload.role;
      state.position_name = action.payload.position_name;
      state.position_rate = action.payload.position_rate;
    },
    removeActiveUser(state) {
      state.updated = null;
      state.full_name = null;
      state.token = null;
      state.id = null;
      state.role = null;
      state.position_name = null;
      state.position_rate = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginByFormData.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(loginByFormData.fulfilled, (state, action) => {
      state.updated = action.payload.record.updated;
      state.full_name = action.payload.record.full_name;
      state.token = action.payload.token;
      state.id = action.payload.record.id;
      state.role = action.payload.record.role;
      state.position_name = action.payload.record.position_name;
      state.position_rate = action.payload.record.position_rate;
      state.loading = "finished";
    });
    builder.addCase(loginByFormData.rejected, (state, action) => {
      state.loading = "error";
    });
  },
});

export const { setActiveUser, removeActiveUser } = userSlice.actions;
export default userSlice.reducer;

import {
  createAsyncThunk,
  createSlice,
  createListenerMiddleware,
  type TypedStartListening,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "app/store";
import { invalidateAccessToken } from "shared/api";

export const loginThunk = createAsyncThunk(
  "user/login",
  async (data: FormData) => {
    const response = await fetch(`http://128.140.91.138:9000/api/users/login`, {
      method: `POST`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.get("email"),
        password: data.get("password"),
      }),
    });
    return await response.json();
  }
);

export const logoutThunk = createAsyncThunk<void, void, { state: RootState }>(
  "user/logout",
  async (_: unknown, { dispatch }) => {
    dispatch(removeActiveUser());
  }
);

export const invalidateAccessTokenListener = createListenerMiddleware();
export type TypedListening = TypedStartListening<RootState, AppDispatch>;
export const startInvalidateAccessTokenListener =
  invalidateAccessTokenListener.startListening as TypedListening;

startInvalidateAccessTokenListener({
  actionCreator: invalidateAccessToken,
  effect: async (_, api) => {
    // some reauth logic
    api.dispatch(logoutThunk());
  },
});

export interface IUsersState {
  updated: string;
  fullName: string;
  token: string;
  userId: string;
  role: string;
  positionId: number;
  contract: string;
  isDisabled: boolean;
  username: string;
  loading?: "loading" | "finished" | "error";
}

export interface IPositionsState {
  id?: number;
  positionDepartment: string;
  positionName: string;
  positionRate: number;
  loading?: "loading" | "finished" | "error";
}

const initialState: IUsersState = {
  updated: "",
  fullName: "",
  token: "",
  userId: "",
  role: "",
  contract: "",
  positionId: 0,
  isDisabled: false,
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeActiveUser(state) {
      state.updated = "";
      state.fullName = "";
      state.token = "";
      state.userId = "";
      state.role = "";
      state.username = "";
      state.positionId = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.pending, (state, action) => {
      state.loading = "loading";
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      if (action.payload.hasOwnProperty("errorCode")) {
        state.loading = "error";
      } else {
        state.username = action.payload.second.username;
        state.positionId = action.payload.second.positionId;
        state.updated = action.payload.second.updated;
        state.fullName = action.payload.second.fullName;
        state.token = action.payload.first.accessToken;
        state.userId = action.payload.second.userId;
        state.role = action.payload.second.role;
        state.contract = action.payload.second.contract;
        state.loading = "finished";
      }
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = "error";
    });
  },
});

export const { removeActiveUser } = userSlice.actions;
export default userSlice.reducer;

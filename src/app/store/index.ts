import {
  configureStore,
  ThunkAction,
  Action,
  Reducer,
  AnyAction,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer, {
  invalidateAccessTokenListener,
} from "entities/user/model/user";
import themeReducer, { IThemeState } from "entities/theme/model/theme";
import { IUsersState } from "entities/user/model/user";
import { baseApi } from "shared/api";

const userConfig = {
  key: "user",
  storage,
};

const themeConfig = {
  key: "theme",
  storage,
};

const store = configureStore({
  reducer: {
    user: persistReducer(userConfig, userReducer) as unknown as Reducer<
      IUsersState,
      AnyAction
    >,
    theme: persistReducer(themeConfig, themeReducer) as unknown as Reducer<
      IThemeState,
      AnyAction
    >,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware, invalidateAccessTokenListener.middleware),
});

export const persistor = persistStore(store);
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import {
  configureStore,
  ThunkAction,
  Action,
  Reducer,
  AnyAction,
} from "@reduxjs/toolkit";
import userReducer from "entities/user/model/user";
import recordReducer from "entities/timesheetrecord/model/record";
import themeReducer, { ITheme } from "entities/theme/model/theme";
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
import { IUsersState } from "entities/user/model/user";
import storage from "redux-persist/lib/storage";

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
      ITheme,
      AnyAction
    >,
    record: recordReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
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

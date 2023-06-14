import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../store";

export const withStore = (Component: React.ComponentType) => () =>
  (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Component />
      </PersistGate>
    </Provider>
  );

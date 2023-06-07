import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "../store";

export const withStore = (Component: React.ComponentType) => () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component />
      </PersistGate>
    </Provider>
  );
};

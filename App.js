import { StatusBar } from "expo-status-bar";
import { ModalPortal } from "react-native-modals";
import { Provider } from "react-redux";

import Navigation from "./src/infrastructure/navigation";
import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import store from "./src/services/redux/store";

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Provider store={store}>
        <AuthenticationContextProvider>
          <Navigation />
          <ModalPortal />
        </AuthenticationContextProvider>
      </Provider>
    </>
  );
}

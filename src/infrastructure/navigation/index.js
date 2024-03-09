import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";

import AccountNavigation from "./account.navigation";
import AppNavigation from "./app.navigation";
import { AuthenticationContext } from "../../services/authentication/authentication.context";

const Navigation = () => {
  const { authToken } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {authToken ? <AppNavigation /> : <AccountNavigation />}
    </NavigationContainer>
  );
};

export default Navigation;

import { NavigationContainer } from "@react-navigation/native";
import AccountNavigation from "./account.navigation";

const Navigation = () => {
  return (
    <NavigationContainer>
      <AccountNavigation />
    </NavigationContainer>
  );
};

export default Navigation;

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../screens/login.screen";
import RegisterScreen from "../../screens/register.screen";

const StackNavigation = createNativeStackNavigator();

const AccountNavigation = () => {
  return (
    <StackNavigation.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigation.Screen name="Login" component={LoginScreen} />
      <StackNavigation.Screen name="Register" component={RegisterScreen} />
    </StackNavigation.Navigator>
  );
};

export default AccountNavigation;

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/Home.screen";
import ProductInfoScreen from "../../screens/ProductInfo.screen";

const StackNavigation = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <StackNavigation.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigation.Screen name="Home" component={HomeScreen} />
      <StackNavigation.Screen
        name="ProductInfo"
        component={ProductInfoScreen}
      />
    </StackNavigation.Navigator>
  );
};

export default HomeNavigation;

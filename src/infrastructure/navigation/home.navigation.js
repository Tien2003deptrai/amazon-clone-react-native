import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../../screens/Home.screen";
import ProductInfoScreen from "../../screens/ProductInfo.screen";
import AddAddressScreen from "../../screens/AddAddressScreen";

const StackNavigation = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <StackNavigation.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigation.Screen name="Home" component={HomeScreen} />
      <StackNavigation.Screen
        name="ProductInfo"
        component={ProductInfoScreen}
      />
      <StackNavigation.Screen name="AddAddress" component={AddAddressScreen} />
    </StackNavigation.Navigator>
  );
};

export default HomeNavigation;

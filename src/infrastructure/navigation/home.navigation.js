import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddAddressScreen from "../../screens/AddAddress.screen";
import AddressScreen from "../../screens/Address.screen";
import HomeScreen from "../../screens/Home.screen";
import ProductInfoScreen from "../../screens/ProductInfo.screen";

const StackNavigation = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <StackNavigation.Navigator screenOptions={{ headerShown: false }}>
      {/* <StackNavigation.Screen name="Home" component={HomeScreen} />
      <StackNavigation.Screen
        name="ProductInfo"
        component={ProductInfoScreen}
      /> */}
      <StackNavigation.Screen name="AddAddress" component={AddAddressScreen} />
      <StackNavigation.Screen name="Address" component={AddressScreen} />
    </StackNavigation.Navigator>
  );
};

export default HomeNavigation;

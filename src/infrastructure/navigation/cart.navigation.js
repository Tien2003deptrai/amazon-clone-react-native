import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BuyConfirmationScreen from "../../screens/BuyConfirmation.screen";
import CartScreen from "../../screens/Cart.screen";
import OrderPlacedScreen from "../../screens/OrderPlaced.screen";

const StackNavigation = createNativeStackNavigator();

const CartNavigation = () => {
  return (
    <StackNavigation.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigation.Screen name="Cart" component={CartScreen} />
      <StackNavigation.Screen
        name="BuyConfirmation"
        component={BuyConfirmationScreen}
      />
      <StackNavigation.Screen
        name="OrderPlaced"
        component={OrderPlacedScreen}
      />
    </StackNavigation.Navigator>
  );
};

export default CartNavigation;

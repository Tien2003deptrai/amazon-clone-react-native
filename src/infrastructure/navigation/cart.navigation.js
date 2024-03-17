import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "../../screens/Cart.screen";
import BuyConfirmationScreen from "../../screens/BuyConfirmation.screen";

const StackNavigation = createNativeStackNavigator();

const CartNavigation = () => {
  return (
    <StackNavigation.Navigator screenOptions={{ headerShown: false }}>
      <StackNavigation.Screen name="Cart" component={CartScreen} />
      <StackNavigation.Screen
        name="BuyConfirmation"
        component={BuyConfirmationScreen}
      />
    </StackNavigation.Navigator>
  );
};

export default CartNavigation;

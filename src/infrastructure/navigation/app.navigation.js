import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CartNavigation from "./cart.navigation";
import HomeNavigation from "./home.navigation";
import ProfileNavigation from "./profile.navigation";

const TabNavigation = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <TabNavigation.Navigator screenOptions={{ headerShown: false }}>
      <TabNavigation.Screen
        name="HomeTab"
        component={HomeNavigation}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            color: "#008E97",
          },
          tabBarIcon: ({ focused, size }) =>
            focused ? (
              <Entypo name="home" size={size} color="#008E97" />
            ) : (
              <AntDesign name="home" size={size} color="black" />
            ),
        }}
      />
      <TabNavigation.Screen
        name="ProfileTab"
        component={ProfileNavigation}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: {
            color: "#008E97",
          },
          tabBarIcon: ({ focused, size }) =>
            focused ? (
              <Ionicons name="person" size={size} color="#008E97" />
            ) : (
              <Ionicons name="person-outline" size={size} color="black" />
            ),
        }}
      />
      <TabNavigation.Screen
        name="CartTab"
        component={CartNavigation}
        options={{
          tabBarLabel: "Cart",
          tabBarLabelStyle: {
            color: "#008E97",
          },
          tabBarIcon: ({ focused, size }) =>
            focused ? (
              <AntDesign name="shoppingcart" size={size} color="#008E97" />
            ) : (
              <AntDesign name="shoppingcart" size={size} color="black" />
            ),
        }}
      />
    </TabNavigation.Navigator>
  );
};

export default AppNavigation;

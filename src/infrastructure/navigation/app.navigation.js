import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../../screens/Home.screen";

const TabNavigation = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <TabNavigation.Navigator screenOptions={{ headerShown: false }}>
      <TabNavigation.Screen
        name="Home"
        component={HomeScreen}
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
        name="Profile"
        component={HomeScreen}
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
        name="Cart"
        component={HomeScreen}
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

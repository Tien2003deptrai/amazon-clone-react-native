import { apiBaseUrl, apiVersion, ENV } from "@env";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";

import { AuthenticationContext } from "../services/authentication/authentication.context";

import { orders as mockOrders } from "@/mock";

const ProfileScreen = () => {
  const [loading, setLoading] = useState(false);
  const { authToken, setAuthToken } = useContext(AuthenticationContext);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    // perform some action to directly interacts with the DOM
    navigation.setOptions({
      headerTitle: "",
      headerStyle: { backgroundColor: "#00CED1" },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />

          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  const isFocused = useIsFocused();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      if (ENV === "preview") {
        setOrders(mockOrders);
        return;
      }

      try {
        setLoading(true);
        const userEndpoint = `${apiBaseUrl}/${apiVersion}/users/${authToken.userId}`;
        const ordersEndpoint = `${apiBaseUrl}/${apiVersion}/order/${authToken.userId}`;

        const userResponse = await fetch(userEndpoint, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken.token}`,
          },
        });
        const ordersResponse = await fetch(ordersEndpoint, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken.token}`,
          },
        });

        if (
          userResponse.status === 401 ||
          userResponse.status === 404 ||
          ordersResponse.status === 401 ||
          ordersResponse.status === 404
        ) {
          throw new Error("Unauthorized access.");
        }
        const userData = await userResponse.json();
        const ordersData = await ordersResponse.json();
        setUser(userData.user);
        setOrders(ordersData.orders);
      } catch (error) {
        alert(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) {
      fetchUserAndOrders();
    }
  }, [isFocused]);

  const logout = async () => {
    await AsyncStorage.removeItem("@authToken");
    setAuthToken(null);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 10, backgroundColor: "white" }}>
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>
        Welcome {user?.name || "Test mode name"}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Your orders</Text>
        </Pressable>

        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Your Account</Text>
        </Pressable>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
        }}
      >
        <Pressable
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Buy Again</Text>
        </Pressable>

        <Pressable
          onPress={logout}
          style={{
            padding: 10,
            backgroundColor: "#E0E0E0",
            borderRadius: 25,
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center" }}>Logout</Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {loading ? (
          <Text>Loading...</Text>
        ) : orders.length > 0 ? (
          orders.map((order, index) => (
            <Pressable
              style={{
                marginTop: 20,
                padding: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#d0d0d0",
                marginHorizontal: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              key={index}
            >
              {order.products.slice(0, 3)?.map((product, index) => (
                <View style={{ marginVertical: 10 }} key={index}>
                  <Image
                    source={{ uri: product.image }}
                    style={{ width: 100, height: 100, resizeMode: "contain" }}
                  />
                </View>
              ))}
            </Pressable>
          ))
        ) : (
          <Text>No orders found</Text>
        )}
      </ScrollView>
    </ScrollView>
  );
};

export default ProfileScreen;

import { apiBaseUrl, apiVersion } from "@env";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";

import Header from "../components/header.component";
import SafeArea from "../components/safearea.component";
import { AuthenticationContext } from "../services/authentication/authentication.context";

const AddAddressScreen = () => {
  const { authToken } = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const fetchAddressesEndpoint = `${apiBaseUrl}/${apiVersion}/address/addresses/${authToken.userId}`;
        console.log(fetchAddressesEndpoint);
        const response = await fetch(fetchAddressesEndpoint, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken.token}`,
          },
        });

        if (response.status === 401 || response.status === 404) {
          throw new Error("Unauthorized access.");
        }

        const data = await response.json();
        setAddresses(data.addresses);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchAddresses();
  }, []);

  return (
    <SafeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Your Addresses
          </Text>

          <Pressable
            onPress={() => navigation.navigate("Address")}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              paddingVertical: 7,
              paddingHorizontal: 5,
            }}
          >
            <Text>Add a new Address</Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="black"
            />
          </Pressable>

          <Pressable>{/* List of available addresses */}</Pressable>
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default AddAddressScreen;

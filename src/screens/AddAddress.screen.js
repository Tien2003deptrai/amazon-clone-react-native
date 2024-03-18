import { apiBaseUrl, apiVersion, ENV } from "@env";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";

import Header from "../components/header.component";
import SafeArea from "../components/safearea.component";
import { AuthenticationContext } from "../services/authentication/authentication.context";

const AddAddressScreen = () => {
  const { authToken } = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    const fetchAddresses = async () => {
      if (ENV === "preview") {
        setAddresses([
          {
            name: "User name",
            mobileNumber: "29301928392",
            houseNumber: "903/930",
            street: "Street Name",
            landmark: "Landmark",
            city: "City",
            state: "State",
            country: "India",
            postalCode: "829183",
            _id: { $oid: "65f6e66f583fb2762a5d8b4f" },
          },
        ]);
        return;
      }

      try {
        const fetchAddressesEndpoint = `${apiBaseUrl}/${apiVersion}/address/addresses/${authToken.userId}`;
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

    if (isFocused) {
      fetchAddresses();
    }
  }, [isFocused]);

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

          {addresses.map((address) => (
            <Pressable
              key={address._id}
              style={{
                borderWidth: 1,
                borderColor: "#D0D0D0",
                padding: 10,
                alignItems: "center",
                gap: 5,
                marginVertical: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
              >
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  {address?.name}
                </Text>
                <Entypo name="location-pin" size={24} color="red" />
              </View>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {address?.houseNumber}, {address?.landmark}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {address?.street}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                {address?.country}, {address?.city}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                Phone no: {address?.mobileNumber}
              </Text>

              <Text style={{ fontSize: 15, color: "#181818" }}>
                Pincode: {address?.postalCode}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 7,
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderWidth: 0.9,
                    borderRadius: 5,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Edit</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderWidth: 0.9,
                    borderRadius: 5,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Remove</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: "#F5F5F5",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderWidth: 0.9,
                    borderRadius: 5,
                    borderColor: "#D0D0D0",
                  }}
                >
                  <Text>Set as Default</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default AddAddressScreen;

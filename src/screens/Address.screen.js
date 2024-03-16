import { apiBaseUrl, apiVersion } from "@env";
import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { View, Text, ScrollView, TextInput, Pressable } from "react-native";

import SafeArea from "../components/safearea.component";
import { AuthenticationContext } from "../services/authentication/authentication.context";

const AddressScreen = () => {
  const { authToken } = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    country: "India",
    name: "",
    mobileNumber: "",
    houseNumber: "",
    street: "",
    area: "",
    landmark: "",
    postalCode: "",
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const addAddress = async () => {
    try {
      if (loading) return;
      setLoading(true);
      const { country, name, mobileNumber } = formData;

      if (
        country.trim() === "" ||
        name.trim() === "" ||
        mobileNumber.trim() === ""
      ) {
        throw new Error("Country, name and mobile number can't be empty.");
      }

      const addAdrressEndpoint = `${apiBaseUrl}/${apiVersion}/address/${authToken.userId}`;
      const response = await fetch(addAdrressEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken.token}`,
        },
        body: JSON.stringify({
          userId: authToken.userId,
          address: formData,
        }),
      });

      if (response.status === 401 || response.status === 404) {
        throw new Error("Unauthorized access.");
      }
      const data = await response.json();
      setFormData({
        country: "India",
        city: "",
        name: "",
        mobileNumber: "",
        houseNumber: "",
        area: "",
        landmark: "",
        pincode: "",
      });
      alert(data.message);

      setTimeout(() => {
        navigation.goBack();
      }, 500);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeArea>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ height: 50, backgroundColor: "#00CED1" }} />

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: "bold" }}>
            Add a new Address
          </Text>

          <TextInput
            value={formData.country}
            onChangeText={(text) => handleChange("country", text)}
            placeholder="India"
            placeholderTextColor="black"
            style={{
              padding: 10,
              borderColor: "#D0D0D0",
              borderWidth: 1,
              marginTop: 10,
              borderRadius: 5,
            }}
          />

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>City</Text>
            <TextInput
              value={formData.city}
              onChangeText={(text) => handleChange("city", text)}
              placeholderTextColor="black"
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Full Name</Text>
            <TextInput
              value={formData.name}
              onChangeText={(text) => handleChange("name", text)}
              placeholderTextColor="black"
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
              placeholder="Enter your first and last name"
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Mobile number
            </Text>
            <TextInput
              keyboardType="numeric"
              value={formData.mobileNumber}
              onChangeText={(text) => handleChange("mobileNumber", text)}
              placeholderTextColor="black"
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              House number, Flat, Building or Company
            </Text>
            <TextInput
              value={formData.houseNumber}
              onChangeText={(text) => handleChange("houseNumber", text)}
              placeholderTextColor="black"
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Area, Sector or Village
            </Text>
            <TextInput
              value={formData.area}
              onChangeText={(text) => handleChange("area", text)}
              placeholderTextColor="black"
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Street</Text>
            <TextInput
              value={formData.street}
              onChangeText={(text) => handleChange("street", text)}
              placeholderTextColor="black"
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>Landmark</Text>
            <TextInput
              value={formData.landmark}
              onChangeText={(text) => handleChange("landmark", text)}
              placeholderTextColor="black"
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 15, fontWeight: "bold" }}>
              Postal Code
            </Text>
            <TextInput
              value={formData.postalCode}
              onChangeText={(text) => handleChange("postalCode", text)}
              placeholderTextColor="black"
              style={{
                padding: 10,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
                borderRadius: 5,
              }}
            />
          </View>

          <Pressable
            onPress={addAddress}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Add Address</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default AddressScreen;

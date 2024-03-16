import { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { apiBaseUrl, apiVersion } from "@env";

import SafeArea from "../components/safearea.component";
import { AuthenticationContext } from "../services/authentication/authentication.context";

const AddressScreen = () => {
  const { authToken } = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    country: "India",
    name: "",
    mobileNumber: "",
    houseNumber: "",
    area: "",
    landmark: "",
    pincode: "",
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

      const addAdrressEndpoint = `${apiBaseUrl}/${apiVersion}/addresses/${authToken.userId}`;
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeArea>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : null}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 70}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
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
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                Full Name
              </Text>
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
                Area, Street, Sector or Village
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
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>Pincode</Text>
              <TextInput
                value={formData.pincode}
                onChangeText={(text) => handleChange("pincode", text)}
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
      </KeyboardAvoidingView>
    </SafeArea>
  );
};

export default AddressScreen;

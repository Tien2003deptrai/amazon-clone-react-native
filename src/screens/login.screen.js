import { apiBaseUrl, apiVersion } from "@env";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useState, useContext } from "react";
import {
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Text,
  Pressable,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";

import SafeArea from "../components/safearea.component";
import { AuthenticationContext } from "../services/authentication/authentication.context";

const LoginScreen = () => {
  const { setAuthToken } = useContext(AuthenticationContext);
  const [formData, setFormData] = useState({
    email: null,
    password: null,
  });
  const navigation = useNavigation();

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const login = () => {
    const { email, password } = formData;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format.");
      return;
    }

    const loginUserEndpoint = `${apiBaseUrl}/${apiVersion}/users/login`;
    fetch(loginUserEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        password,
      }),
    })
      .then((response) => {
        if (response.status === 404 || response.status === 400) {
          throw new Error("Incorrect credentials");
        }
        return response.json();
      })
      .then((data) => {
        setFormData({
          name: null,
          email: null,
        });
        AsyncStorage.setItem("authToken", data.token);
        setAuthToken(data.token);
      })
      .catch((error) => {
        alert(error.message || "Internal server error.");
      });
  };

  return (
    <SafeArea customStyles={{ alignItems: "center" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "position" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 70}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={{ alignItems: "center" }}>
              <Image
                style={{ width: 150, height: 100 }}
                source={require("@/assets/logo.png")}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: "bold",
                  marginTop: 12,
                  color: "#041E42",
                }}
              >
                Login In to your account
              </Text>
            </View>

            <View style={{ marginTop: 70 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  backgroundColor: "#D0D0D0",
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 30,
                }}
              >
                <MaterialIcons
                  style={{ marginLeft: 8 }}
                  name="email"
                  size={24}
                  color="gray"
                />
                <TextInput
                  value={formData.email}
                  onChangeText={(text) => handleChange("email", text)}
                  style={{
                    color: "gray",
                    marginVertical: 10,
                    width: 300,
                    fontSize: 16,
                  }}
                  placeholder="enter your email"
                />
              </View>
            </View>

            <View style={{ marginTop: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  backgroundColor: "#D0D0D0",
                  paddingVertical: 5,
                  borderRadius: 5,
                }}
              >
                <AntDesign
                  name="lock1"
                  size={24}
                  style={{ marginLeft: 8 }}
                  color="gray"
                />
                <TextInput
                  value={formData.password}
                  onChangeText={(text) => handleChange("password", text)}
                  secureTextEntry
                  style={{
                    color: "gray",
                    marginVertical: 10,
                    width: 300,
                    fontSize: 16,
                  }}
                  placeholder="enter your password"
                />
              </View>
            </View>

            <View
              style={{
                marginTop: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text>Keep me logged in</Text>
              <Text style={{ color: "#007FFF", fontWeight: "500" }}>
                Forgot Password?
              </Text>
            </View>

            <View style={{ marginTop: 80 }} />

            <Pressable
              onPress={login}
              style={{
                width: 200,
                backgroundColor: "#FEBE10",
                borderRadius: 6,
                marginLeft: "auto",
                marginRight: "auto",
                padding: 15,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                Login
              </Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Register")}
              style={{ marginTop: 15 }}
            >
              <Text
                style={{ textAlign: "center", color: "gray", fontSize: 16 }}
              >
                Don't have a account? Sign Up
              </Text>
            </Pressable>

            <View style={{ marginBottom: 80 }} />
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeArea>
  );
};

export default LoginScreen;

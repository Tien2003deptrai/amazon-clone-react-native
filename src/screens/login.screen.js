import React from "react";
import {
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SafeArea from "../components/safearea.component";

const LoginScreen = () => {
  return (
    <SafeArea customStyles={{ alignItems: "center" }}>
      <View>
        <Image
          style={{ width: 150, height: 100 }}
          source={require("@/assets/logo.png")}
        />
      </View>

      <KeyboardAvoidingView>
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
            <MaterialIcons name="email" size={24} color="black" />
            <TextInput style={{}} placeholder="enter your email" />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeArea>
  );
};

export default LoginScreen;

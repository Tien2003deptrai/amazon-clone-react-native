import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { Text } from "react-native";

import SafeArea from "../components/safearea.component";

const OrderPlacedScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const navigateHome = setTimeout(() => {
      navigation.replace("Cart");
      navigation.navigate("HomeTab", { screen: "Home" });
    }, 1300);

    return () => clearTimeout(navigateHome);
  }, []);

  return (
    <SafeArea>
      <LottieView
        source={require("@/assets/thumbs.json")}
        style={{
          height: 260,
          width: 300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Your Order Has been Recieved
      </Text>
      <LottieView
        source={require("@/assets/sparkle.json")}
        style={{
          height: 300,
          position: "absolute",
          top: 100,
          width: 300,
          alignSelf: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </SafeArea>
  );
};

export default OrderPlacedScreen;

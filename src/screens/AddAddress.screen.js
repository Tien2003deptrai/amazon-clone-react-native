import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, Pressable, TextInput } from "react-native";

import Header from "../components/header.component";
import SafeArea from "../components/safearea.component";

const AddAddressScreen = () => {
  const navigation = useNavigation();

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

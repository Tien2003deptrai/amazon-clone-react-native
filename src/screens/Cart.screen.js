import { Feather, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, ScrollView, Pressable, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import Header from "../components/header.component";
import SafeArea from "../components/safearea.component";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../services/redux/slices/cartSlice";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { cart } = useSelector((state) => state.cart);
  const total = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <SafeArea>
      <ScrollView>
        <Header />

        <View
          style={{ padding: 10, flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ fontSize: 18, fontWeight: "400" }}>Subtotal: </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {total} &#8377;
          </Text>
        </View>

        <Text style={{ marginHorizontal: 10 }}>EMI Details: NA</Text>

        {cart.length > 0 && (
          <Pressable
            onPress={() => navigation.navigate("BuyConfirmation")}
            style={{
              backgroundColor: "#FFC72C",
              padding: 10,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              marginHorizontal: 10,
              marginTop: 10,
            }}
          >
            <Text>Procced to Buy {cart.length} items</Text>
          </Pressable>
        )}

        <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 1,
            marginTop: 16,
          }}
        />

        <View style={{ marginHorizontal: 10 }}>
          {cart.map((item, index) => (
            <View
              style={{
                backgroundColor: "white",
                marginVertical: 10,
                borderBottomColor: "#F0F0F0",
                borderWidth: 2,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                borderTopWidth: 0,
              }}
              key={index}
            >
              <Pressable
                style={{
                  marginVertical: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Image
                    style={{ width: 140, height: 140 }}
                    resizeMode="contain"
                    source={{ uri: item?.image }}
                  />
                </View>

                <View>
                  <Text numberOfLines={3} style={{ width: 150, marginTop: 10 }}>
                    {item?.title}
                  </Text>

                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", marginTop: 6 }}
                  >
                    {item?.price} &#8377;
                  </Text>

                  <Image
                    style={{ width: 30, height: 30, resizeMode: "contain" }}
                    source={{
                      uri: "https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png",
                    }}
                  />
                  <Text style={{ color: "green" }}>In Stock</Text>
                </View>
              </Pressable>

              <View
                style={{
                  marginTop: 15,
                  marginBottom: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 7,
                  gap: 10,
                }}
              >
                {item.quantity > 1 ? (
                  <Pressable
                    onPress={() => dispatch(decreaseQuantity(item))}
                    style={{
                      backgroundColor: "#D8D8D8",
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <Feather name="minus" size={24} color="black" />
                  </Pressable>
                ) : (
                  <Pressable
                    onPress={() => {
                      dispatch(removeFromCart(item));
                    }}
                    style={{
                      backgroundColor: "#D8D8D8",
                      padding: 7,
                      borderTopLeftRadius: 6,
                      borderBottomLeftRadius: 6,
                    }}
                  >
                    <AntDesign name="delete" size={24} color="black" />
                  </Pressable>
                )}

                <Pressable
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 18,
                    paddingVertical: 6,
                  }}
                >
                  <Text>{item?.quantity}</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    dispatch(increaseQuantity(item));
                  }}
                  style={{
                    backgroundColor: "#D8D8D8",
                    padding: 7,
                    borderTopRightRadius: 6,
                    borderBottomRightRadius: 6,
                  }}
                >
                  <Text>
                    <Feather name="plus" size={24} color="black" />
                  </Text>
                </Pressable>

                <Pressable
                  onPress={() => dispatch(removeFromCart(item))}
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 8,
                    paddingVertical: 9,
                    borderRadius: 5,
                    borderColor: "#C0C0C0",
                    borderWidth: 0.6,
                  }}
                >
                  <Text>Delete</Text>
                </Pressable>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 15,
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 8,
                    paddingVertical: 9,
                    borderRadius: 5,
                    borderColor: "#C0C0C0",
                    borderWidth: 0.6,
                  }}
                >
                  <Text>Save For Later</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 8,
                    paddingVertical: 9,
                    borderRadius: 5,
                    borderColor: "#C0C0C0",
                    borderWidth: 0.6,
                  }}
                >
                  <Text>Save More Like This</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default CartScreen;

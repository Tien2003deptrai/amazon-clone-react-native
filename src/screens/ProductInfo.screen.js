import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ImageBackground,
  Pressable,
} from "react-native";
import { useDispatch } from "react-redux";

import Header from "../components/header.component";
import SafeArea from "../components/safearea.component";
import { addToCart } from "../services/redux/slices/cartSlice";

const ProductInfoScreen = () => {
  const dispatch = useDispatch();
  const route = useRoute();
  const [addedToCart, setAddedToCart] = useState(false);
  const { product } = route.params;

  //Set Width and height for a square image or a 1:1 aspect ratio
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;

  const addItemToCart = (product) => {
    if (!product) return;
    setAddedToCart(true);
    dispatch(addToCart(product));

    setTimeout(() => {
      setAddedToCart(false);
    }, 1600);
  };

  return (
    <SafeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        {/* Images */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {product?.carouselImages.map((image, index) => (
            <ImageBackground
              style={{ width, height, marginTop: 25 }}
              resizeMode="contain"
              source={{ uri: image }}
              key={index}
            >
              {/* Offer and share Icons */}
              {index === 0 && (
                <View
                  style={{
                    padding: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: "#C60C30",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "center",
                        fontWeight: "600",
                        fontSize: 12,
                      }}
                    >
                      20% off
                    </Text>
                  </View>

                  <View
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      backgroundColor: "#E0E0E0",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="share-variant"
                      size={24}
                      color="black"
                    />
                  </View>
                </View>
              )}

              {/* Heart Iocn */}
              {index === 0 && (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#E0E0E0",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    marginTop: "auto",
                    marginLeft: 12,
                    marginBottom: 20,
                  }}
                >
                  <AntDesign name="hearto" size={24} color="black" />
                </View>
              )}
            </ImageBackground>
          ))}
        </ScrollView>

        {/* Product Info */}
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "500" }}>
            {product?.title}
          </Text>

          <Text style={{ fontSize: 18, fontWeight: "600", marginTop: 6 }}>
            {product?.price} &#8377;
          </Text>
        </View>

        {/* Border */}
        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

        {/* Size and Color */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text>Text Color: </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {product?.color}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text>Size: </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {product?.size}
          </Text>
        </View>

        {/* Border */}
        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

        {/* Price and delivery */}
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 15, fontWeight: "bold", marginVertical: 5 }}>
            Total: {product?.price} &#8377;
          </Text>
          <Text style={{ color: "#00CED1" }}>
            Free Delivery Tommorow by 3PM.Order within 10hrs 30mins.
          </Text>

          <View
            style={{
              flexDirection: "row",
              marginVertical: 5,
              alignItems: "center",
              gap: 5,
            }}
          >
            <Ionicons name="location" size={24} color="black" />
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Deliver to name - City Pincode
            </Text>
          </View>
        </View>

        {/* Stock information */}
        <Text
          style={{ color: "green", marginHorizontal: 10, fontWeight: "500" }}
        >
          In Stock
        </Text>

        {/* Buy and cart button */}
        <Pressable
          onPress={() => addItemToCart(product)}
          style={{
            backgroundColor: "#FFC72C",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            margin: 10,
          }}
        >
          {addedToCart ? <Text>Added to cart</Text> : <Text>Add To Cart</Text>}
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#FFAC1C",
            padding: 10,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 10,
            marginVertical: 5,
          }}
        >
          <Text>Buy Now</Text>
        </Pressable>
      </ScrollView>
    </SafeArea>
  );
};

export default ProductInfoScreen;

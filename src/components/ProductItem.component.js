import { View, Text, Image, Pressable } from "react-native";

const ProductItem = ({ product }) => {
  return (
    <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
      <Image
        style={{ width: 150, height: 150 }}
        source={{ uri: product?.image }}
        resizeMode="contain"
      />
      <Text numberOfLines={1} style={{ width: 150, marginTop: 10 }}>
        {product?.title}
      </Text>

      <View
        style={{
          marginTop: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
          {product?.price} &#8377;
        </Text>
        <Text style={{ color: "#FFC72C", fontWeight: "bold" }}>
          {product?.rating?.rate}
        </Text>
      </View>

      <Pressable
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <Text>Add to Cart</Text>
      </Pressable>
    </Pressable>
  );
};

export default ProductItem;

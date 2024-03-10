import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import SafeArea from "../components/safearea.component";
import Header from "../components/header.component";
import { useRoute } from "@react-navigation/native";

const ProductInfoScreen = () => {
  const route = useRoute();
  const { product } = route.params;

  //Set Width and height for a square image or a 1:1 aspect ratio
  const { width } = Dimensions.get("window");
  const height = (width * 100) / 100;

  return (
    <SafeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

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

        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

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

        <Text style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1 }} />

        <View>
            
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default ProductInfoScreen;

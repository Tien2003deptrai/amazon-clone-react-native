import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import SafeArea from "../components/safearea.component";
import { SliderBox } from "react-native-image-slider-box";
import { categories, sliderImages, trendingDeals } from "@/mock";

const HomeScreen = () => {
  return (
    <SafeArea>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search Header Start */}
        <View
          style={{
            backgroundColor: "#00CED1",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginHorizontal: 7,
              gap: 10,
              backgroundColor: "white",
              borderRadius: 3,
              height: 38,
              flex: 1,
            }}
          >
            <AntDesign
              style={{ paddingLeft: 10 }}
              name="search1"
              size={22}
              color="black"
            />
            <TextInput placeholder="Search Amazon.in" />
          </Pressable>
          <Feather name="mic" size={24} color="black" />
        </View>

        {/* Adreess Section Start */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            padding: 10,
            backgroundColor: "#AFEEEE",
          }}
        >
          <Ionicons name="location-outline" size={24} color="black" />
          <Pressable>
            <Text style={{ fontSize: 13, fontWeight: 500 }}>
              Deliver to name - City Pincode
            </Text>
          </Pressable>

          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>

        {/* Categories Section */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((item) => (
            <Pressable
              key={item.id}
              style={{ margin: 10, justifyContent: "center" }}
            >
              <Image
                style={{ width: 50, height: 50 }}
                resizeMode="contain"
                source={{ uri: item?.image }}
              />
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  fontWeight: 500,
                  marginTop: 5,
                }}
              >
                {item.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Slider */}
        <SliderBox
          images={sliderImages}
          autoPlay
          circleLoop
          dotColor="#13274F"
          inactiveDotColor="#90A4AE"
          imageComponentStyle={{ width: "100%" }}
        />

        {/* Trending Deals */}
        <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
          Trending Deals of the week
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {trendingDeals.map((item) => (
            <Pressable
              key={item.id}
              style={{
                marginVertical: 10,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                style={{ width: 180, height: 180 }}
                resizeMode="contain"
                source={{ uri: item?.image }}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default HomeScreen;

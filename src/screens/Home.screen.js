import { fakeStoreProductApi } from "@env";
import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useState, useEffect, useCallback } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
} from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import DropDownPicker from "react-native-dropdown-picker";

import ErrorBoundary from "../components/ErrorBoundary.component";
import ProductItem from "../components/ProductItem.component";
import SafeArea from "../components/safearea.component";

import { categories, sliderImages, trendingDeals, todaysDeals } from "@/mock";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [category, setCategory] = useState("jewelery");
  const [dropdownCategories, setDropdownCategories] = useState([
    { label: "Men's clothing", value: "men's clothing" },
    { label: "jewelery", value: "jewelery" },
    { label: "electronics", value: "electronics" },
    { label: "women's clothing", value: "women's clothing" },
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(fakeStoreProductApi);
        if (!response.ok) {
          throw new Error("Error in fakestore API.");
        }
        const products = await response.json();
        setProducts(products);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchProducts();
  }, []);

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
                {item?.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Slider */}
        <ErrorBoundary>
          <SliderBox
            images={sliderImages}
            autoPlay
            circleLoop
            dotColor="#13274F"
            inactiveDotColor="#90A4AE"
            imageComponentStyle={{ width: "100%" }}
          />
        </ErrorBoundary>

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

        <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 2,
            marginTop: 15,
          }}
        />

        {/* Today's deals */}
        <Text style={{ padding: 10, fontSize: 18, fontWeight: "bold" }}>
          Today's Deals
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {todaysDeals.map((item) => (
            <Pressable
              key={item.id}
              style={{
                marginVertical: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={{ width: 150, height: 150 }}
                source={{ uri: item?.image }}
                resizeMode="contain"
              />

              <View
                style={{
                  backgroundColor: "#E31837",
                  paddingVertical: 5,
                  width: 130,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  borderRadius: 4,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 13,
                    fontWeight: "bold",
                  }}
                >
                  Upto {item?.offer}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <Text
          style={{
            height: 1,
            borderColor: "#D0D0D0",
            borderWidth: 2,
            marginTop: 15,
          }}
        />

        {/* Dropdown Picker for Product Filter */}
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            width: "45%",
            marginBottom: dropdownOpen ? 50 : 15,
          }}
        >
          <DropDownPicker
            style={{
              borderColor: "#B7B7B7",
              marginBottom: dropdownOpen ? 120 : 15,
            }}
            open={dropdownOpen}
            setOpen={setDropdownOpen}
            value={category}
            setValue={setCategory}
            items={dropdownCategories}
            setItems={setDropdownCategories}
            placeholder="Choose Category"
            zIndex={3000}
            zIndexInverse={1000}
            listMode="SCROLLVIEW"
          />
        </View>

        {/* Products List With Category Filter */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {products
            ?.filter((product) => product.category === category)
            .map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
        </View>
      </ScrollView>
    </SafeArea>
  );
};

export default HomeScreen;

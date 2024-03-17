import { fakeStoreProductApi, apiBaseUrl, apiVersion } from "@env";
import { Ionicons, MaterialIcons, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { Pressable, ScrollView, Text, View, Image } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SliderBox } from "react-native-image-slider-box";
import { BottomModal, ModalContent, SlideAnimation } from "react-native-modals";

import ErrorBoundary from "../components/ErrorBoundary.component";
import ProductItem from "../components/ProductItem.component";
import Header from "../components/header.component";
import SafeArea from "../components/safearea.component";
import { AuthenticationContext } from "../services/authentication/authentication.context";

import { categories, sliderImages, trendingDeals, todaysDeals } from "@/mock";

const HomeScreen = () => {
  const { authToken } = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [category, setCategory] = useState("jewelery");
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const fetchAddressesEndpoint = `${apiBaseUrl}/${apiVersion}/address/addresses/${authToken.userId}`;
        const response = await fetch(fetchAddressesEndpoint, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken.token}`,
          },
        });

        if (response.status === 401 || response.status === 404) {
          throw new Error("Unauthorized access.");
        }

        const data = await response.json();
        setAddresses(data.addresses);
      } catch (error) {
        alert(error.message);
      }
    };

    if (isModalOpen) {
      fetchAddresses();
    }
  }, [isModalOpen]);

  return (
    <>
      <SafeArea>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header />

          {/* Adreess Section Start */}
          <Pressable
            onPress={() => setIsModalOpen(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              padding: 10,
              backgroundColor: "#AFEEEE",
            }}
          >
            <Ionicons name="location-outline" size={24} color="black" />
            <Text style={{ fontSize: 13, fontWeight: "500" }}>
              {selectedAddress
                ? `Deliver to ${selectedAddress?.name} - ${selectedAddress?.city}, ${selectedAddress?.postalCode}`
                : "Select a Delivery Address"}
            </Text>

            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
          </Pressable>

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
                onPress={() =>
                  navigation.navigate("ProductInfo", {
                    product: item,
                  })
                }
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
                onPress={() =>
                  navigation.navigate("ProductInfo", {
                    product: item,
                  })
                }
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

      {/* Select Address Model */}
      <BottomModal
        onBackdropPress={() => setIsModalOpen(false)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onSwipeOut={() => setIsModalOpen(false)}
        onHardwareBackPress={() => setIsModalOpen(false)}
        visible={isModalOpen}
        onTouchOutside={() => setIsModalOpen(false)}
      >
        <ModalContent style={{ width: "100%", height: 400 }}>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "500" }}>
              Choose your Location
            </Text>
            <Text style={{ marginTop: 5, fontSize: 16, color: "gray" }}>
              Select a delivery location to see product availability and
              delivery time
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {addresses.map((address) => (
              <Pressable
                onPress={() => {
                  setIsModalOpen(false);
                  setSelectedAddress(address);
                }}
                key={address._id}
                style={{
                  width: 140,
                  height: 140,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  padding: 10,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 3,
                  marginRight: 15,
                  marginTop: 10,
                  backgroundColor:
                    selectedAddress?._id === address._id ? "#FBCEB1" : "white",
                }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
                >
                  <Text style={{ fontSize: 13, fontWeight: "bold" }}>
                    {address?.name}
                  </Text>
                  <Entypo name="location-pin" size={24} color="red" />
                </View>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {address?.houseNumber}, {address?.landmark}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {address?.street}
                </Text>

                <Text
                  numberOfLines={1}
                  style={{ width: 130, fontSize: 13, textAlign: "center" }}
                >
                  {address?.country}, {address?.city}
                </Text>
              </Pressable>
            ))}

            <Pressable
              onPress={() => {
                setIsModalOpen(false);
                navigation.navigate("AddAddress");
              }}
              style={{
                width: 140,
                height: 140,
                borderColor: "#D0D0D0",
                marginTop: 10,
                borderWidth: 1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#0066B2",
                  fontWeight: "500",
                }}
              >
                Add an address or pick-up point
              </Text>
            </Pressable>
          </ScrollView>

          <View style={{ flexDirection: "column", gap: 7, marginBottom: 30 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Entypo name="location-pin" size={22} color="#0066B2" />
              <Text style={{ color: "#0066B2", fontWeight: "400" }}>
                Enter your pincode
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Ionicons name="locate-sharp" size={22} color="#0066B2" />
              <Text style={{ color: "#0066B2", fontWeight: "400" }}>
                Use My Current location
              </Text>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default HomeScreen;

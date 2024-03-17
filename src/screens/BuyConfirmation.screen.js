import { apiBaseUrl, apiVersion } from "@env";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";

import SafeArea from "../components/safearea.component";
import { AuthenticationContext } from "../services/authentication/authentication.context";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../services/redux/slices/cartSlice";

const StepsIndicator = ({ steps, currentStep, setCurrentStep }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
        justifyContent: "space-between",
      }}
    >
      {steps.map((step, index) => (
        <Pressable
          key={index}
          onPress={() => {
            if (index < currentStep) {
              setCurrentStep(index);
            }
          }}
        >
          <Step index={index} currentStep={currentStep} step={step} />
        </Pressable>
      ))}
    </View>
  );
};

const Step = ({ index, currentStep, step }) => {
  const indicatorColor = currentStep > index ? "green" : "#ccc";
  const indicatorText = currentStep > index ? "✓" : index + 1;

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          height: 30,
          width: 30,
          borderRadius: 15,
          backgroundColor: indicatorColor,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          {indicatorText}
        </Text>
      </View>

      {/* Step Title */}
      <Text style={{ textAlign: "center" }}>{step.title}</Text>
    </View>
  );
};

const BuyConfirmationScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const total = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);
  const steps = [
    { title: "Address", content: "Address Form" },
    { title: "Delivery", content: "Delivery Options" },
    { title: "Payment", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];
  const { authToken } = useContext(AuthenticationContext);
  const [currentStep, setCurrentStep] = useState(0);

  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const isFocused = useIsFocused();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState({ _id: 0 });
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

    if (isFocused) {
      fetchAddresses();
    }
  }, [isFocused]);

  const placeOrder = async () => {
    try {
      if (loading) return;
      setLoading(true);
      const placeOrderEndpoint = `${apiBaseUrl}/${apiVersion}/order/${authToken.userId}`;
      const response = await fetch(placeOrderEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken.token}`,
        },
        body: JSON.stringify({
          cartItems: cart,
          totalPrice: total,
          shippingAddress: selectedAddress,
          paymentMethod: selectedOption,
        }),
      });

      if (response.status === 401 || response.status === 404) {
        throw new Error("Unauthorized access.");
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      alert(error.message);
    } finally {
      dispatch(clearCart());
      setLoading(false);
      navigation.goBack();
    }
  };

  return (
    <SafeArea>
      <ScrollView>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 40 }}>
          <StepsIndicator
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </View>

        {currentStep === 0 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Select a Delivery Address
            </Text>

            {addresses.map((address) => (
              <Pressable
                onPress={() => setSelectedAddress(address)}
                key={address?._id}
                style={{
                  borderWidth: 1,
                  borderColor: "#D0D0D0",
                  alignItems: "center",
                  padding: 10,
                  flexDirection: "row",
                  gap: 5,
                  paddingBottom: 17,
                  marginVertical: 7,
                  borderRadius: 6,
                }}
              >
                {selectedAddress && selectedAddress?._id === address?._id ? (
                  <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                ) : (
                  <Entypo name="circle" size={20} color="gray" />
                )}
                <View style={{ marginLeft: 6 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 3,
                    }}
                  >
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                      {address?.name}
                    </Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {address?.houseNumber}, {address?.landmark}
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {address?.street}
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    {address?.country}, {address?.city}
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    Phone no: {address?.mobileNumber}
                  </Text>

                  <Text style={{ fontSize: 15, color: "#181818" }}>
                    Pincode: {address?.postalCode}
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                      marginTop: 7,
                    }}
                  >
                    <Pressable
                      style={{
                        backgroundColor: "#F5F5F5",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderWidth: 0.9,
                        borderRadius: 5,
                        borderColor: "#D0D0D0",
                      }}
                    >
                      <Text>Edit</Text>
                    </Pressable>

                    <Pressable
                      style={{
                        backgroundColor: "#F5F5F5",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderWidth: 0.9,
                        borderRadius: 5,
                        borderColor: "#D0D0D0",
                      }}
                    >
                      <Text>Remove</Text>
                    </Pressable>

                    <Pressable
                      style={{
                        backgroundColor: "#F5F5F5",
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderWidth: 0.9,
                        borderRadius: 5,
                        borderColor: "#D0D0D0",
                      }}
                    >
                      <Text>Set as Default</Text>
                    </Pressable>
                  </View>

                  {selectedAddress && selectedAddress?._id === address?._id && (
                    <Pressable
                      onPress={() => setCurrentStep(1)}
                      style={{
                        backgroundColor: "#008397",
                        padding: 10,
                        borderRadius: 20,
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      <Text style={{ textAlign: "center", color: "white" }}>
                        Deliver to this Address
                      </Text>
                    </Pressable>
                  )}
                </View>
              </Pressable>
            ))}
          </View>
        )}

        {currentStep === 1 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Choose your delivery options
            </Text>

            <Pressable onPress={() => setOption(!option)}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "white",
                  padding: 8,
                  gap: 7,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  marginTop: 10,
                }}
              >
                {option ? (
                  <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                ) : (
                  <Entypo name="circle" size={20} color="gray" />
                )}

                <Text style={{ flex: 1 }}>
                  <Text style={{ color: "green", fontWeight: "500" }}>
                    Tomorrow by 10pm
                  </Text>{" "}
                  - FREE delivery with your Prime membership
                </Text>
              </View>
            </Pressable>

            {option && (
              <Pressable
                onPress={() => setCurrentStep(2)}
                style={{
                  backgroundColor: "#FFC72C",
                  padding: 10,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <Text>Continue</Text>
              </Pressable>
            )}
          </View>
        )}

        {currentStep === 2 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Select your payment Method
            </Text>

            <Pressable onPress={() => setSelectedOption("cash")}>
              <View
                style={{
                  backgroundColor: "white",
                  padding: 8,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 7,
                  marginTop: 12,
                }}
              >
                {selectedOption === "cash" ? (
                  <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                ) : (
                  <Entypo name="circle" size={20} color="gray" />
                )}

                <Text>Cash on Delivery</Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => {
                setSelectedOption("card");
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 8,
                  borderColor: "#D0D0D0",
                  borderWidth: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 7,
                  marginTop: 12,
                }}
              >
                {selectedOption === "card" ? (
                  <FontAwesome5 name="dot-circle" size={20} color="#008397" />
                ) : (
                  <Entypo name="circle" size={20} color="gray" />
                )}

                <Text>UPI / Credit or debit card</Text>
              </View>
            </Pressable>

            {selectedOption !== "" && (
              <Pressable
                onPress={() => setCurrentStep(3)}
                style={{
                  backgroundColor: "#FFC72C",
                  padding: 10,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <Text>Continue</Text>
              </Pressable>
            )}
          </View>
        )}

        {currentStep === 3 && selectedOption === "cash" && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order Now</Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 8,
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              <View>
                <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                  Save 5% and never run out
                </Text>
                <Text style={{ fontSize: 15, color: "gray", marginTop: 5 }}>
                  Turn on auto deliveries
                </Text>
              </View>

              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="black"
              />
            </View>

            <View
              style={{
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              <Text>Shipping to {selectedAddress?.name}</Text>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "gray" }}
                >
                  Items
                </Text>

                <Text style={{ color: "gray", fontSize: 16 }}>
                  {total} &#8377;
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "500", color: "gray" }}
                >
                  Delivery
                </Text>

                <Text style={{ color: "gray", fontSize: 16 }}>0 &#8377;</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Order Total
                </Text>

                <Text
                  style={{ color: "#C60C30", fontSize: 17, fontWeight: "bold" }}
                >
                  {total} &#8377;
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "white",
                padding: 8,
                borderColor: "#D0D0D0",
                borderWidth: 1,
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 16, color: "gray" }}>Pay With</Text>

              <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 7 }}>
                Pay on delivery (Cash)
              </Text>
            </View>

            <Pressable
              onPress={placeOrder}
              style={{
                backgroundColor: "#FFC72C",
                padding: 10,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Text>Place your order</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </SafeArea>
  );
};

export default BuyConfirmationScreen;

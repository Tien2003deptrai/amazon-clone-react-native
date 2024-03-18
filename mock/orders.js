const orders = [
  {
    _id: { $oid: "65f70b27baa9eee153cd5dbb" },
    user: { $oid: "65ebfa87558c5c6135ebec57" },
    products: [
      {
        title:
          "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
        quantity: { $numberInt: "7" },
        price: { $numberInt: "19000" },
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
        _id: { $oid: "65f70b27baa9eee153cd5dbc" },
      },
    ],
    totalPrice: { $numberInt: "133000" },
    shippingAddress: {
      name: "User name",
      mobileNumber: "29301928392",
      houseNumber: "903/930",
      street: "Street Name",
      landmark: "Landmark",
      city: "City",
      state: "State",
      country: "India",
      postalCode: "829183",
    },
    paymentMethod: "cash",
    createdAt: { $date: { $numberLong: "1710689063095" } },
    updatedAt: { $date: { $numberLong: "1710689063095" } },
    __v: { $numberInt: "0" },
  },
  {
    _id: { $oid: "65f7171abaa9eee153cd5e4f" },
    user: { $oid: "65ebfa87558c5c6135ebec57" },
    products: [
      {
        title:
          "OnePlus Nord CE 3 Lite 5G (Pastel Lime, 8GB RAM, 128GB Storage)",
        quantity: { $numberInt: "2" },
        price: { $numberInt: "19000" },
        image:
          "https://images-eu.ssl-images-amazon.com/images/G/31/wireless_products/ssserene/weblab_wf/xcm_banners_2022_in_bau_wireless_dec_580x800_once3l_v2_580x800_in-en.jpg",
        _id: { $oid: "65f7171abaa9eee153cd5e50" },
      },
      {
        title:
          "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        quantity: { $numberInt: "1" },
        price: { $numberInt: "695" },
        image:
          "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
        _id: { $oid: "65f7171abaa9eee153cd5e51" },
      },
      {
        title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
        quantity: { $numberInt: "1" },
        price: { $numberDouble: "10.99" },
        image:
          "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
        _id: { $oid: "65f7171abaa9eee153cd5e52" },
      },
      {
        title: "Solid Gold Petite Micropave ",
        quantity: { $numberInt: "1" },
        price: { $numberInt: "168" },
        image:
          "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
        _id: { $oid: "65f7171abaa9eee153cd5e53" },
      },
      {
        title: "White Gold Plated Princess",
        quantity: { $numberInt: "1" },
        price: { $numberDouble: "9.99" },
        image:
          "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
        _id: { $oid: "65f7171abaa9eee153cd5e54" },
      },
      {
        title:
          "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
        quantity: { $numberInt: "1" },
        price: { $numberInt: "3495" },
        image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
        _id: { $oid: "65f7171abaa9eee153cd5e55" },
      },
    ],
    totalPrice: { $numberDouble: "42378.98" },
    shippingAddress: {
      name: "User name",
      mobileNumber: "29301928392",
      houseNumber: "903/930",
      street: "Street Name",
      landmark: "Landmark",
      city: "City",
      state: "State",
      country: "India",
      postalCode: "829183",
    },
    paymentMethod: "cash",
    createdAt: { $date: { $numberLong: "1710692122341" } },
    updatedAt: { $date: { $numberLong: "1710692122341" } },
    __v: { $numberInt: "0" },
  },
  {
    _id: { $oid: "65f7172ebaa9eee153cd5e68" },
    user: { $oid: "65ebfa87558c5c6135ebec57" },
    products: [
      {
        title:
          "Fastrack Limitless FS1 Pro Smart Watch|1.96 Super AMOLED Arched Display with 410x502 Pixel Resolution|SingleSync BT Calling|NitroFast Charging|110+ Sports Modes|200+ Watchfaces|Upto 7 Days Battery",
        quantity: { $numberInt: "1" },
        price: { $numberInt: "3495" },
        image: "https://m.media-amazon.com/images/I/41mQKmbkVWL._AC_SY400_.jpg",
        _id: { $oid: "65f7172ebaa9eee153cd5e69" },
      },
    ],
    totalPrice: { $numberInt: "3495" },
    shippingAddress: {
      name: "User name",
      mobileNumber: "29301928392",
      houseNumber: "903/930",
      street: "Street Name",
      landmark: "Landmark",
      city: "City",
      state: "State",
      country: "India",
      postalCode: "829183",
    },
    paymentMethod: "cash",
    createdAt: { $date: { $numberLong: "1710692142291" } },
    updatedAt: { $date: { $numberLong: "1710692142291" } },
    __v: { $numberInt: "0" },
  },
];

export default orders;

const users = [
  {
    id: "65ebfa87558c5c6135ebec57",
    name: "Test Name",
    email: "test@gmail.com",
    password: "q1q1q1q1",
    verified: true,
    createdAt: { $date: { $numberLong: "1709963911377" } },
    updatedAt: { $date: { $numberLong: "1710692142322" } },
    __v: { $numberInt: "48" },
    addresses: [
      {
        name: "User name",
        mobileNumber: "29301928392",
        houseNumber: "903/930",
        street: "Street Name",
        landmark: "Landmark",
        city: "City",
        state: "State",
        country: "India",
        postalCode: "829183",
        _id: { $oid: "65f6e66f583fb2762a5d8b4f" },
      },
    ],
    orders: [
      { $oid: "65f70b27baa9eee153cd5dbb" },
      { $oid: "65f7171abaa9eee153cd5e4f" },
      { $oid: "65f7172ebaa9eee153cd5e68" },
    ],
  },
];

export default users;

import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import PropTypes from "prop-types";

const SafeArea = ({ children, customStyles }) => {
  const containerStyle = StyleSheet.flatten([styles.container, customStyles]);

  return <SafeAreaView style={containerStyle}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight ?? 0,
    backgroundColor: "white",
    flex: 1,
  },
});

SafeArea.propTypes = {
  children: PropTypes.node.isRequired,
  customStyles: PropTypes.object,
};

export default SafeArea;

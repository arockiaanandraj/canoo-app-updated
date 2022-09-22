import { View, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  topBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#0d0d0d",
    height: 40
  },
  logo: {
    top: -30,
    left: -10,
    width: 150,
    height: 117,
  },
  controls: {
    top: -28,
    right: 0,
    width: 110,
    height: 99,
  },
});

export default function Header() {
  return (
    <View style={styles.topBar}>
      <Image
        style={styles.logo}
        source={require("../assets/images/screens/01_home_logo.jpg")}
        resizeMode="contain"
      />
      <Image
        style={styles.controls}
        source={require("../assets/images/screens/01_home_controls.jpg")}
        resizeMode="contain"
      />
    </View>
  );
}

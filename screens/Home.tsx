import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  scrollContainer: {
    width,
    height,
    justifyContent: "flex-end",
  },
  headerTxt: {
    color: "#fff",
    top: 0,
    padding: 10,
    fontSize: 16
  },
  headerStrongTxt: {
    fontWeight: "bold", 
    fontSize: 20
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: "100%",
  },
});

export default function Home() {
  return (
    <View style={styles.screenContainer}>
      <Text style={styles.headerTxt}>
        <Text style={styles.headerStrongTxt}>hello, friend!</Text>
        {"\n"}
        Check out what's happening around you
      </Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          style={styles.picture}
          source={require("../assets/images/screens/01_home.jpg")}
        />
      </ScrollView>
    </View>
  );
}

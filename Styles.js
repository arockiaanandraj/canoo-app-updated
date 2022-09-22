import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  splashImg: {
    width: 300,
    height: 400,
  },
  txt: {
    color: "#fff",
  },
  homeScreen: {
    width: 1080,
    height: 2972,
  },
  primaryBtn: {
    height: 40,
    width: 200,
    borderRadius: 10,
    backgroundColor: "yellow",
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryBtnTxt: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold"
  },
  registerContainer: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 20,
  }
});

export default styles;

import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import styles from "../Styles";
import RegisterWithCamera from "../components/RegisterWithCamera";

export default function CheckIn() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [userIsRegistered, setUserIsRegistered] = useState(false);
  const [registerWithCameraActive, setRegisterWithCameraActive] = useState(false);
  const onPressRegister = () => {
    setRegisterWithCameraActive(false);
    setUserIsRegistered(true);
  };

  const onPressRegisterAgain = () => {
    setAppIsReady(false)
    setUserIsRegistered(false);
  }

  return (
    <>
    {!appIsReady && (
      <View style={styles.container}>
      <Image
        style={styles.registerImg}
        source={require("../assets/images/01_register.jpg")}
      />
    </View>
    )}
      {!userIsRegistered && !registerWithCameraActive && (
        <View style={styles.registerHomeContainer}>
          <TouchableOpacity
            onPress={() => {
              setAppIsReady(true)
              setRegisterWithCameraActive(true)
            }}
            style={styles.primaryBtn}
          >
            <Text style={styles.primaryBtnTxt}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
      {appIsReady && !userIsRegistered && registerWithCameraActive && (
        <RegisterWithCamera stateChanger={onPressRegister} />
      )}
      {appIsReady && userIsRegistered && !registerWithCameraActive && (
        <View style={styles.container}>
          <Text style={styles.txt}>Check into a venue{"\n"}</Text>
          <TouchableOpacity style={styles.primaryBtn}>
            <Text style={styles.primaryBtnTxt}>Check in</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressRegisterAgain}
            style={styles.primaryBtn}
          >
            <Text style={styles.primaryBtnTxt}>Register Again</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

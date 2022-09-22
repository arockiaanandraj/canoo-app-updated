import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import styles from "../Styles";
import RegisterWithImage from "../components/RegisterWithImage";
import RegisterWithCamera from "../components/RegisterWithCamera";

export default function CheckIn() {
  const [userIsRegistered, setUserIsRegistered] = useState(false);
  const [registerWithImageActive, setRegisterWithImageActive] = useState(false);
  const [registerWithCameraActive, setRegisterWithCameraActive] = useState(false);
  const onPressRegister = () => {
    setRegisterWithImageActive(false);
    setRegisterWithCameraActive(false);
    setUserIsRegistered(true);
  };

  const onPressRegisterAgain = () => {
    setRegisterWithImageActive(false);
    setUserIsRegistered(false);
  }

  return (
    <>
      {!userIsRegistered && !registerWithImageActive && !registerWithCameraActive && (
        <View style={styles.container}>
          <Text style={styles.txt}>Register to check into a venue{"\n"}</Text>
          <TouchableOpacity
            onPress={() => setRegisterWithImageActive(true)}
            style={styles.primaryBtn}
          >
            <Text style={styles.primaryBtnTxt}>Register with Image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setRegisterWithCameraActive(true)}
            style={styles.primaryBtn}
          >
            <Text style={styles.primaryBtnTxt}>Register with Camera</Text>
          </TouchableOpacity>
        </View>
      )}
      {!userIsRegistered && registerWithImageActive && (
        <RegisterWithImage stateChanger={onPressRegister} />
      )}
      {!userIsRegistered && registerWithCameraActive && (
        <RegisterWithCamera stateChanger={onPressRegister} />
      )}
      {userIsRegistered && !registerWithImageActive && !registerWithCameraActive && (
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
